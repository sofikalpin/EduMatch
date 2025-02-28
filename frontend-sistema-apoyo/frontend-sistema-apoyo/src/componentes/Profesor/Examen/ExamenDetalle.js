import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fileIcon from "../Imagenes/examen.avif";
import deleteIcon from "../Imagenes/delete.png";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";
import axios from "axios";
import { useUser } from "../../../Context/UserContext";

const ExamenDetalle = () => {
  const {user} = useUser();
  const { idexamen } = useParams();
  const [loading, setLoading] = useState(false);
  const [examen, setExamen] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const encontrarExamen = async () => {
      try {
        setLoading(true);
        const respuesta = await axios.get(`http://localhost:5228/api/examenes/ExamenID?id=${idexamen}`);
        if (respuesta.data.status) {
          setExamen(respuesta.data.value);
        } else {
          setError(respuesta.data.message);
        }
      } catch (error) {
        setError("Error al conectar con el servidor, inténtelo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    encontrarExamen();
  }, [idexamen]);

  const handleDelete = async () => {

    if (user.idUsuario !== examen?.idusuario) {
      alert("No tienes permisos para eliminar este examen.");
      return; 
    }

    if (window.confirm("¿Está seguro que desea eliminar este examen?")) {
      try {
        setLoading(true);
        const respuesta = await axios.delete(`http://localhost:5228/api/ProfeExamen/EliminarExamen?id=${idexamen}`);
        if (respuesta.data.status) {
          alert("Examen eliminado correctamente");
          navigate(-1);
        } else {
          setError(respuesta.data.message);
        }
      } catch (error) {
        setError("Error al eliminar el artículo, inténtelo más tarde.");
      } finally {
        setLoading(false);
      }
    }
  };

  const esGoogleForm = (url) => {
    const regex = /^https:\/\/docs\.google\.com\/forms\/d\/e\/[a-zA-Z0-9_-]+\/(viewform|edit)(\?.*)?$/;
    return regex.test(url);
  };

  const verExamen = () => {
    if (examen?.url) {
      if (esGoogleForm(examen.url)) {
        navigate("/ver-examen", { state: { examenUrl: examen.url } });
      } else {
        window.open(examen.url, "_blank"); 
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-gray-600 animate-pulse">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg mt-12 p-6 max-w-3xl mx-auto">
                    
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <span className="text-gray-600">Fecha de Publicación: {examen?.fechaCreacion}</span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{examen?.titulo}</h1>
            <button
              onClick={handleDelete}
              className={`p-2 rounded-full transition-colors duration-200 ml-4 ${
                user.idUsuario !== examen?.idusuario
                  ? "bg-red-200 cursor-not-allowed"
                  : "bg-red-100 hover:bg-red-200"
              }`}
              aria-label="Eliminar examen"
            >
              <img src={deleteIcon} alt="Eliminar" className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center mb-6">
            <img
              src={fileIcon} 
              alt="Examen"
              className="h-48 w-auto rounded-lg shadow-md object-cover"
            />
          </div>

          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Calificación máxima: </h2>
            <p className="text-gray-600 leading-relaxed">{examen?.calificacion}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Archivo del Examen</h2>
            {examen?.url ? (
              <a
                onClick={verExamen}
                className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold"
              >
                Ver archivo
              </a>
            ) : (
              <p className="text-gray-500 italic">Este examen no posee ningún archivo adjunto</p>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              onClick={() => navigate(-1)}
              className="py-3 px-4 bg-green-600 text-white rounded-lg 
                      hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Volver a Exámenes
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExamenDetalle;
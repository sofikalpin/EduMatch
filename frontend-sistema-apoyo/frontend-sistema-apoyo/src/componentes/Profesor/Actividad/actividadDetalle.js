import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import actividadImg from "../Imagenes/actividad.jpg";
import { useUser } from '../../../context/userContext';
import deleteIcon from "../Imagenes/delete.png";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";
import axios from "axios";

const ActividadDetalle = () => {
  const { idactividad } = useParams();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [actividad, setActividad] = useState("");
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false); // Agregar estado para controlar la eliminación
  const navigate = useNavigate();

  useEffect(() => {
    const encontrarActividad = async () => {
      try {
        setLoading(true);
        const respuesta = await axios.get(`http://localhost:5228/API/Actividad/ActividadID?id=${idactividad}`);
        if (respuesta.data.status) {
          setActividad(respuesta.data.value);
        } else {
          setError(respuesta.data.message);
        }
      } catch (error) {
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setActividad("");
      } finally {
        setLoading(false);
      }
    };
    encontrarActividad();
  }, [idactividad]);

  const handleDelete = async () => {
    if (!window.confirm("¿Está seguro que desea eliminar esta actividad?")) {
      return;
    }

    try {
      setIsDeleting(true); // Establecer el estado de eliminación en true
      const response = await axios.delete(`http://localhost:5228/API/Actividad/EliminarActividad?id=${idactividad}`);
      if (response.data.status) {
        alert("Actividad eliminada correctamente");
        navigate("/actividades"); // Redirigir después de la eliminación
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error al eliminar la actividad. Inténtelo más tarde.");
    } finally {
      setIsDeleting(false); // Restablecer el estado de eliminación
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg mt-12 p-6 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <span className="text-gray-600 text-xl">Fecha de Publicación: {actividad?.fechaCreacion}</span>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">{actividad?.titulo}</h1>

              {user && actividad && user.idUsuario === actividad.idusuario && (
                <button
                  onClick={handleDelete}
                  aria-label="Eliminar actividad"
                  className={`p-2 ${isDeleting ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-100 hover:bg-red-200'} rounded-full transition-colors duration-200`}
                  disabled={isDeleting}
                >
                  <img src={deleteIcon} alt="Eliminar" className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="flex justify-center">
              <img src={actividadImg} alt="Imagen de la actividad" className="h-48 w-auto rounded-lg shadow-md object-cover" />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Descripción</h2>
              <p className="text-gray-600 leading-relaxed">{actividad?.descripcion}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Archivo de la Actividad</h2>
              {actividad?.url ? (
                <a href={actividad.url} className="text-blue-600 hover:text-blue-800 hover:underline" target="_blank" rel="noopener noreferrer">
                  Ver actividad
                </a>
              ) : (
                <p className="text-gray-500 italic">Esta actividad no posee ningún archivo adjunto</p>
              )}
            </div>

            <button
              onClick={() => navigate(-1)}
              className="py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              aria-label="Volver a actividades"
            >
              Volver a Actividades
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ActividadDetalle;

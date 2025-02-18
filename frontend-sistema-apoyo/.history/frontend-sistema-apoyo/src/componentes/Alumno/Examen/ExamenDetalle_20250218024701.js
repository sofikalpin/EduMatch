import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fileIcon from "../Imagenes/file-icon.png";
import { ArrowLeft } from "lucide-react";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";
import axios from "axios";

const ExamenDetalle = () => {
  const { idexamen } = useParams();
  console.log("ID del examen:", idexamen);

  const [loading, setLoading] = useState(false);
  const [examen, setExamen] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const encontrarExamen = async () => {
      try {
        setLoading(true);
        const respuesta = await axios.get(`http://localhost:5228/api/examenes/ExamenID?id=${idexamen}`);
        if (respuesta.data.status) {
          console.log("Respuesta completa de la API:", respuesta.data);
          setExamen(respuesta.data.value);
        } else {
          setError(respuesta.data.message);
        }
      } catch (error) {
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setExamen("");
      } finally {
        setLoading(false);
      }
    } 
    encontrarExamen();
  }, [idexamen]);

  // Función para verificar si la URL es un Google Form
  const esGoogleForm = (url) => {
    const regex = /^https:\/\/docs\.google\.com\/forms\/d\/e\/[a-zA-Z0-9_-]+\/(viewform|edit)(\?.*)?$/;
    return regex.test(url);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver</span>
        </button>

        {/* Detalles del examen */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <span className="text-gray-600">Fecha de Publicacion: {examen.fechaCreacion || "No posee fecha"}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">{examen?.titulo}</h1>

          <div className="mt-6 flex justify-center">
            <img src={fileIcon} alt="Actividad" className="w-40 h-auto rounded-lg shadow-md mx-auto my-4" />
          </div>

          <p className="text-lg leading-relaxed text-gray-600">Calificacion maxima: {examen?.calificacion}</p>

           {/* Sección para mostrar el archivo del examen */}
          <div className="border-t border-gray-200 mt-8 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Archivo del Examen</h2>

            {/* Si existe una URL del examen, crea un enlace para ver el archivo */}
            {examen?.url ? (
              <a
                href={examen.url}
                onClick={(e) => {
                  e.preventDefault();
                  if (examen?.url) {
                    if (esGoogleForm(examen.url)) {
                      navigate("/ver-examen", { state: { examenUrl: examen.url } });
                    } else {
                      window.open(examen.url, "_blank"); 
                    }
                  }
                }}
                className="py-2 px-6 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-md"
              >
                Ver archivo
              </a>
            ) : (
              <p className="text-gray-500 italic">Este examen no posee ningún archivo adjunto</p>
            )}
          </div>
        </div>
      </main>
        <Footer />
    </div>
  );
};

export default ExamenDetalle;
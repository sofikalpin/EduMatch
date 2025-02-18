import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
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

  // Cargar la actividad 
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

  // Función para eliminar una actividad
  const handleDelete = async () => {
    if (user.idUsuario !== actividad?.idusuario) {
      alert("No tienes permisos para eliminar esta actividad.");
      return; 
    }

    // Confirmación antes de eliminar
    if (window.confirm("¿Está seguro que desea eliminar esta actividad?")) {
      try {
        setLoading(true);
        const respuesta = await axios.delete(`http://localhost:5228/API/ProfesorActividad/EliminarActividad?id=${idactividad}`);
        if (respuesta.data.status) {
          alert("Actividad eliminada correctamente");
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

  // Mostrar en pantalla de la carga si la actividad no fue cargada
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-gray-600 animate-pulse">Cargando actividad...</div>
      </div>
    );
  }

  // Mostrar mensaje de error si ocurrió algún problema
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg mt-12 p-6 max-w-3xl mx-auto">
          
          { /* Sección para la fecha de publicación */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <span className="text-gray-600">Fecha de Publicación: {actividad?.fechaCreacion}</span>
          </div>

          {/* Contenedor principal de la actividad */}
          <div className="space-y-8 mb-6">
            <div className="flex justify-between items-center">
              
              {/* Titulo de la actividad*/}
              <h1 className="text-3xl font-bold text-gray-900 leading-relaxed">{actividad?.nombre}</h1>
                  
                  {/* Boton para eliminar la actividad */}
                  <button
                  onClick={handleDelete}
                  className={`p-2 rounded-full transition-colors duration-200 ml-4 ${
                    user.idUsuario !== actividad?.idusuario
                      ? "bg-red-200 cursor-not-allowed"
                      : "bg-red-100 hover:bg-red-200"
                  }`}
                  aria-label="Eliminar actividad"
                >

                  <img src={deleteIcon} alt="Eliminar" className="w-6 h-6" />
                </button>
            </div>

            {/*Imagen de la actividad */}
            <div className="flex justify-center mb-6">
              <img src={actividadImg} alt="Imagen de la actividad" 
              className="h-48 w-auto rounded-lg shadow-md object-cover" />
            </div>

            {/*Sección de la descripción */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Descripción</h2>
              <ReactMarkdown className="text-gray-600 text-justify" breaks={true}>
                {actividad?.descripcion}
              </ReactMarkdown>
            </div>

            {/* Sección del archivo de la actividad */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Archivo de la Actividad</h2>
              {actividad?.url ? (
                <a href={actividad.url} className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold" target="_blank" rel="noopener noreferrer">
                  Ver actividad
                </a>
              ) : (
                <p className="text-gray-500 italic">Esta actividad no posee ningún archivo adjunto</p>
              )}
            </div>

            {/* Botón para volver a la lista de actividades */}
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
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";
import actividad from "../Imagenes/actividades.png";
import examen from "../Imagenes/examen.png";
import articulo from "../Imagenes/articulo.png";

const CursoDetalleAlumno = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(""); 
  const { nivel, nombre } = location.state || {}; 

  
  if (!nivel || !nombre) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl text-red-500 font-bold">Error: No hay curso seleccionado</h1>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => navigate("/alumno")}
        >
          Volver a Mis Cursos
        </button>
      </div>
    );
  }

 
  const handleCardClick = (option) => {
    if (!nivel) {
      setError("Debe seleccionar un curso de estudio");
      return;
    }

    switch (option) {
      case "Artículos":
        navigate(`/alumno/articulos`, { state: { nivel, nombre } });
        break;
      case "Actividades":
        navigate(`/alumno/actividades`, { state: { nivel, nombre } });
        break;
      case "Exámenes":
        navigate(`/alumno/examenes`, { state: { nivel, nombre } });
        break;
      case "Mis Cursos":
        navigate("/alumno");
        break;
      case "INICIO":
        navigate("/");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />

      <div className="curso-detalles-container px-5 py-10 text-center bg-[#f0faf7] flex-grow">
        
        <div className="flex items-center mb-12 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Volver</span>
          </button>

          <h1 className="flex-grow text-5xl font-bold text-[#2c7a7b] text-center">
             {nombre}
          </h1>
        </div>

       
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Aquí podrás obtener más información sobre el contenido, los objetivos y los materiales disponibles.
        </p>

   
        <div className="tarjetas-detalles flex justify-center gap-8 flex-wrap">
       
          <div 
            className="tarjeta-detalle bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-64 text-center no-underline text-gray-800 transition-transform duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
            onClick={() => handleCardClick("Actividades")}
          >
            <img src={actividad} alt="Actividades" className="tarjeta-imagen w-full h-48 object-cover rounded-lg mb-4" />
            <div className="tarjeta-texto">
              <h3 className="text-2xl font-semibold text-[#2c7a7b] mb-2">Actividades</h3>
              <p className="text-base text-gray-600">Realiza actividades interactivas para mejorar tu aprendizaje.</p>
            </div>
          </div>

          <div 
            className="tarjeta-detalle bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-64 text-center no-underline text-gray-800 transition-transform duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
            onClick={() => handleCardClick("Artículos")}
          >
            <img src={articulo} alt="Artículos" className="tarjeta-imagen w-full h-48 object-cover rounded-lg mb-4" />
            <div className="tarjeta-texto">
              <h3 className="text-2xl font-semibold text-[#2c7a7b] mb-2">Artículos</h3>
              <p className="text-base text-gray-600">Accede a materiales adicionales y artículos relevantes.</p>
            </div>
          </div>

          <div 
            className="tarjeta-detalle bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-64 text-center no-underline text-gray-800 transition-transform duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
            onClick={() => handleCardClick("Exámenes")}
          >
            <img src={examen} alt="Exámenes" className="tarjeta-imagen w-full h-48 object-cover rounded-lg mb-4" />
            <div className="tarjeta-texto">
              <h3 className="text-2xl font-semibold text-[#2c7a7b] mb-2">Exámenes</h3>
              <p className="text-base text-gray-600">Accede a exámenes para evaluar tu progreso.</p>
            </div>
          </div>
        </div>

      </div>
        <Footer />
    </div>
  );
};

export default CursoDetalleAlumno;
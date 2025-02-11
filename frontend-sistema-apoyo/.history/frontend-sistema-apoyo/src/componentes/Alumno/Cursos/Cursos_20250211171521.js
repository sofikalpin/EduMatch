import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import LogoInicio from '../../../logo/LogoInicio.png';
import chatIcon from "../Imagenes/chat.png";
import articulo from "../Imagenes/articulo.png";
import actividad from "../Imagenes/actividades.png";
import foro from "../Imagenes/foro.png";
import examen from "../Imagenes/examen.png";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";

const Cursos = () => {
  const location = useLocation();
  const [error, setError] = useState(""); // Mensaje de error
  const navigate = useNavigate(); // Usamos useNavigate para redirigir
  const { nivel, nombre } = location.state || {};

  // Si no hay curso seleccionado, se muestra un error y un botón para regresar
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

  // Función que maneja el clic para redirigir a diferentes páginas
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
        navigate(`/alumno/examen`, { state: { nivel, nombre } });
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
    <div className="bg-gray-100 min-h-screen overflow-auto flex flex-col">
      <Header />

      {/* Contenido principal */}
      <div className="p-6 flex-grow">
        <h1 className="text-3xl font-bold mb-12 mt-12">{nombre}</h1>

        {/* Mostrar error si existe */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Tarjetas centradas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
          <div className="card cursor-pointer p-4 border border-gray-300 rounded-lg flex flex-col items-center justify-center" onClick={() => handleCardClick("Artículos")}>
            <img src={articulo} alt="Artículos" className="w-16 h-16 mb-2" />
            <p className="text-center">Artículos</p>
          </div>
          <div className="card cursor-pointer p-4 border border-gray-300 rounded-lg flex flex-col items-center justify-center" onClick={() => handleCardClick("Actividades")}>
            <img src={actividad} alt="Actividades" className="w-16 h-16 mb-2" />
            <p className="text-center">Actividades</p>
          </div>
          <div className="card cursor-pointer p-4 border border-gray-300 rounded-lg flex flex-col items-center justify-center" onClick={() => handleCardClick("Exámenes")}>
            <img src={examen} alt="Exámenes" className="w-16 h-16 mb-2" />
            <p className="text-center">Exámenes</p>
          </div>
        </div>
      </div>
      <div className="mt-32"></div>
      <Footer />
    </div>
  );
}

export default Cursos;

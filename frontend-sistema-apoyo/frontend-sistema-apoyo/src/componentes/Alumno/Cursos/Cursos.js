import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import LogoInicio from '../../../logo/LogoInicio.png';
import chatIcon from "../Imagenes/chat.png";
import articulo from "../Imagenes/articulo.png";
import actividad from "../Imagenes/actividades.png";
import foro from "../Imagenes/foro.png";
import examen from "../Imagenes/examen.png";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";

function Cursos() {
  const navigate = useNavigate(); // Usamos useNavigate para redirigir
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú

  // Función que maneja el clic para redirigir a diferentes páginas
  const handleCardClick = (option) => {
    switch(option) {
      case "Artículos":
        navigate("/alumno/articulos");
        break;
      case "Actividades":
        navigate("/alumno/actividades"); // Redirige a la página de Actividades
        break;
      case "Foro":
        navigate("/alumno/foro"); // Redirige a la página de Foros para los alumnos
        break;
      case "Exámenes":
        navigate("/alumno/examen"); // Redirige a la página de Exámenes
        break;
      case "Mis Cursos": // Cuando se haga clic en Mis Cursos
        navigate("/miscursos");
        break;
      case "INICIO": // Cuando se haga clic en INICIO
        navigate("/"); // Esto redirige a la raíz
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
        <h1 className="text-3xl font-bold mb-12 mt-12">A1: Principiante</h1>

        {/* Tarjetas centradas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <div className="card cursor-pointer p-4 border border-gray-300 rounded-lg flex flex-col items-center justify-center" onClick={() => handleCardClick("Artículos")}>
            <img src={articulo} alt="Artículos" className="w-16 h-16 mb-2" />
            <p className="text-center">Artículos</p>
          </div>
          <div className="card cursor-pointer p-4 border border-gray-300 rounded-lg flex flex-col items-center justify-center" onClick={() => handleCardClick("Actividades")}>
            <img src={actividad} alt="Actividades" className="w-16 h-16 mb-2" />
            <p className="text-center">Actividades</p>
          </div>
          <div className="card cursor-pointer p-4 border border-gray-300 rounded-lg flex flex-col items-center justify-center" onClick={() => handleCardClick("Foro")}>
            <img src={foro} alt="Foro" className="w-16 h-16 mb-2" />
            <p className="text-center">Foro</p>
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

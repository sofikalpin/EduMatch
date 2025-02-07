import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import chatIcon from "../Imagenes/chat.png";
import LogoInicio from '../../../logo/LogoInicio.png'; // Importar el logo
import a1 from "../Imagenes/a1.png"; // Importar la imagen A1
import HeaderAlumno from "../HeaderAlumno";
import FooterAlumno from "../FooterAlumno";


const MisCursos = () => {
  const location = useLocation(); // Obtén la ruta actual
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú está abierto o cerrado

  // Función para manejar la apertura y cierre del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <HeaderAlumno></HeaderAlumno>

      {/* Contenido principal */}
      <main className="p-6">
      <h1 className="text-center text-5xl font-bold text-[#2c7a7b] mb-12 mt-10">
          Mis Cursos
        </h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-16"> {/* Aplica margen izquierdo automático */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src={a1} alt="A1 Curso" className="w-full h-48 object-cover rounded-md mb-4" />
            <Link to="/alumno/cursos" className="text-xl font-semibold text-blue-600 hover:underline">
              A1: Principiante
            </Link>
          </div>
        </section>
      </main>
     <div className="mt-12">
             <FooterAlumno />
           </div>
    </div>
  );
};

export default MisCursos;


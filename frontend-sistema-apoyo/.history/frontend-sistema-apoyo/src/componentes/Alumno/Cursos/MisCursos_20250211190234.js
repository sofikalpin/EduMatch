import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import chatIcon from "../Imagenes/chat.png";
import LogoInicio from '../../../logo/LogoInicio.png'; // Importar el logo
import a1 from "../../../logo/Cursos/A1.png"; // Importar la imagen A1
import a2 from "../../../logo/Cursos/A2.png"; // Importar la
import b1 from "../../../logo/Cursos/B1.png"; // Importar
import b2 from "../../../logo/Cursos/B2.png"; // Importar
import c1 from "../../../logo/Cursos/C1.png"; //
import c2 from "../../../logo/Cursos/C2.png"; //
import HeaderAlumno from "../HeaderAlumno";
import FooterAlumno from "../FooterAlumno";
import { useUser } from "../../../context/userContext";


const MisCursos = () => {
  const { user } = useUser(); // Obtén el usuario autenticado
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú está abierto o cerrado

  const navegarACurso = (curso) => {
   navigate("/alumno/cursos", { state: {nivel: curso.nivel, nombre: curso.nombre}})
  }
  // Función para manejar la apertura y cierre del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const nivelAlumno = user?.nivel || 1;

  const cursos = [
    { nombre: "A1: Principiante", nivel: 1, imagen: a1 },
    { nombre: "A2: Básico", nivel: 2, imagen: a2 },
    { nombre: "B1: Pre-Intermedio", nivel: 3, imagen: b1 },
    { nombre: "B2: Intermedio", nivel: 4, imagen: b2 },
    { nombre: "C1: Intermedio-Alto", nivel: 5, imagen: c1 },
    { nombre: "C2: Avanzado", nivel: 6, imagen: c2 },
  ];

  const cursosFiltrados = cursos.filter((curso) => curso.nivel <= nivelAlumno);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <HeaderAlumno />

      {/* Contenido principal */}
      <main className="p-6">
      <h1 className="text-center text-5xl font-bold text-[#2c7a7b] mb-12 mt-10">
          Mis Cursos
        </h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-16"> {/* Aplica margen izquierdo automático */}
          {cursosFiltrados.map((curso) => (
            <div 
                  key={curso.nivel} 
                  className="bg-white p-4 rounded-lg shadow-md"
                  onClick={() => navegarACurso(curso)}
            
            >
              <img src={curso.imagen} alt={curso.nombre} className="w-full h-48 object-cover rounded-md mb-4" />
              <p className="text-xl font-semibold text-blue-600 hover:underline">{curso.nombre}</p>
            </div>
          ))

          }
        </section>
      </main>
      <div className="mt-12">
        <FooterAlumno />
      </div>
    </div>
  );
};

export default MisCursos;


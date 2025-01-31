import React, { useState, useEffect } from "react";
import "./Alumnos.css";
import logo from "../../logo/LogoInicio.png";
import { Link } from "react-router-dom";

const MisAlumnos = () => {
  // Estado para almacenar los alumnos
  const [cursos, setCursos] = useState({});

  // Simula la carga desde un backend
  useEffect(() => {
    // Simula una llamada a un API
    const fetchAlumnos = async () => {
      try {
        const response = await fetch("/api/alumnos"); // Ajusta la URL según tu backend
        const data = await response.json();

        // Agrupar alumnos por curso
        const agrupadosPorCurso = data.reduce((acc, alumno) => {
          if (!acc[alumno.curso]) acc[alumno.curso] = [];
          acc[alumno.curso].push(alumno);
          return acc;
        }, {});

        setCursos(agrupadosPorCurso);
      } catch (error) {
        console.error("Error al cargar los alumnos:", error);
      }
    };

    fetchAlumnos();
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div className="inicio-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo-img" />
        <div className="left-nav">
          <nav>
            <ul>
              <li>
                <Link to="/profesor/inicio">Inicio</Link>
              </li>
              <li>
                <Link to="/profesor/cursos">Mis Cursos</Link>
              </li>
              <li>
                <Link to="/profesor/alumnos">Mis Alumnos</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="alumnos-container">
        <h1>Mis Alumnos</h1>
        {Object.keys(cursos).length === 0 ? (
          <p>Cargando alumnos...</p>
        ) : (
          Object.keys(cursos).map((curso, index) => (
            <div key={index} className="curso">
              <h2>{curso}</h2>
              <ul>
                {cursos[curso].map((alumno) => (
                  <li key={alumno.id}>{alumno.nombre}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MisAlumnos;

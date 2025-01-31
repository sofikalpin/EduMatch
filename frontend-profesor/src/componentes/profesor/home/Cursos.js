import React from "react";
import { Link } from "react-router-dom";
import logo from '../../logo/LogoInicio.png';
import logoA1 from "../../logo/A1.png";  
import logoA2 from "../../logo/A2.png";  
import logoB1 from "../../logo/B1.png"; 
import logoB2 from "../../logo/B2.png";
import logoC1 from "../../logo/C1.png";
import logoC2 from "../../logo/C2.png";
import "./Cursos.css";
import "./DetalleCurso.js";

const MisCursos = () => {
  const cursos = [
    { id: 1, nombre: "A1: Curso Principiante", alumnos: 20, imagen: logoA1 },  
    { id: 2, nombre: "A2: Curso Básico", alumnos: 15, imagen: logoA2 },
    { id: 3, nombre: "B1: Curso Pre-Intermedio", alumnos: 25, imagen: logoB1 },
    { id: 4, nombre: "B2: Curso Intermedio", alumnos: 10, imagen: logoB2 },
    { id: 5, nombre: "C1: Curso Intermedio-Alto", alumnos: 15, imagen: logoC1},
    { id: 6, nombre: "C2: Curso Avanzado", alumnos: 5, imagen: logoC2 },
  ];

  return (
    <div className="inicio-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo-img" />
        <div className="left-nav">
          <nav>
            <ul>
              <li><Link to="/profesor/inicio">Inicio</Link></li>
              <li><Link to="/profesor/cursos">Mis Cursos</Link></li>
              <li><Link to="/profesor/alumnos">Mis Alumnos</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="mis-cursos">
        <h1 className="cursos-title">Mis Cursos</h1>
        <div className="cursos-grid">
          {cursos.map((curso) => (
            <div key={curso.id} className="curso-card">
              <img
                src={curso.imagen || logo }
                alt={curso.nombre}
                className="curso-imagen"
              />
              <h2>{curso.nombre}</h2>
              <p>{curso.alumnos} Alumnos inscriptos</p>
              {/* Link a la página de detalles del curso */}
              <Link to={`/profesor/cursos/${curso.id}`}>Ver detalles</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MisCursos;

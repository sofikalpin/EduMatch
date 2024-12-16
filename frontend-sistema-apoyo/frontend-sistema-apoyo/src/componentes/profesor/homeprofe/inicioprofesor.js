import React from "react";
import "./inicioprofesor.css";
import { Link } from "react-router-dom";

const InicioProfesor = () => {
  return (
    <div className="inicio-container">
      <header className="header">
        <h1>Edu-Match</h1>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/miscursos">Mis Cursos</Link>
            </li>
            <li>
              <Link to="/alumnos">Mis Alumnos</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="search-container">
        <input type="text" placeholder="Buscar..." />
        <button>Buscar</button>
      </div>
      <section className="intro">
        <p>Estos son nuestros cursos de inglés listos para que empieces a enseñar.</p>
      </section>
    </div>
  );
};

export default InicioProfesor;

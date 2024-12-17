import React from "react";
import logo from "../../logo/LogoFinal.png";
import "./InicioProfesor.css";

const InicioProfesor = () => {
  return (
    <div className="home-page">
      {/* Encabezado */}
      <header className="header">
        <nav className="nav">
          <div className="nav-links">
            <a href="#">MIS CURSOS</a>
            <a href="#">ALUMNOS</a>
          </div>
          <div className="user-menu">
            <span>Maria A</span>
            <div className="user-icon">M</div>
          </div>
        </nav>
        <div className="Edu-Match">
          <span>Edu-Match</span>
        </div>
      </header>

      {/* Barra de Búsqueda */}
      <div className="search-bar">
        <input type="text" placeholder="Buscar cursos..." />
        <button className="search-button" aria-label="Buscar cursos">
          <span role="img" aria-label="search">
            🔍
          </span>
        </button>
      </div>

      {/* Lista de Cursos */}
      <section className="course-list">
        <div className="circle">
        <div className="logo-container">
          <img src={logo} alt="Edu-Match Logo" />
        </div>
        </div>
      </section>
    </div>
  );
};

export default InicioProfesor;

import React, { useState } from "react";
import "./Miscursos.css";
import { Link, useLocation } from "react-router-dom";
import chatIcon from "../Imagenes/chat.png";
import LogoInicio from '../../../logo/LogoInicio.png'; // Importar el logo
import a1 from "../Imagenes/a1.png"; // Importar la imagen A1

const MisCursos = () => {
  const location = useLocation(); // Obtén la ruta actual
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú está abierto o cerrado

  // Función para manejar la apertura y cierre del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="mis-cursos-container">
      {/* Navbar */}
      <header className="header">
        <div className="nav-links">
          <img src={LogoInicio} alt="Logo" className="logo" />
          <Link to="/" className="nav-item">INICIO</Link>
          <Link to="/miscursos" className={`nav-item ${location.pathname === "/miscursos" ? "active" : ""}`}>
            MIS CURSOS
          </Link>
          
        </div>
        <div className="user-info">
          <span>Maria A</span>
          <div className="user-avatar" onClick={toggleMenu}>M</div>
          <div className="chat-icon-container">
            <img src={chatIcon} alt="Chat" className="chat-icon" />
          </div>
          {isMenuOpen && (
            <div className="mini-container">
              <ul>
                <li>Mi perfil</li>
                <li>Cambiar de cuenta</li>
                <li>Salir</li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Contenido principal */}
      <main className="content">
        <h1>Mis Cursos</h1>
        <section className="courses-list">
          <div className="course-card">
            <img src={a1} alt="A1 Curso" className="course-title-image" />
            <Link to="/alumno/cursos" className="course-title">A1: Principiante</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MisCursos;

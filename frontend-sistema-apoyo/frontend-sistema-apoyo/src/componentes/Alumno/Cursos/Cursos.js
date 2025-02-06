import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import "./cursos.css";
import LogoInicio from '../../../logo/LogoInicio.png';
import chatIcon from "../Imagenes/chat.png";
import articulo from "../Imagenes/articulo.png";
import actividad from "../Imagenes/actividades.png";
import foro from "../Imagenes/foro.png";
import examen from "../Imagenes/examen.png";

function Cursos() {
  const navigate = useNavigate(); // Usamos useNavigate para redirigir
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú

  // Función que maneja el clic para redirigir a diferentes páginas
  const handleCardClick = (option) => {
    switch(option) {
      case "Artículos":
        navigate("/articulos");
        break;
      case "Actividades":
        navigate("/actividades");
        break;
      case "Foro":
        navigate("/foro");
        break;
      case "Exámenes":
        navigate("/examenes");
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

  // Función para abrir/cerrar el menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para manejar las opciones del menú
  const handleMenuOptionClick = (option) => {
    switch(option) {
      case "Mi perfil":
        navigate("/mi-perfil"); // Redirige a la página de perfil
        break;
      case "Cambiar de cuenta":
        // Lógica para cambiar de cuenta (esto puede depender de cómo lo manejes en tu app)
        break;
      case "Salir":
        // Lógica para salir (por ejemplo, cerrar sesión)
        break;
      default:
        break;
    }
    setIsMenuOpen(false); // Cierra el menú después de seleccionar una opción
  };

  return (
    <div>
      {/* Barra de navegación */}
      <nav className="header">
        <div className="nav-links">
          <img src={LogoInicio} alt="Logo" className="logo" />
          <a href="#inicio" onClick={() => handleCardClick("INICIO")} className="nav-item">INICIO</a>
          <a href="#mis-cursos" onClick={() => handleCardClick("Mis Cursos")} className={`nav-item ${window.location.pathname === "/miscursos" ? "active" : ""}`}>MIS CURSOS</a>
        </div>
        <div className="user-info">
          <span>María A</span>
          <div className="user-avatar" onClick={toggleMenu}>M</div>
          <div className="chat-icon-container">
            <img src={chatIcon} alt="Chat" className="chat-icon" />
          </div>
          {isMenuOpen && (
            <div className="mini-container">
              <ul>
                <li onClick={() => handleMenuOptionClick("Mi perfil")}>Mi perfil</li>
                <li onClick={() => handleMenuOptionClick("Cambiar de cuenta")}>Cambiar de cuenta</li>
                <li onClick={() => handleMenuOptionClick("Salir")}>Salir</li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="content">
        <h1>A1: Principiante</h1>

        {/* Tarjetas centradas */}
        <div className="grid-container grid-container-centered">
          <div className="card" onClick={() => handleCardClick("Artículos")}>
            <img src={articulo} alt="Artículos" className="card-image" />
            <p>Artículos</p>
          </div>
          <div className="card" onClick={() => handleCardClick("Actividades")}>
            <img src={actividad} alt="Actividades" className="card-image" />
            <p>Actividades</p>
          </div>
          <div className="card" onClick={() => handleCardClick("Foro")}>
            <img src={foro} alt="Foro" className="card-image" />
            <p>Foro</p>
          </div>
          <div className="card" onClick={() => handleCardClick("Exámenes")}>
            <img src={examen} alt="Exámenes" className="card-image" />
            <p>Exámenes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cursos;

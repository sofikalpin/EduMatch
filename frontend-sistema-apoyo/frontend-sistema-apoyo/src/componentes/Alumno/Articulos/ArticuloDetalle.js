import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LogoInicio from "../../../logo/LogoInicio.png";
import chatIcon from "../Imagenes/chat.png";
import './articuloDetalle.css';
import { useNavigate } from "react-router-dom";

const ArticuloDetalle = () => {
  const { id } = useParams(); // Obtener el ID del artículo de la URL
  const [article, setArticle] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Simula obtener el artículo desde un servidor o una base de datos
  useEffect(() => {
    // Datos simulados, reemplazar por la llamada al backend más adelante
    const articles = [
      { id: 1, title: "Cómo utilizar el pasado en conversaciones cotidianas", content: "Contenido detallado del artículo 1" },
      { id: 2, title: "Claves para mejorar tu pronunciación en inglés", content: "Contenido detallado del artículo 2" },
      { id: 3, title: "Uso correcto de los verbos modales en inglés", content: "Contenido detallado del artículo 3" },
      { id: 4, title: "El presente perfecto en situaciones reales", content: "Contenido detallado del artículo 4" },
      { id: 5, title: "Diferencias entre 'must' y 'have to'", content: "Contenido detallado del artículo 5" },
    ];

    // Buscar el artículo basado en el id recibido de la URL
    const foundArticle = articles.find((article) => article.id === Number(id));
    setArticle(foundArticle);
  }, [id]);

  if (!article) {
    return <div>Cargando artículo...</div>;
  }

  // Función que maneja el clic para redirigir a diferentes páginas
  const handleCardClick = (option) => {
    switch(option) {
      case "Mis Cursos":
        navigate("/miscursos");
        break;
      case "INICIO":
        navigate("/"); 
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
        navigate("/mi-perfil");
        break;
      case "Cambiar de cuenta":
        break;
      case "Salir":
        break;
      default:
        break;
    }
    setIsMenuOpen(false);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="header">
        <div className="nav-links">
          <img src={LogoInicio} alt="Logo" className="logo" />
          <Link to="/" className="nav-item">INICIO</Link>
          <Link to="/miscursos" className="nav-item">
            MIS CURSOS
          </Link>
        
        </div>
        <div className="user-info">
          <span>Maria A</span>
          <div className="user-avatar" onClick={() => setIsMenuOpen(!isMenuOpen)}>M</div>
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

      <div className="container">
        <div className="content">
          <h1 className="title">{article.title}</h1>
          <div className="article-content">
            <p>{article.content}</p>
          </div>
          <Link to="/alumno/articulos" className="back-link">Volver a artículos</Link>
        </div>
      </div>
    </div>
  );
};

export default ArticuloDetalle;

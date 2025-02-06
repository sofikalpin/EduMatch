import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LogoInicio from "../../../logo/LogoInicio.png";
import chatIcon from "../Imagenes/chat.png";
import './articuloDetalle.css';
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate

const ArticuloDetalle = () => {
  const { id } = useParams(); // Obtener el ID del artículo de la URL
  const [article, setArticle] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Establecer el estado aquí para evitar el error
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

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
    const foundArticle = articles.find((article) => article.id === parseInt(id));
    setArticle(foundArticle);
  }, [id]);

  if (!article) {
    return <div>Cargando artículo...</div>;
  }

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
      <nav className="navbar">
        <div className="navbar-left">
          <img src={LogoInicio} alt="Logo" className="navbar-logo" />
          {/* Aquí invertimos el orden de los enlaces */}
          <a href="#inicio" onClick={() => handleCardClick("INICIO")}>INICIO</a> {/* Primero INICIO */}
          <a href="#mis-cursos" onClick={() => handleCardClick("Mis Cursos")}>MIS CURSOS</a> {/* Después Mis Cursos */}
          <a href="#herramientas">PROFESORES</a>
        </div>
        <div className="navbar-right">
          <span>María A</span>
          <div className="icon" onClick={toggleMenu}> {/* Tocar el avatar abre el menú */}
            <span className="icon-circle">M</span> 
          </div>
          <div className="chat-icon">
            <img src={chatIcon} alt="Chat" className="chat-icon-image" />
          </div>
          {/* Menú desplegable en mini contenedor */}
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

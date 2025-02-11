import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LogoInicio from "../../../logo/LogoInicio.png";
import chatIcon from "../Imagenes/chat.png";
import { useNavigate } from "react-router-dom";
import Header from '../HeaderAlumno';
import Footer from '../FooterAlumno';

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
      <Header></Header>

      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 m-10">{article.title}</h1>
          <div className="text-gray-600 mb-6">
            <p>{article.content}</p>
          </div>
          <Link to="/alumno/articulos" className="text-blue-500 hover:text-blue-700">Volver a artículos</Link>
        </div>
      </div>
      <div className="mt-32"></div>
      <Footer></Footer>
    </div>
  );
};

export default ArticuloDetalle;

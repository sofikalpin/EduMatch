import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./articulos.css";
import LogoInicio from "../../../logo/LogoInicio.png";
import chatIcon from "../Imagenes/chat.png";
import logoarticulo from "../Imagenes/logoarticulo.png";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate

const Articulos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unidades, setUnidades] = useState([]);
  const [assignedArticles, setAssignedArticles] = useState([
    { id: 1, title: "Cómo utilizar el pasado en conversaciones cotidianas", link: "/articulo/1", unidad: 1 },
    { id: 2, title: "Claves para mejorar tu pronunciación en inglés", link: "/articulo/2", unidad: 2 },
    { id: 3, title: "Uso correcto de los verbos modales en inglés", link: "/articulo/3", unidad: 3 },
    { id: 4, title: "El presente perfecto en situaciones reales", link: "/articulo/4", unidad: 1 },
    { id: 5, title: "Diferencias entre 'must' y 'have to'", link: "/articulo/5", unidad: 2 },
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú
  const navigate = useNavigate(); // Usamos useNavigate para redirigir
  const location = useLocation(); // Obtén la ruta actual

  useEffect(() => {
    const unidadesAsignadas = Array.from({ length: 12 }, (_, i) => `Unit ${i + 1}`);
    setUnidades(unidadesAsignadas);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedUnit(null); // Reset unit selection when searching
  };

  const handleUnitClick = (unitNumber) => {
    setSelectedUnit(unitNumber);
    setSearchQuery(`Unit ${unitNumber}`);
  };

  const filteredArticles = assignedArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `Unit ${article.unidad}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const articlesForSelectedUnit = assignedArticles.filter((article) => article.unidad === selectedUnit);

  // Verificar si la unidad seleccionada tiene artículos asignados
  const isUnitEmpty = selectedUnit !== null && articlesForSelectedUnit.length === 0;

  // Verificar si la búsqueda es por una unidad que no existe
  const isUnitSearch = searchQuery.toLowerCase().includes("unit");
  const searchUnitNumber = isUnitSearch ? parseInt(searchQuery.split(" ")[1], 10) : null;
  const isSearchUnitEmpty =
    searchUnitNumber && !assignedArticles.some((article) => article.unidad === searchUnitNumber);

  // Función para manejar el clic para redirigir a diferentes páginas
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
      {/* Navbar */}
      <nav className="header">
        <div className="nav-links">
          <img src={LogoInicio} alt="Logo" className="logo" />
          <Link to="/" className="nav-item">INICIO</Link>
          <Link
            to="/miscursos"
            className={`nav-item ${location.pathname === "/miscursos" ? "active" : ""}`}
          >
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
                <li onClick={() => handleMenuOptionClick("Mi perfil")}>Mi perfil</li>
                <li onClick={() => handleMenuOptionClick("Cambiar de cuenta")}>Cambiar de cuenta</li>
                <li onClick={() => handleMenuOptionClick("Salir")}>Salir</li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="content">
        <h1 className="title">Articles</h1>

        <div className="main-section">
          <div className="sidebar">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search article or Unit"
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="unit-list">
              {unidades.map((unit, index) => {
                const unitNumber = index + 1;
                return (
                  <div key={index} className="unit-item">
                    <button className="unit-link" onClick={() => handleUnitClick(unitNumber)}>
                      {unit}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`articles ${selectedUnit ? "small-cards" : ""}`}>
            {/* Mostrar el mensaje si la unidad seleccionada está vacía */}
            {isUnitEmpty ? (
              <p className="no-articles-message">This unit does not contain any activities at the moment.</p>
            ) : isSearchUnitEmpty ? (
              <p className="no-articles-message">
                This unit does not exist at the moment. "{searchQuery}"
              </p>
            ) : (
              filteredArticles.map((article) => (
                <div key={article.id} className="article-card">
                  <Link to={article.link} className="article-link">
                    <div className="article-image-container">
                      <img src={logoarticulo} alt="Logo Articulo" className="logo-article" />
                    </div>
                    <p className="article-title">Unit {article.unidad}: {article.title}</p>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articulos;

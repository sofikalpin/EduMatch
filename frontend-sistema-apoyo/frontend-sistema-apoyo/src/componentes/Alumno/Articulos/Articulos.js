import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./articulos.css";
import LogoInicio from "../../../logo/LogoInicio.png";
import chatIcon from "../Imagenes/chat.png";
import logoarticulo from "../Imagenes/logoarticulo.png";

const Articulos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unidades, setUnidades] = useState([]);
  const [assignedArticles] = useState([
    { id: 1, title: "Cómo utilizar el pasado en conversaciones cotidianas", unidad: 1 },
    { id: 2, title: "Claves para mejorar tu pronunciación en inglés", unidad: 2 },
    { id: 3, title: "Uso correcto de los verbos modales en inglés", unidad: 3 },
    { id: 4, title: "El presente perfecto en situaciones reales", unidad: 1 },
    { id: 5, title: "Diferencias entre 'must' y 'have to'", unidad: 2 },
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUnidades(Array.from({ length: 12 }, (_, i) => `Unit ${i + 1}`));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedUnit(null);
  };

  const handleUnitClick = (unitNumber) => {
    setSelectedUnit(unitNumber);
    setSearchQuery(`Unit ${unitNumber}`);
  };

  const filteredArticles = assignedArticles.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `Unit ${article.unidad}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  

  const isUnitEmpty = selectedUnit !== null && filteredArticles.length === 0;

  return (
    <div>
      {/* Navbar */}
      <nav className="header">
        <div className="nav-links">
          <img src={LogoInicio} alt="Logo" className="logo" />
          <Link to="/" className="nav-item">INICIO</Link>
          <Link to="/miscursos" className={`nav-item ${location.pathname === "/miscursos" ? "active" : ""}`}>
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
                <li onClick={() => navigate("/mi-perfil")}>Mi perfil</li>
                <li onClick={() => navigate("/cambiar-cuenta")}>Cambiar de cuenta</li>
                <li onClick={() => navigate("/salir")}>Salir</li>
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
              {unidades.map((unit, index) => (
                <div key={index} className="unit-item">
                  <button className="unit-link" onClick={() => handleUnitClick(index + 1)}>
                    {unit}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={`articles ${selectedUnit ? "small-cards" : ""}`}>
            {isUnitEmpty ? (
              <p className="no-articles-message">This unit does not contain any activities at the moment.</p>
            ) : (
              filteredArticles.map((article) => (
                <div key={article.id} className="article-card">
                  {/* Cambié la ruta para que coincida con la definida en App.js */}
                  <Link to={`/alumno/articulo/${article.id}`} className="article-link">
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

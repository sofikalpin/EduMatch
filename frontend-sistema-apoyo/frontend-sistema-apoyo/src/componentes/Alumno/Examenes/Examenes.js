import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Asegúrate de usar useLocation
import "./examenes.css";
import LogoInicio from "../../../logo/LogoInicio.png";
import chatIcon from "../Imagenes/chat.png";
import examenLogo from "../Imagenes/examen.png";

const Examenes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unidades, setUnidades] = useState([]);
  const [assignedExamenes, setAssignedExamenes] = useState([
    { id: 1, title: "Cómo utilizar el pasado en conversaciones cotidianas", link: "/examenes/1", unidad: 1 },
    { id: 2, title: "Claves para mejorar tu pronunciación en inglés", link: "/examenes/2", unidad: 2 },
    { id: 3, title: "Uso correcto de los verbos modales en inglés", link: "/examenes/3", unidad: 3 },
    { id: 4, title: "El presente perfecto en situaciones reales", link: "/examenes/4", unidad: 1 },
    { id: 5, title: "Diferencias entre 'must' y 'have to'", link: "/examen/5", unidad: 2 },
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Usar useLocation en lugar de location global

  useEffect(() => {
    const unidadesAsignadas = Array.from({ length: 12 }, (_, i) => `Unit ${i + 1}`);
    setUnidades(unidadesAsignadas);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedUnit(null);
  };

  const handleUnitClick = (unitNumber) => {
    setSelectedUnit(unitNumber);
    setSearchQuery(`Unit ${unitNumber}`);
  };

  const filteredExamenes = assignedExamenes.filter(
    (examen) =>
      examen.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `Unit ${examen.unidad}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const examenesForSelectedUnit = assignedExamenes.filter((examen) => examen.unidad === selectedUnit);
  const isUnitEmpty = selectedUnit !== null && examenesForSelectedUnit.length === 0;
  const isUnitSearch = searchQuery.toLowerCase().includes("unit");
  const searchUnitNumber = isUnitSearch ? parseInt(searchQuery.split(" ")[1], 10) : null;
  const isSearchUnitEmpty =
    searchUnitNumber && !assignedExamenes.some((examen) => examen.unidad === searchUnitNumber);

  const navigate = useNavigate();

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
    <div className="container">
      {/* Barra de navegación actualizada */}
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
                <li onClick={() => handleMenuOptionClick("Mi perfil")}>Mi perfil</li>
                <li onClick={() => handleMenuOptionClick("Cambiar de cuenta")}>Cambiar de cuenta</li>
                <li onClick={() => handleMenuOptionClick("Salir")}>Salir</li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Contenido */}
      <div className="content">
        <h1 className="title">Examenes</h1>

        <div className="main-section">
          <div className="sidebar">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search examen or Unit"
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

          <div className={`examenes ${selectedUnit ? "small-cards" : ""}`}>
            {isUnitEmpty ? (
              <p className="no-examenes-message">This unit does not contain any examenes at the moment.</p>
            ) : isSearchUnitEmpty ? (
              <p className="no-examenes-message">
                This unit does not exist at the moment. "{searchQuery}"
              </p>
            ) : (
              filteredExamenes.map((examen) => (
                <div key={examen.id} className="examen-card">
                  {/* Aquí es donde cambia la redirección a la página de ExamenDetalle */}
                  <Link to={`/alumno/examenes/${examen.id}`} className="examen-link">
                    <div className="examen-image-container">
                      <img src={examenLogo} alt="Logo Examen" className="logo-examen" />
                    </div>
                    <p className="examen-title">Unit {examen.unidad}: {examen.title}</p>
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

export default Examenes;

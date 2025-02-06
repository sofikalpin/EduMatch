import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./actividades.css";
import LogoInicio from "../../../logo/LogoInicio.png";
import chatIcon from "../Imagenes/chat.png";
import actividad from "../Imagenes/actividades.png";

const Actividades = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unidades, setUnidades] = useState([]);
  const [assignedActivities, setAssignedActivities] = useState([
    { id: 1, title: "Cómo utilizar el pasado en conversaciones cotidianas", link: "/actividades/1", unidad: 1 },
    { id: 2, title: "Claves para mejorar tu pronunciación en inglés", link: "/actividades/2", unidad: 2 },
    { id: 3, title: "Uso correcto de los verbos modales en inglés", link: "/actividades/3", unidad: 3 },
    { id: 4, title: "El presente perfecto en situaciones reales", link: "/actividades/4", unidad: 1 },
    { id: 5, title: "Diferencias entre 'must' y 'have to'", link: "/actividades/5", unidad: 2 },
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

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

  const filteredActivities = assignedActivities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `Unit ${activity.unidad}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activitiesForSelectedUnit = assignedActivities.filter((activity) => activity.unidad === selectedUnit);
  const isUnitEmpty = selectedUnit !== null && activitiesForSelectedUnit.length === 0;
  const isUnitSearch = searchQuery.toLowerCase().includes("unit");
  const searchUnitNumber = isUnitSearch ? parseInt(searchQuery.split(" ")[1], 10) : null;
  const isSearchUnitEmpty =
    searchUnitNumber && !assignedActivities.some((activity) => activity.unidad === searchUnitNumber);

  const handleCardClick = (option) => {
    switch (option) {
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuOptionClick = (option) => {
    switch (option) {
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

      <div className="container">
        <div className="content">
          <h1 className="title">Activities</h1>

          <div className="main-section">
            <div className="sidebar">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search activity or Unit"
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

            <div className={`activities ${selectedUnit ? "small-cards" : ""}`}>
              {isUnitEmpty ? (
                <p className="no-activities-message">This unit does not contain any activities at the moment.</p>
              ) : isSearchUnitEmpty ? (
                <p className="no-activities-message">
                  This unit does not exist at the moment. "{searchQuery}"
                </p>
              ) : (
                filteredActivities.map((activity) => (
                  <div key={activity.id} className="activity-card">
                    <Link to={activity.link} className="activity-link">
                      <div className="activity-image-container">
                        <img src={actividad} alt="Logo Actividad" className="logo-activity" />
                      </div>
                      <p className="activity-title">Unit {activity.unidad}: {activity.title}</p>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actividades;

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./actividadDetalle.css";
import LogoInicio from "../../../logo/LogoInicio.png";
import chatIcon from "../Imagenes/chat.png";
import logoactividad from "../Imagenes/actividades.png";
import youtubeIcon from "../Imagenes/youtube.png"; 
import driveIcon from "../Imagenes/drive.png"; 
import uploadIcon from "../Imagenes/upload.png";
import { FaSearch } from "react-icons/fa";

const ActividadDetalle = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  console.log("ID de la actividad:", id);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [actividad, setActividad] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unidades, setUnidades] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const youtubeInputRef = useRef(null);
  const driveInputRef = useRef(null);
  const uploadInputRef = useRef(null);

  const actividades = [
    { id: "1", title: "Cómo utilizar los phrasal verbs en conversaciones cotidianas", description: "En esta actividad hay que completar con el phrasal verb que corresponde." },
    { id: "2", title: "Uso de tiempos verbales en inglés", description: "Practica el uso de los tiempos verbales en diferentes contextos." },
    { id: "3", title: "Preparación para el examen de listening", description: "Escucha el audio y responde las preguntas relacionadas." },
  ];

  useEffect(() => {
    const actividadEncontrada = actividades.find((actividad) => actividad.id === id);
    if (actividadEncontrada) {
      setActividad(actividadEncontrada);
    }
  }, [id]);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  const handleUploadClick = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name); 
      setLoading(true); 
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const archivoSubido = "https://www.example.com/archivo-actividad.pdf"; 

  if (!actividad) return <div>Cargando...</div>; 

  const handleSubmit = () => {
    setIsSubmitted(true); 
    alert("Actividad entregada");
  };

  return (
    <div>
      <nav className="header">
        <div className="nav-links">
          <img src={LogoInicio} alt="Logo" className="logo" />
          <a href="#inicio" onClick={() => navigate("/")}>INICIO</a>
          <a href="#mis-cursos" onClick={() => navigate("/miscursos")}>MIS CURSOS</a>
        </div>
        <div className="user-info">
          <span>María A</span>
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

      <div className="content">
        <div className="activity-container">
          <div className="activity-left">
            <h1 className="title">{actividad.title}</h1>
            <div className="activity-details">
              <img src={logoactividad} alt="Actividad" className="activity-image" />
              <p className="activity-description-label">Descripción:</p>
              <p className="activity-description">{actividad.description}</p>
              {archivoSubido && (
                <div className="uploaded-file-container">
                  <p>Archivo de la actividad:</p>
                  <a href={archivoSubido} download className="download-button">
                    Descargar actividad
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="activity-right">
            <div className="upload-container">
              <span className="due-date">Fecha de entrega: 25/08</span>
              <div className="upload-icons">
                <img
                  src={youtubeIcon}
                  alt="YouTube"
                  className="upload-icon"
                  onClick={() => handleUploadClick(youtubeInputRef)}
                />
                <input
                  type="file"
                  accept="video/*"
                  ref={youtubeInputRef}
                  className="file-input"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <img
                  src={driveIcon}
                  alt="Google Drive"
                  className="upload-icon"
                  onClick={() => handleUploadClick(driveInputRef)}
                />
                <input
                  type="file"
                  ref={driveInputRef}
                  className="file-input"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <img
                  src={uploadIcon}
                  alt="Subir archivo"
                  className="upload-icon"
                  onClick={() => handleUploadClick(uploadInputRef)}
                />
                <input
                  type="file"
                  ref={uploadInputRef}
                  className="file-input"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              {selectedFile && !loading && <p className="file-name">Archivo seleccionado: {selectedFile}</p>}
              {loading && <p className="loading">Cargando archivo...</p>}
            </div>

            <div className="activity-actions">
              <button
                className={`submit-button ${isSubmitted ? "submitted" : ""}`}
                onClick={handleSubmit}
                disabled={isSubmitted}
              >
                {isSubmitted ? "Actividad entregada" : "Entregar actividad"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActividadDetalle;

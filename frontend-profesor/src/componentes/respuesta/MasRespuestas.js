import './MasRespuestas.css';
import React, { useState, useEffect } from 'react'; // Única declaración de React
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de agregar esta importación
import axios from 'axios';
import logo from "../../componentes/logo/LogoInicio.png";
import { API_BASE_URL } from "../config/Api";

const MasRespuestas = () => {
  const navigate = useNavigate();
  const [Respuestas, setRespuestas] = useState([]); // Renamed to Respuestas
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar las respuestas desde la API
  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Respuesta`);
        setRespuestas(response.data); // Guarda las respuestas en el estado
        setIsLoading(false); // Cambia el estado a no cargando
      } catch (err) {
        setError("Error al cargar las Respuestas"); // Si hay un error, muestra el mensaje de error
        setIsLoading(false);
      }
    };

    fetchRespuestas();
  }, []); // This effect will run once when the component is mounted

  // Función para navegar a la página de respuesta con el consultaId
  const handleResponder = (consultaId) => {
    navigate('/respuesta', { state: { consultaId } });
  };

  // Función para navegar a la página de ForoCompleto
  const handleForoCompleto = () => {
    navigate('/forocompleto');
  };

  return (
    <div className="mas-masRespuestas">
      <header className="header">
        <img src={logo} alt="Logo" className="logo-img" />
        <nav className="navigation">
          <ul>
            <li><Link to="#">Profesores</Link></li>
            <li><Link to="#">Programa</Link></li>
            <li><Link to="#">Herramientas</Link></li>
          </ul>
        </nav>
      </header>

      <div className="respuestas-header">
        <h2>Más Respuestas</h2>
      </div>

      <div className="respuestas-content">
        {/* Static foro post */}
        <div className="respuestas-post">
          <div className="respuesta-header">
            <div className="user-info">
              <span className="user-initial">0</span>
              <span className="user-name">Oriana Acosta</span>
            </div>
            <span className="post-date">Dia 18/10</span>
          </div>
          <div className="post-content">
            <p>Buenas tardes! El past simple se usa para acciones terminadas en el pasado, con un tiempo específico o implícito. 
            Ejemplos: I went to the store (Fui a la tienda). Cualquier consulta me escriben.</p>
          </div>
          <div className="post-actions">
            <button 
              className="btn-responder"
              onClick={() => handleResponder(0)}
            >
              Responder
            </button>
          </div>
        </div>

        {/* Dynamic foro posts */}
        {isLoading ? (
          <div>Cargando respuestas...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          Respuestas.map((respuesta) => (
            <div key={respuesta.Idrespuesta} className="foro-post">
              <div className="post-header">
                <div className="user-info">
                  <span className="user-initial">{respuesta.Titulo[0]}</span>
                  <span className="user-name">Usuario {respuesta.Idusuario}</span>
                </div>
                <span className="post-date">
                  {respuesta.Fechahora ? new Date(respuesta.Fechahora).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }) : 'Fecha desconocida'}
                </span>
              </div>
              <div className="post-content">
                <h3>{respuesta.Titulo}</h3>
                <p>{respuesta.Contenido}</p>
              </div>
              <div className="post-actions">
                <button 
                  className="btn-responder"
                  onClick={() => handleResponder(respuesta.Idrespuesta)}
                >
                  Responder
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button 
        className="btn-nueva-consulta"
        onClick={handleForoCompleto}
      >
        Foro Completo
      </button>
    </div>
  );
};

export default MasRespuestas;
import './Foro.css';
import logo from "../../componentes/logo/LogoInicio.png";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from "../config/Api";

const ForoCompleto = () => {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/API/Consulta/Listar Consultas`);
        if (response.data.status) {
          setConsultas(response.data.value);
        } else {
          throw new Error('Failed to fetch consultas');
        }
      } catch (err) {
        setError('Error al cargar las consultas. Por favor, intente nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultas();
  }, []);

  const handleResponder = (consultaId) => {
    navigate('/respuesta', { state: { consultaId } });
  };

  // New handler for navigating to MasRespuestas when +Respuestas is clicked
  const handleMasRespuestas = () => {
    navigate('/masrespuestas');
  };

  const handleNuevaConsulta = () => {
    navigate('/consulta');
  };
  
  return (
    <div className="foro-completo">
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
      <div className="foro-header">
        <h2>Foro</h2>
      </div>
      
      <div className="foro-content">
        {/* Static foro post */}
        <div className="foro-post">
          <div className="post-header">
            <div className="user-info">
              <span className="user-initial">V</span>
              <span className="user-name">Valentina Capra</span>
            </div>
            <span className="post-date">Dia 18/10</span>
          </div>
          <div className="post-content">
            <p>Buenas tardes! Cuando tengo que usar el past simple?</p>
          </div>
          <div className="post-actions">
            <button 
              className="btn-responder"
              onClick={() => handleResponder(0)}
            >
              Responder
            </button>
            <button 
              className="btn-respuestas"
              onClick={handleMasRespuestas}  // Added this to navigate to MasRespuestas
            >
              +respuestas
            </button>
          </div>
        </div>

        {/* Dynamic foro posts */}
        {isLoading ? (
          <div>Cargando consultas...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          consultas.map((consulta) => (
            <div key={consulta.Idconsulta} className="foro-post">
              <div className="post-header">
                <div className="user-info">
                  <span className="user-initial">{consulta.Titulo[0]}</span>
                  <span className="user-name">Usuario {consulta.Idusuario}</span>
                </div>
                <span className="post-date">
                  {consulta.Fechahora ? new Date(consulta.Fechahora).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }) : 'Fecha desconocida'}
                </span>
              </div>
              <div className="post-content">
                <h3>{consulta.Titulo}</h3>
                <p>{consulta.Contenido}</p>
              </div>
              <div className="post-actions">
                <button 
                  className="btn-responder"
                  onClick={() => handleResponder(consulta.Idconsulta)}
                >
                  Responder
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button 
        className="btn-button"
        onClick={handleNuevaConsulta}
      >
        + Nueva Consulta
      </button>
    </div>
  );
};

export default ForoCompleto;
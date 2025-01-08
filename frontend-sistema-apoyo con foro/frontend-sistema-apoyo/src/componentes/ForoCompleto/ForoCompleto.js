import './ForoCompleto.css';
import logo from '../../logo/LogoInicio.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const ForoCompleto = () => {
  const navigate = useNavigate();

  const handleResponder = () => {
    navigate('/respuesta');
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
        {/* Contenido del foro */}
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
              onClick={handleResponder}
            >
              Responder
            </button>
          </div>
        </div>
      </div>

      <button 
        className="btn-nueva-consulta"
        onClick={handleNuevaConsulta}
      >
        + Nueva Consulta
      </button>
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo-img" />
      </div>
    </div>
  );
};

export default ForoCompleto;

   
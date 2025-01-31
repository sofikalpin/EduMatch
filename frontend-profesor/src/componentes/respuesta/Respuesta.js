import React, { useState, useEffect } from "react";
import './Respuesta.css';
import logo from '../../componentes/logo/LogoInicio.png';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

const Respuesta = ({ idconsulta }) => {
  const [respuestas, setRespuestas] = useState([]);
  const [nuevaRespuesta, setNuevaRespuesta] = useState({
    contenido: '',
    idconsulta: idconsulta,
    idusuario: 0,
    fechahora: new Date().toISOString()
  });
  const [editandoRespuesta, setEditandoRespuesta] = useState(null);
  const [error, setError] = useState('');
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate aquí

  // Consultar todas las respuestas
  const consultarRespuestas = async () => {
    try {
      const response = await fetch('API/Respuesta/ConsultarRespuesta');
      const data = await response.json();
      if (data.status) {
        const respuestasFiltradas = idconsulta 
          ? data.value.filter(r => r.idconsulta === idconsulta)
          : data.value;
        setRespuestas(respuestasFiltradas);
      }
    } catch (error) {
      console.error("Error al cargar las respuestas:", error);
      setError('Error al cargar las respuestas');
    }
  };

  // Crear una nueva respuesta
  const crearRespuesta = async (e) => {
    e.preventDefault();
    if (!nuevaRespuesta.contenido.trim()) {
      setError("El contenido de la respuesta no puede estar vacío");
      return;
    }
    try {
      const response = await fetch('API/Respuesta/CrearRespuesta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaRespuesta)
      });
      const data = await response.json();
      if (data.status) {
        consultarRespuestas();
        setNuevaRespuesta({
          ...nuevaRespuesta,
          contenido: ''
        });
      }
    } catch (error) {
      console.error("Error al crear la respuesta:", error);
      setError('Error al crear la respuesta');
    }
  };

  // Actualizar una respuesta
  const actualizarRespuesta = async (respuesta) => {
    try {
      const response = await fetch(`API/Respuesta/ActualizarRespuesta?id=${respuesta.idrespuesta}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(respuesta)
      });
      const data = await response.json();
      if (data.status) {
        consultarRespuestas();
        setEditandoRespuesta(null);
      }
    } catch (error) {
      console.error("Error al actualizar la respuesta:", error);
      setError('Error al actualizar la respuesta');
    }
  };

  // Eliminar una respuesta
  const eliminarRespuesta = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar esta respuesta?')) return;

    try {
      const response = await fetch(`API/Respuesta/EliminarRespuesta?id=${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.status) {
        consultarRespuestas();
      }
    } catch (error) {
      console.error("Error al eliminar la respuesta:", error);
      setError('Error al eliminar la respuesta');
    }
  };

  // Obtener una respuesta por ID
  const obtenerRespuestaPorId = async (id) => {
    try {
      const response = await fetch(`API/Respuesta/ObtenerRespuestaPorId?id=${id}`);
      const data = await response.json();
      if (data.status) {
        setRespuestaSeleccionada(data.value);
      }
    } catch (error) {
      console.error("Error al obtener la respuesta por ID:", error);
      setError('Error al obtener la respuesta por ID');
    }
  };

  useEffect(() => {
    consultarRespuestas();
  }, [idconsulta]);

  const handleForo = () => {
    navigate('/Foro'); // Usa navigate correctamente
  };

  return (
    <div className="p-4">
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
            <h2 className="tituloRespuesta">Respuesta</h2>
      {/* Formulario de nueva respuesta */}
      <form onSubmit={crearRespuesta} className="FormCrearRespuesta">
        <textarea
          className="EscribeRespuesta"
          placeholder="Escribe tu respuesta..."
          value={nuevaRespuesta.contenido}
          onChange={(e) => setNuevaRespuesta({...nuevaRespuesta, contenido: e.target.value})}
          required
        />
        <button 
          type="submit"
          className="btn-EnviarRespuesta"
        >
          Enviar Respuesta
        </button>
      </form>

      {/* Lista de respuestas */}
      <div className="respuestas">
        {respuestas.map((respuesta) => (
          <div key={respuesta.idrespuesta} className="RespuestaIDrespuesta">
            {editandoRespuesta?.idrespuesta === respuesta.idrespuesta ? (
              <div className="editarRespuesta">
                <textarea
                  className="editandoRespuesta.contenido"
                  value={editandoRespuesta.contenido}
                  onChange={(e) => setEditandoRespuesta({
                    ...editandoRespuesta,
                    contenido: e.target.value
                  })}
                />
                <div className="actualizarRespuesta">
                  <button
                    onClick={() => actualizarRespuesta(editandoRespuesta)}
                    className="bt-guardar"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditandoRespuesta(null)}
                    className="btn-cancelar"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="respuesta.contenido">{respuesta.contenido}</p>
                <div className="respuesta.fechahora">
                  <span>{new Date(respuesta.fechahora).toLocaleDateString()}</span>
                  <div className="eliminarRespuesta">
                    <button
                      onClick={() => setEditandoRespuesta(respuesta)}
                      className="btn-editar"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarRespuesta(respuesta.idrespuesta)}
                      className="btn-eliminar"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => obtenerRespuestaPorId(respuesta.idrespuesta)}
                      className="btn-verRespuesta"
                    >
                      Ver Respuesta
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {respuestaSeleccionada && (
        <div className="respuestaSeleccionada">
          <h4 className="respuestaSeleccionadaContenido">Respuesta seleccionada:</h4>
          <p>{respuestaSeleccionada.contenido}</p>
          <span>{new Date(respuestaSeleccionada.fechahora).toLocaleDateString()}</span>
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}
              <button 
        className="btn-button"
        onClick={handleForo}
      >
       volver
      </button>
    </div>
  );
};

export default Respuesta;
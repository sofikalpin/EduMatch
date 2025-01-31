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

  const handleForoCompleto = () => {
    navigate('/forocompleto'); // Usa navigate correctamente
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
            <h2 className="text-2xl font-bold mb-4">Respuesta</h2>
      {/* Formulario de nueva respuesta */}
      <form onSubmit={crearRespuesta} className="mb-6 space-y-4 bg-gray-50 p-4 rounded">
        <textarea
          className="border p-2 rounded w-full h-24"
          placeholder="Escribe tu respuesta..."
          value={nuevaRespuesta.contenido}
          onChange={(e) => setNuevaRespuesta({...nuevaRespuesta, contenido: e.target.value})}
          required
        />
        <button 
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Enviar Respuesta
        </button>
      </form>

      {/* Lista de respuestas */}
      <div className="space-y-4">
        {respuestas.map((respuesta) => (
          <div key={respuesta.idrespuesta} className="border rounded p-4 bg-white">
            {editandoRespuesta?.idrespuesta === respuesta.idrespuesta ? (
              <div className="space-y-2">
                <textarea
                  className="border p-2 rounded w-full"
                  value={editandoRespuesta.contenido}
                  onChange={(e) => setEditandoRespuesta({
                    ...editandoRespuesta,
                    contenido: e.target.value
                  })}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => actualizarRespuesta(editandoRespuesta)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditandoRespuesta(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-2">{respuesta.contenido}</p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{new Date(respuesta.fechahora).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditandoRespuesta(respuesta)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarRespuesta(respuesta.idrespuesta)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => obtenerRespuestaPorId(respuesta.idrespuesta)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
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
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h4 className="text-lg font-semibold">Respuesta seleccionada:</h4>
          <p>{respuestaSeleccionada.contenido}</p>
          <span>{new Date(respuestaSeleccionada.fechahora).toLocaleDateString()}</span>
        </div>
      )}

      {error && (
        <div className="text-red-500 mt-4 p-2 bg-red-50 rounded">
          {error}
        </div>
      )}
              <button 
        className="btn-button"
        onClick={handleForoCompleto}
      >
        Foro Completo
      </button>
    </div>
  );
};

export default Respuesta;
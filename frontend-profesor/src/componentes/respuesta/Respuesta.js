//import React, { useState, useEffect } from "react";
//import './Respuesta.css';
//import logo from '../../componentes/logo/LogoInicio.png';
//import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

import React, { useState, useEffect } from "react";
import logo from '../../componentes/logo/LogoInicio.png';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    navigate('/Foro');
  };

  return (
    <div className="p-4 pt-32">
     <header className="fixed top-0 left-0 right-0 flex justify-between items-center w-full h-24 bg-custom-teal shadow-lg rounded-b-[50px] z-50">
  <div className="flex items-center pl-2 bg-">
    <img 
      src={logo} 
      alt="Logo" 
      className="w-20 h-auto" // Logo más pequeño
    />
  </div>
  <nav className="pr-8">
    <ul className="flex gap-5">
      <li><Link to="#" className="text-white text-lg">Profesores</Link></li>
      <li><Link to="#" className="text-white text-lg">Programa</Link></li>
      <li><Link to="#" className="text-white text-lg">Herramientas</Link></li>
    </ul>
  </nav>
</header>
      <h2 className="text-2xl font-bold mb-4">Respuesta</h2>
      <form onSubmit={crearRespuesta} className="mb-6">
        <textarea
          className="w-full p-32 border border-gray-300 rounded-lg bg-gray-100"
          placeholder="Escribe tu respuesta..."
          value={nuevaRespuesta.contenido}
          onChange={(e) => setNuevaRespuesta({...nuevaRespuesta, contenido: e.target.value})}
          required
        />
        <button 
          type="submit"
          className="mt-2 bg-yellow-400 text-white px-4 py-2 rounded-lg font-medium"
        >
          Enviar Respuesta
        </button>
      </form>

      <div className="space-y-4">
        {respuestas.map((respuesta) => (
          <div key={respuesta.idrespuesta} className="p-4 border-b border-gray-200 relative">
            {editandoRespuesta?.idrespuesta === respuesta.idrespuesta ? (
              <div>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  value={editandoRespuesta.contenido}
                  onChange={(e) => setEditandoRespuesta({
                    ...editandoRespuesta,
                    contenido: e.target.value
                  })}
                />
                <div className="mt-2">
                  <button
                    onClick={() => actualizarRespuesta(editandoRespuesta)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditandoRespuesta(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-700">{respuesta.contenido}</p>
                <div className="text-sm text-gray-600 mt-2">
                  <span>{new Date(respuesta.fechahora).toLocaleDateString()}</span>
                  <div className="mt-2">
                    <button
                      onClick={() => setEditandoRespuesta(respuesta)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarRespuesta(respuesta.idrespuesta)}
                      className="text-red-500 hover:text-red-700 mr-2"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => obtenerRespuestaPorId(respuesta.idrespuesta)}
                      className="text-green-500 hover:text-green-700"
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
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-bold">Respuesta seleccionada:</h4>
          <p className="text-gray-700">{respuestaSeleccionada.contenido}</p>
          <span className="text-sm text-gray-600">{new Date(respuestaSeleccionada.fechahora).toLocaleDateString()}</span>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}

<button
  className="mt-4 bg-teal-claro text-white px-6 py-3 rounded-xl fixed bottom-8 right-8 shadow-xl z-50"
  onClick={handleForo}
>
  Volver
</button>

    </div>
  );
};

export default Respuesta;
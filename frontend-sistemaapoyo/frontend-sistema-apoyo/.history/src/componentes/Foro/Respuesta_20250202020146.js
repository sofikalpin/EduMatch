import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Edit2, Trash2, Eye, Send, ArrowLeft } from 'lucide-react';

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
      setError('Error al obtener la respuesta');
    }
  };

  useEffect(() => {
    consultarRespuestas();
  }, [idconsulta]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-teal-600 to-teal-400 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/api/placeholder/40/40"
                alt="Logo" 
                className="w-8 h-8 rounded-full"
              />
            </div>
            <nav className="hidden md:block">
              <div className="flex space-x-8">
                <Link to="#" className="text-white hover:text-teal-100 px-3 py-2 rounded-md text-sm font-medium">Profesores</Link>
                <Link to="#" className="text-white hover:text-teal-100 px-3 py-2 rounded-md text-sm font-medium">Programa</Link>
                <Link to="#" className="text-white hover:text-teal-100 px-3 py-2 rounded-md text-sm font-medium">Herramientas</Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <MessageCircle className="mr-2" />
            Respuestas
          </h2>

          <form onSubmit={crearRespuesta} className="mb-8">
            <div className="relative">
              <textarea
                className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Escribe tu respuesta..."
                value={nuevaRespuesta.contenido}
                onChange={(e) => setNuevaRespuesta({...nuevaRespuesta, contenido: e.target.value})}
                rows="4"
                required
              />
              <button 
                type="submit"
                className="absolute bottom-4 right-4 bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {respuestas.map((respuesta) => (
              <div key={respuesta.idrespuesta} className="bg-gray-50 rounded-lg p-6 transition-all hover:shadow-md">
                {editandoRespuesta?.idrespuesta === respuesta.idrespuesta ? (
                  <div className="space-y-4">
                    <textarea
                      className="w-full p-4 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      value={editandoRespuesta.contenido}
                      onChange={(e) => setEditandoRespuesta({
                        ...editandoRespuesta,
                        contenido: e.target.value
                      })}
                      rows="4"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => actualizarRespuesta(editandoRespuesta)}
                        className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditandoRespuesta(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 mb-4">{respuesta.contenido}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(respuesta.fechahora).toLocaleDateString()}</span>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setEditandoRespuesta(respuesta)}
                          className="flex items-center text-teal-600 hover:text-teal-700"
                        >
                          <Edit2 size={16} className="mr-1" />
                          Editar
                        </button>
                        <button
                          onClick={() => eliminarRespuesta(respuesta.idrespuesta)}
                          className="flex items-center text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} className="mr-1" />
                          Eliminar
                        </button>
                        <button
                          onClick={() => obtenerRespuestaPorId(respuesta.idrespuesta)}
                          className="flex items-center text-blue-600 hover:text-blue-700"
                        >
                          <Eye size={16} className="mr-1" />
                          Ver
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {respuestaSeleccionada && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <h4 className="text-xl font-bold mb-4">Respuesta seleccionada</h4>
              <p className="text-gray-700 mb-4">{respuestaSeleccionada.contenido}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(respuestaSeleccionada.fechahora).toLocaleDateString()}
                </span>
                <button
                  onClick={() => setRespuestaSeleccionada(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {error}
          </div>
        )}

        <button
          className="fixed bottom-8 right-8 bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 transition-colors flex items-center"
          onClick={() => navigate('/Foro')}
        >
          <ArrowLeft size={24} />
        </button>
      </main>
    </div>
  );
};

export default Respuesta;
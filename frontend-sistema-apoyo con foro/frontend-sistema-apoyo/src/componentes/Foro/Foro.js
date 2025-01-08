import './Foro.css';
import React, { useState, useEffect } from 'react';
import logo from '../../logo/LogoInicio.png'
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5228/API'; // Asegúrate de que esta URL sea correcta

const Foro = () => {
  const [foros, setForos] = useState([]);
  const [nombreBusqueda, setNombreBusqueda] = useState('');
  const [nuevoForo, setNuevoForo] = useState({
    nombre: '',
    descripcion: '',
    idconsulta: 0,
    idusuario: 0,
    idnivel: 0,
  });
  const [editandoForo, setEditandoForo] = useState(null);
  const [error, setError] = useState('');
  const [foroPorId, setForoPorId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listarForos();
  }, []);

  const listarForos = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/Foro/Listar Foros`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status) {
        setForos(data.value);
      } else {
        setError('Error al cargar los foros: ' + (data.message || 'No se recibieron datos'));
      }
    } catch (error) {
      console.error('Error al cargar los foros:', error);
      setError('Error al cargar los foros: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const buscarForoPorNombre = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/Foro/Nombre Foro?nombre=${nombreBusqueda}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status) {
        setForos(data.value);
      } else {
        setError('Error al buscar foros: ' + (data.message || 'No se encontraron resultados'));
      }
    } catch (error) {
      console.error('Error al buscar foros:', error);
      setError('Error al buscar foros: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const obtenerForoPorId = async (id) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/Foro/Foro ID?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status) {
        setForoPorId(data.value);
      } else {
        setError('Error al obtener el foro: ' + (data.message || 'No se encontró el foro'));
      }
    } catch (error) {
      console.error('Error al obtener el foro:', error);
      setError('Error al obtener el foro: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const crearForo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/Foro/Crear Foro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoForo),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status) {
        await listarForos();
        setNuevoForo({
          nombre: '',
          descripcion: '',
          idconsulta: 0,
          idusuario: 0,
          idnivel: 0,
        });
      } else {
        setError('Error al crear el foro: ' + (data.message || 'No se pudo crear el foro'));
      }
    } catch (error) {
      console.error('Error al crear el foro:', error);
      setError('Error al crear el foro: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const actualizarForo = async (foro) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/Foro/Editar por ID?id=${foro.idforo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foro),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status) {
        await listarForos();
        setEditandoForo(null);
      } else {
        setError('Error al actualizar el foro: ' + (data.message || 'No se pudo actualizar el foro'));
      }
    } catch (error) {
      console.error('Error al actualizar el foro:', error);
      setError('Error al actualizar el foro: ' + error.message);
    } finally {
      setIsLoading(false);
    }
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
      <h2 className="text-2xl font-bold mb-4">Encontrá tu Foro</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded flex-1"
          placeholder="Buscar por nombre"
          value={nombreBusqueda}
          onChange={(e) => setNombreBusqueda(e.target.value)}
        />
        <button
          onClick={buscarForoPorNombre}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      <form onSubmit={crearForo} className="mb-6 space-y-4 bg-gray-50 p-4 rounded">
        <div>
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Nombre del foro"
            value={nuevoForo.nombre}
            onChange={(e) =>
              setNuevoForo({ ...nuevoForo, nombre: e.target.value })
            }
            required
          />
        </div>
        <div>
          <textarea
            className="border p-2 rounded w-full"
            placeholder="Descripción"
            value={nuevoForo.descripcion}
            onChange={(e) =>
              setNuevoForo({ ...nuevoForo, descripcion: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={isLoading}
        >
          {isLoading ? 'Creando...' : 'Crear Foro'}
        </button>
      </form>

      {isLoading && <div className="text-center">Cargando foros...</div>}

      {!isLoading && foros.length === 0 && !error && (
        <div className="text-center">No hay foros disponibles</div>
      )}

      {!isLoading && foros.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Nombre</th>
                <th className="border p-2 text-left">Descripción</th>
                <th className="border p-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {foros.map((foro) => (
                <tr key={foro.idforo} className="border-b hover:bg-gray-50">
                  <td className="p-2">{foro.nombre}</td>
                  <td className="p-2">{foro.descripcion}</td>
                  <td className="p-2">
                    <button
                      onClick={() => setEditandoForo(foro)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => obtenerForoPorId(foro.idforo)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editandoForo && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Editar Foro</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              actualizarForo(editandoForo);
            }}>
              <input
                type="text"
                className="border p-2 rounded w-full mb-2"
                value={editandoForo.nombre}
                onChange={(e) => setEditandoForo({...editandoForo, nombre: e.target.value})}
              />
              <textarea
                className="border p-2 rounded w-full mb-2"
                value={editandoForo.descripcion}
                onChange={(e) => setEditandoForo({...editandoForo, descripcion: e.target.value})}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditandoForo(null)}
                  className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {foroPorId && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h3 className="text-xl font-semibold">Detalles del Foro</h3>
          <p>
            <strong>Nombre:</strong> {foroPorId.nombre}
          </p>
          <p>
            <strong>Descripción:</strong> {foroPorId.descripcion}
          </p>
        </div>
      )}

      {error && (
        <div className="text-red-500 mt-4 p-2 bg-red-50 rounded">{error}</div>
      )}
    </div>
  );
};

export default Foro;


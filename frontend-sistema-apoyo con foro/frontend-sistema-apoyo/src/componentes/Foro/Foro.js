import './Foro.css';
import React, { useState } from 'react';
import logo from '../../logo/LogoInicio.png'
import { Link } from 'react-router-dom';

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

  // Funciones sin implementación de llamadas a la API
  const listarForos = () => {
    console.log('Listar foros');
  };

  const buscarForoPorNombre = () => {
    console.log(`Buscar foros con el nombre: ${nombreBusqueda}`);
  };

  const obtenerForoPorId = (id) => {
    console.log(`Obtener foro por ID: ${id}`);
  };

  const crearForo = (e) => {
    e.preventDefault();
    console.log('Crear foro', nuevoForo);
    setNuevoForo({
      nombre: '',
      descripcion: '',
      idconsulta: 0,
      idusuario: 0,
      idnivel: 0,
    });
  };

  const actualizarForo = (foro) => {
    console.log('Actualizar foro', foro);
    setEditandoForo(null);
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
      <h2 className="text-2xl font-bold mb-4"> Encontrá tu Foro</h2>

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
        >
          Buscar
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
        >
          Crear Foro
        </button>
      </form>

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
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
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

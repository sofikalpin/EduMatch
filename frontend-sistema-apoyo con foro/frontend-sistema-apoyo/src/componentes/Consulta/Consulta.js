import React, { useState, useEffect } from "react";
import './Consulta.css';
import logo from '../../logo/LogoInicio.png';
import { Link } from 'react-router-dom';


const Consulta = () => {
  const [consultas, setConsultas] = useState([]);
  const [tituloBusqueda, setTituloBusqueda] = useState("");
  const [nuevaConsulta, setNuevaConsulta] = useState({
    titulo: "",
    contenido: "",
    idusuario: 0,
    fechahora: new Date().toISOString(),
  });
  const [editandoConsulta, setEditandoConsulta] = useState(null);
  const [consultaSeleccionada, setConsultaSeleccionada] = useState(null);
  const [error, setError] = useState("");

  const obtenerConsultas = async () => {
    try {
      const response = await fetch("API/Consulta/ConsultarConsultas");
      const data = await response.json();
      if (data.status) {
        setConsultas(data.value);
      } else {
        setError("Error al cargar las consultas");
      }
    } catch {
      setError("Error de conexión al servidor");
    }
  };

  const buscarPorTitulo = async () => {
    if (!tituloBusqueda.trim()) return;
    try {
      const response = await fetch(
        `API/Consulta/ConsultarPorTitulo?titulo=${tituloBusqueda}`
      );
      const data = await response.json();
      if (data.status) {
        setConsultas(data.value);
      } else {
        setError("No se encontraron consultas con ese título");
      }
    } catch {
      setError("Error al buscar consulta");
    }
  };

  const crearConsulta = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("API/Consulta/CrearConsulta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaConsulta),
      });
      const data = await response.json();
      if (data.status) {
        obtenerConsultas();
        setNuevaConsulta({
          titulo: "",
          contenido: "",
          idusuario: 0,
          fechahora: new Date().toISOString(),
        });
      } else {
        setError("Error al crear la consulta");
      }
    } catch {
      setError("Error al crear la consulta");
    }
  };

  const actualizarConsulta = async (consulta) => {
    try {
      const response = await fetch("API/Consulta/ActualizarConsulta", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(consulta),
      });
      const data = await response.json();
      if (data.status) {
        obtenerConsultas();
        setEditandoConsulta(null);
      } else {
        setError("Error al actualizar la consulta");
      }
    } catch {
      setError("Error al actualizar la consulta");
    }
  };

  const obtenerConsultaPorId = async (id) => {
    try {
      const response = await fetch(`API/Consulta/ObtenerConsultaPorId?id=${id}`);
      const data = await response.json();
      if (data.status) {
        setConsultaSeleccionada(data.value);
      } else {
        setError("Error al obtener la consulta");
      }
    } catch {
      setError("Error al obtener la consulta");
    }
  };

  useEffect(() => {
    obtenerConsultas();
  }, []);

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
      <h2 className="text-2xl font-bold mb-4">Consultas</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded flex-1"
          placeholder="Buscar por título"
          value={tituloBusqueda}
          onChange={(e) => setTituloBusqueda(e.target.value)}
        />
        <button
          onClick={buscarPorTitulo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>
      <form
        onSubmit={crearConsulta}
        className="mb-6 space-y-4 bg-gray-50 p-4 rounded"
      >
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Título de la consulta"
          value={nuevaConsulta.titulo}
          onChange={(e) =>
            setNuevaConsulta({ ...nuevaConsulta, titulo: e.target.value })
          }
          required
        />
        <textarea
          className="border p-2 rounded w-full h-32"
          placeholder="Contenido de la consulta"
          value={nuevaConsulta.contenido}
          onChange={(e) =>
            setNuevaConsulta({ ...nuevaConsulta, contenido: e.target.value })
          }
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Crear Consulta
        </button>
      </form>
      {consultaSeleccionada && (
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h3 className="text-xl font-bold">{consultaSeleccionada.titulo}</h3>
          <p className="text-gray-600">{consultaSeleccionada.contenido}</p>
          <p className="text-sm text-gray-500">
            Fecha:{" "}
            {new Date(consultaSeleccionada.fechahora).toLocaleDateString()}
          </p>
        </div>
      )}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Título</th>
            <th className="border p-2">Contenido</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta) => (
            <tr key={consulta.idconsulta} className="border-b hover:bg-gray-50">
              <td className="p-2">{consulta.titulo}</td>
              <td className="p-2">{consulta.contenido}</td>
              <td className="p-2">
                {new Date(consulta.fechahora).toLocaleDateString()}
              </td>
              <td className="p-2">
                <button
                  onClick={() => obtenerConsultaPorId(consulta.idconsulta)}
                  className="bg-orange-500 px-3 py-1 text-sm rounded hover:bg-orange-600"
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && (
        <div className="text-red-500 mt-4 p-2 bg-red-50 rounded">{error}</div>
      )}
    </div>
  );
};

export default Consulta;

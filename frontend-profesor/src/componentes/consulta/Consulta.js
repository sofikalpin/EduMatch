import React, { useState, useEffect } from "react";
import './Consulta.css';
import logo from "../../componentes/logo/LogoInicio.png";
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  const handleForo = () => {
    navigate('/Foro');
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
      <h2 className="tituloconsultas">Consultas</h2>
      <div className="Consultas">
        <input
          type="text"
          className="buscadorConsulta"
          placeholder="Buscar por título"
          value={tituloBusqueda}
          onChange={(e) => setTituloBusqueda(e.target.value)}
        />
        <button
          onClick={buscarPorTitulo}
          className="btn-buscarPorTitulo"
        >
          Buscar
        </button>
      </div>
      <form
        onSubmit={crearConsulta}
        className="crearConsulta"
      >
        <input
          type="text"
          className="TituloDeLaConsulta"
          placeholder="Título de la consulta"
          value={nuevaConsulta.titulo}
          onChange={(e) =>
            setNuevaConsulta({ ...nuevaConsulta, titulo: e.target.value })
          }
          required
        />
        <textarea
          className="contenidoDeLaConsulta"
          placeholder="Contenido de la consulta"
          value={nuevaConsulta.contenido}
          onChange={(e) =>
            setNuevaConsulta({ ...nuevaConsulta, contenido: e.target.value })
          }
          required
        />
        <button
          type="submit"
          className="btn-CrearConsulta"
        >
          Crear Consulta
        </button>
      </form>
      {consultaSeleccionada && (
        <div className="consultaSeleccionada">
          <h3 className="consultaSeleccionadaTitulo">{consultaSeleccionada.titulo}</h3>
          <p className="consultaSeleccionadaContenido">{consultaSeleccionada.contenido}</p>
          <p className="ConsultaFecha">
            Fecha: {new Date(consultaSeleccionada.fechahora).toLocaleDateString()}
          </p>
        </div>
      )}
      <table className="tabla">
        <thead>
          <tr className="tablaConsulta">
            <th className="tablaConsultaTitulo">Título</th>
            <th className="tablaConsultaContenido">Contenido</th>
            <th className="TablaConsultaFecha">Fecha</th>
            <th className="TablaConsultaAcciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta) => (
            <tr key={consulta.idconsulta} className="consultaIDconsulta">
              <td className="ConsultaTitulo">{consulta.titulo}</td>
              <td className="ConsultaContenido">{consulta.contenido}</td>
              <td className="ConsultaFechaHora">
                {new Date(consulta.fechahora).toLocaleDateString()}
              </td>
              <td className="p-2">
                <button
                  onClick={() => obtenerConsultaPorId(consulta.idconsulta)}
                  className="obtenerConsultaPorId"
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && (
        <div className="error">{error}</div>
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

export default Consulta;
import React, { useState, useEffect } from "react";
import logo from "../../componentes/logo/LogoInicio.png";
import { Link, useNavigate } from "react-router-dom";

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
    navigate("/Foro");
  };

  return (
    <div className="p-4 bg-[#bfeede] min-h-screen">
      {/* Header */}
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

      <div className="mt-20">
        <h2 className="text-2xl font-bold my-4">Consultas</h2>

        {/* Buscador */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Buscar por título"
            value={tituloBusqueda}
            onChange={(e) => setTituloBusqueda(e.target.value)}
            className="w-full md:w-auto p-2 border border-gray-300 rounded"
          />
          <button
            onClick={buscarPorTitulo}
            className="bg-yellow-400 text-white px-4 py-2 rounded cursor-pointer font-medium my-1"
          >
            Buscar
          </button>
        </div>

        {/* Formulario para crear consulta */}
        <form onSubmit={crearConsulta} className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Título de la consulta"
            value={nuevaConsulta.titulo}
            onChange={(e) =>
              setNuevaConsulta({ ...nuevaConsulta, titulo: e.target.value })
            }
            required
            className="p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Contenido de la consulta"
            value={nuevaConsulta.contenido}
            onChange={(e) =>
              setNuevaConsulta({ ...nuevaConsulta, contenido: e.target.value })
            }
            required
            className="p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className= "bg-green-800 text-white px-4 py-2 rounded cursor-pointer font-medium w-[100px]">
            Crear Consulta
          </button>
        </form>

        {/* Consulta seleccionada */}
        {consultaSeleccionada && (
          <div className="p-4 rounded-lg bg-white mb-4 shadow">
            <h3 className="text-xl font-bold">
              {consultaSeleccionada.titulo}
            </h3>
            <p className="text-base text-gray-700">
              {consultaSeleccionada.contenido}
            </p>
            <p className="text-sm text-gray-500">
              Fecha:{" "}
              {new Date(consultaSeleccionada.fechahora).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Tabla de consultas */}
        <table className="w-full border-collapse mt-5">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Título</th>
              <th className="border border-gray-300 px-4 py-2">Contenido</th>
              <th className="border border-gray-300 px-4 py-2">Fecha</th>
              <th className="border border-gray-300 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map((consulta) => (
              <tr key={consulta.idconsulta} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {consulta.titulo}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {consulta.contenido}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(consulta.fechahora).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => obtenerConsultaPorId(consulta.idconsulta)}
                    className="bg-[#ffa726] text-white px-4 py-2 rounded cursor-pointer font-medium"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mensaje de error */}
        {error && (
          <div className="text-red-500 mt-4 p-2 bg-red-100 rounded shadow">
            {error}
          </div>
        )}
      </div>

      {/* Botón para volver */}
      <button
        className="fixed bottom-8 right-8 bg-teal-claro text-white px-6 py-3 rounded-full cursor-pointer font-medium shadow-lg z-[1000] hover:bg-[#45a049] hover:scale-105 transition transform duration-300"
        onClick={handleForo}
      >
        volver
      </button>
    </div>
  );
};

export default Consulta;

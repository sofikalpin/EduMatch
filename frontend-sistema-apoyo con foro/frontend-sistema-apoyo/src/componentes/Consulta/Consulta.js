import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig"; // Importa la configuración de axios
import "./Consulta.css";

const Consulta = () => {
  const [consultas, setConsultas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [selectedConsulta, setSelectedConsulta] = useState(null);

  // Listar consultas
  useEffect(() => {
    axiosInstance
      .get("/Consulta/ListaConsultas") // Asegúrate de que esta ruta exista en tu backend
      .then((response) => setConsultas(response.data.value))
      .catch((error) => console.error("Error al cargar las consultas", error));
  }, []);

  // Crear consulta
  const crearConsulta = async () => {
    try {
      await axiosInstance.post("/Consulta/CrearConsulta", {
        titulo,
        descripcion,
      });
      setTitulo("");
      setDescripcion("");
      alert("Consulta creada con éxito");
    } catch (error) {
      console.error("Error al crear consulta", error);
    }
  };

  // Obtener consulta por ID
  const obtenerConsulta = (id) => {
    axiosInstance
      .get(`/Consulta/ConsultaID?id=${id}`)
      .then((response) => setSelectedConsulta(response.data.value))
      .catch((error) => console.error("Error al obtener consulta", error));
  };

  return (
    <div>
      <h2>Consultas</h2>

      {/* Formulario para crear consulta */}
      <div>
        <input
          type="text"
          placeholder="Título de la consulta"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Descripción de la consulta"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button onClick={crearConsulta}>Crear Consulta</button>
      </div>

      {/* Lista de consultas */}
      <h3>Lista de Consultas</h3>
      <ul>
        {consultas.map((consulta) => (
          <li key={consulta.idconsulta}>
            {consulta.titulo} -{" "}
            <button onClick={() => obtenerConsulta(consulta.idconsulta)}>
              Ver
            </button>
          </li>
        ))}
      </ul>

      {/* Mostrar consulta seleccionada */}
      {selectedConsulta && (
        <div>
          <h3>Detalles de la Consulta</h3>
          <p>Título: {selectedConsulta.titulo}</p>
          <p>Descripción: {selectedConsulta.descripcion}</p>
        </div>
      )}
    </div>
  );
};

export default Consulta;

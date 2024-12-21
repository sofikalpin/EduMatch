
import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig"; // Importar la configuración de axios
import "./Foro.css";

const Foro = () => {
  const [foros, setForos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [selectedForo, setSelectedForo] = useState(null);

  // Listar foros
  useEffect(() => {
    axiosInstance
      .get("/Foro/ListaForos") // Aquí utilizamos la URL relativa
      .then((response) => setForos(response.data.value))
      .catch((error) => console.error("Error al cargar los foros", error));
  }, []);

  // Crear foro
  const crearForo = async () => {
    try {
      await axiosInstance.post("/Foro/CrearForo", {
        nombre,
        descripcion,
      });
      setNombre("");
      setDescripcion("");
      alert("Foro creado con éxito");
    } catch (error) {
      console.error("Error al crear foro", error);
    }
  };

  // Obtener foro por ID
  const obtenerForo = (id) => {
    axiosInstance
      .get(`/Foro/ForoID?id=${id}`)
      .then((response) => setSelectedForo(response.data.value))
      .catch((error) => console.error("Error al obtener foro", error));
  };

  return (
    <div>
      <h2>Foros</h2>
      {/* Formulario para crear foro */}
      <div>
        <input
          type="text"
          placeholder="Nombre del foro"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <textarea
          placeholder="Descripción del foro"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button onClick={crearForo}>Crear Foro</button>
      </div>

      {/* Lista de foros */}
      <h3>Lista de Foros</h3>
      <ul>
        {foros.map((foro) => (
          <li key={foro.idforo}>
            {foro.nombre} -{" "}
            <button onClick={() => obtenerForo(foro.idforo)}>Ver</button>
          </li>
        ))}
      </ul>

      {/* Mostrar foro seleccionado */}
      {selectedForo && (
        <div>
          <h3>Detalles del Foro</h3>
          <p>Nombre: {selectedForo.nombre}</p>
          <p>Descripción: {selectedForo.descripcion}</p>
        </div>
      )}
    </div>
  );
};

export default Foro;

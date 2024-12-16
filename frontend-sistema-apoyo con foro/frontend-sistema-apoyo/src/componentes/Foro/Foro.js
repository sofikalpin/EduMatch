import React, { useEffect, useState } from "react";
import "./Foro.css";

function Foro() {
  const [foros, setForos] = useState([]);

  useEffect(() => {
    // Cambia esta URL por la URL de tu backend
    fetch("http://localhost:5228/API/Consulta/Listar%20Consultas")
      .then((response) => response.json())
      .then((data) => setForos(data.value || []))
      .catch((error) => console.error("Error al cargar foros:", error));
  }, []);

  return (
    <div className="foro-container">
      <h1>Foro de Consultas</h1>
      <ul>
        {foros.map((foro) => (
          <li key={foro.idconsulta}>
            <h3>{foro.titulo}</h3>
            <p>{foro.contenido}</p>
            <small>{foro.fechahora}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Foro;

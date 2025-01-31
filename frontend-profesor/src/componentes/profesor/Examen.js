import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Examen.css";
import logo from "../../componentes/logo/LogoInicio.png";

const Examen = () => {
  const [examenes, setExamenes] = useState([]);

  useEffect(() => {
    const fetchExamenes = async () => {
      try {
        const response = await fetch("/api/examenes"); // Ajusta la ruta de tu API
        const data = await response.json();
        setExamenes(data);
      } catch (error) {
        console.error("Error al cargar exámenes:", error);
      }
    };

    fetchExamenes();
  }, []);

  const accederExamen = (id) => {
    console.log("Accediendo al examen con ID:", id);
    window.location.href = `/examen/${id}`;
  };

  return (
    <div className="inicio-container">
      <header className="header">
        <img src={logo} alt="Logo del curso" className="logo-img" />
        <nav className="left-nav">
          <ul>
            <li>
              <Link to="/profesor/inicio">Inicio</Link>
            </li>
            <li>
              <Link to="/profesor/cursos">Mis Cursos</Link>
            </li>
            <li>
              <Link to="/profesor/alumnos">Mis Alumnos</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="examen-container">
        <h1 className="titulo-examenes">Exámenes</h1>

        <div className="examen-lista">
          {examenes.length > 0 ? (
            examenes.map((examen) => (
              <div key={examen.id} className="examen-tarjeta">
                <h2>{examen.titulo}</h2>
                <p>{examen.descripcion}</p>
                <button onClick={() => accederExamen(examen.id)}>Acceder</button>
              </div>
            ))
          ) : (
            <p>No hay exámenes disponibles</p>
          )}
        </div>

        <Link to="/crear-examen">
          <button className="crear-examen-btn">Crear nuevo examen</button>
        </Link>
      </div>
    </div>
  );
};

export default Examen;


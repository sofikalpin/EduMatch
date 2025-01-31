import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Actividad.css";
import logo from "../../componentes/logo/LogoInicio.png";

const Actividad = () => {
  const [actividades, setActividades] = useState([]);

  // Cargar actividades desde una API al montar el componente
  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await fetch("/api/actividades"); // Ajusta la ruta de tu API
        const data = await response.json();
        setActividades(data);
      } catch (error) {
        console.error("Error al cargar actividades:", error);
      }
    };

    fetchActividades();
  }, []);

  // Función para manejar el botón "Acceder"
  const accederActividad = (id) => {
    console.log("Accediendo a la actividad con ID:", id);
    window.location.href = `/actividad/${id}`; // Redirigir a una página específica de la actividad
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

      <div className="actividad-container">
        <h1 className="titulo-actividades">Actividades</h1>

        <div className="actividad-lista">
          {actividades.length > 0 ? (
            actividades.map((actividad) => (
              <div key={actividad.id} className="actividad-tarjeta">
                <h2>{actividad.nombre}</h2>
                <p>{actividad.descripcion}</p>
                <button onClick={() => accederActividad(actividad.id)}>
                  Acceder
                </button>
              </div>
            ))
          ) : (
            <p>No hay actividades disponibles</p>
          )}
        </div>

        <Link to="/crear-actividad">
          <button className="crear-actividad-btn">Crear nueva actividad</button>
        </Link>
      </div>
    </div>
  );
};

export default Actividad;




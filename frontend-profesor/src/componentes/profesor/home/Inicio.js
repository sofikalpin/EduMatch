import React, { useState } from "react";
import "./Inicio.css";
import logo from "../../logo/LogoInicio.png";
import { Link, useNavigate } from "react-router-dom";

const InicioProfesor = () => {
  // Lista de cursos disponibles con identificadores
  const cursos = [
    { id: 1, nombre: "A1: Curso Principiante" },
    { id: 2, nombre: "A2: Curso Básico" },
    { id: 3, nombre: "B1: Curso Pre-Intermedio" },
    { id: 4, nombre: "B2: Curso Intermedio" },
    { id: 5, nombre: "C1: Curso Intermedio-Alto" },
    { id: 6, nombre: "C2: Curso Avanzado" },
  ];

  // Estado para el texto del buscador y las sugerencias
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);

  const navigate = useNavigate(); // Hook para manejar la navegación

  // Manejar el cambio en el input del buscador
  const manejarCambio = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);

    // Mostrar sugerencias solo si hay texto ingresado
    if (texto.trim() !== "") {
      const resultados = cursos.filter((curso) =>
        curso.nombre.toLowerCase().includes(texto.toLowerCase())
      );
      setSugerencias(resultados);
    } else {
      setSugerencias([]);
    }
  };

  // Manejar la selección de una sugerencia
  const seleccionarSugerencia = (curso) => {
    setBusqueda(curso.nombre); // Establecer el curso seleccionado en el input
    setSugerencias([]); // Limpiar las sugerencias
    navigate(`/profesor/cursos/${curso.id}`);; // Redirigir al detalle del curso
  };

  return (
    <div className="inicio-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo-img" />
        <div className="left-nav">
          <nav>
            <ul>
              <li>
                <Link to="/profesor/cursos">Mis Cursos</Link>
              </li>
              <li>
                <Link to="/profesor/alumnos">Mis Alumnos</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="right-nav">
          <button className="login-button">Iniciar Sesión</button>
        </div>
      </header>
      <section className="intro">
        <p>Estos son nuestros cursos de inglés listos para que empieces a enseñar!</p>
      </section>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={manejarCambio}
        />
        <button>Buscar</button>
        {/* Mostrar sugerencias */}
        {sugerencias.length > 0 && (
          <ul className="sugerencias-lista">
            {sugerencias.map((curso) => (
              <li key={curso.id} onClick={() => seleccionarSugerencia(curso)}>
                {curso.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InicioProfesor;

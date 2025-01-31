import React from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../logo/LogoInicio.png";
import actividad from "../../imagenes/actividad.jpg";
import foro from "../../imagenes/foro.jpg";
import examen from "../../imagenes/examen.avif";
import articulos from "../../imagenes/articulo.jpg";
import "./DetalleCurso.css";

const cursos = [
  { id: 1, nombre: "A1: Curso Principiante", descripcion: "Introducción al Inglés, conociendo vocabulario básico y frases simples para situaciones cotidianas" },
  { id: 2, nombre: "A2: Curso Básico", descripcion: "Expande tu vocabulario y mejora tu capacidad para comunicarte en situaciones cotidianas." },
  { id: 3, nombre: "B1: Curso Pre-Intermedio", descripcion: "Mejora tu comprensión y expresión, aprendiendo a comunicarte con más claridad en Inglés" },
  { id: 4, nombre: "B2: Curso Intermedio", descripcion: "Desarrolla fluidez para interactuar de manera más natural y comprender textos más complejos" },
  { id: 5, nombre: "C1: Curso Intermedio-Alto", descripcion: "Perfecciona tu Inglés para comunicarte con confianza en situaciones profesionales y sociales" },
  { id: 6, nombre: "C2: Curso Avanzado", descripcion: "Domina el Inglés, con capacidad para comprender y expresar ideas complejas con fluidez" },
];

const tarjetas = [
  { id: 1, nombre: "Actividad", descripcion: "Ver actividades relacionadas", imagen: actividad, link: "actividad" },
  { id: 2, nombre: "Artículos", descripcion: "Explorar artículos", imagen: articulos, link: "articulos" },
  { id: 3, nombre: "Exámenes", descripcion: "Acceder al examen", imagen: examen, link: "examen" },
  { id: 4, nombre: "Foro", descripcion: "Participar en el foro de consulta", imagen: foro, link: "foro" },
];

const CursoDetalle = () => {
  const { id } = useParams();
  const curso = cursos.find((c) => c.id === parseInt(id));

  if (!curso) {
    return <p>Curso no encontrado</p>;
  }

  return (
    <div className="inicio-container">
      <header className="header">
        <img src={logo} alt="Logo del curso" className="logo-img" />
        <nav className="left-nav">
          <ul>
            <li><Link to="/profesor/inicio">Inicio</Link></li>
            <li><Link to="/profesor/cursos">Mis Cursos</Link></li>
            <li><Link to="/profesor/alumnos">Mis Alumnos</Link></li>
          </ul>
        </nav>
      </header>

      <div className="curso-detalles-container">
        <h1>{curso.nombre}</h1>
        <p>{curso.descripcion}</p>

        <div className="tarjetas-detalles">
          {tarjetas.map((tarjeta) => (
            <Link 
              to={`/profesor/cursos/${id}/${tarjeta.link}`} 
              key={tarjeta.id} 
              className="tarjeta-detalle"
            >
              <img src={tarjeta.imagen} alt={`Imagen para ${tarjeta.nombre}`} className="tarjeta-imagen" />
              <div className="tarjeta-texto">
                <h3>{tarjeta.nombre}</h3>
                <p>{tarjeta.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>

        <Link to="/profesor/cursos" className="volver-link">Volver a Mis Cursos</Link>

      </div>
    </div>
  );
};

export default CursoDetalle;

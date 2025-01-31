import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Articulo.css";
import logo from "../../componentes/logo/LogoInicio.png";

const Articulo = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await fetch("/api/articulos"); // Ajusta la ruta de tu API
        const data = await response.json();
        setArticulos(data);
      } catch (error) {
        console.error("Error al cargar artículos:", error);
      }
    };

    fetchArticulos();
  }, []);

  const accederArticulo = (id) => {
    console.log("Accediendo al artículo con ID:", id);
    window.location.href = `/articulo/${id}`;
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

      <div className="articulo-container">
        <h1 className="titulo-articulos">Artículos</h1>

        <div className="articulo-lista">
          {articulos.length > 0 ? (
            articulos.map((articulo) => (
              <div key={articulo.id} className="articulo-tarjeta">
                <h2>{articulo.titulo}</h2>
                <p>{articulo.descripcion}</p>
                <button onClick={() => accederArticulo(articulo.id)}>
                  Acceder
                </button>
              </div>
            ))
          ) : (
            <p>No hay artículos disponibles</p>
          )}
        </div>

        <Link to="/crear-articulo">
          <button className="crear-articulo-btn">Crear nuevo artículo</button>
        </Link>
      </div>
    </div>
  );
};

export default Articulo;

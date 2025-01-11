import React from "react";
import "./miscursos.css";

const MisCursos = () => {
  const cursos = [
    { id: 1, nombre: "Curso Básico", alumnos: 20, imagen: "https://via.placeholder.com/150" },
    { id: 2, nombre: "Curso Intermedio", alumnos: 15, imagen: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="mis-cursos">
      <h1>Mis Cursos</h1>
      <div className="cursos-grid">
        {cursos.map((curso) => (
          <div key={curso.id} className="curso-card">
            <img src={curso.imagen} alt={curso.nombre} className="curso-imagen" />
            <h2>{curso.nombre}</h2>
            <p>{curso.alumnos} alumnos inscritos</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisCursos;

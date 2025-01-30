import React from "react";
import "./profesorCV.css";

const Tooltip = () => {
  return (
    <div className="tooltip-container">
      <h2>Mostrar CV del Profesor</h2>
      <p>Haz clic para ver el CV completo del profesor.</p>
      <button className="close-tooltip">Cerrar</button>
    </div>
  );
};

export default Tooltip;


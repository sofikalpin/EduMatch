import React  from "react";
import './misalumnos.css';

const MisAlumnos = () => {
    const alumnos = [
        { id: 1, nombre: 'Sofia Raggio', curso: 'B1 Pre-Intermedio' },
        { id: 2, nombre: 'Juan Pérez', curso: 'B1 Pre-Intermedio' },
    ];

    return (
        <div className="alumnos-container">
            <h1>Alumnos</h1>
            <ul>
                {alumnos.map((alumno) => (
                    <li key={alumno.id}>
                        {alumno.nombre} - {alumno.curso}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default MisAlumnos;
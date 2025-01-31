import React, { useState } from "react";
import "./tablaAlumnos.css";
import FilaAlumnos from "../filaAlumnos/filaAlumnos.js";
import { useNavigate } from "react-router-dom";

const TablaAlumnos = ({ data, onDelete }) => {
    const navigate = useNavigate();
    const [nivelSeleccionado, setNivelSeleccionado] = useState("");

    const hadleNavigate = () => {
        try {
            navigate("nuevoAlumno");
        } catch (error) {
            console.error("Error al navegar: ", error);
        }
    };

    const handleNivelSeleccionado = (e) => {
        setNivelSeleccionado(e.target.value);
    };

    const alumnosNivel = data.filter(
        (alumno) =>
            nivelSeleccionado === "" || alumno.idnivel.toString() === nivelSeleccionado
    );

    const isDataValid = alumnosNivel.length > 0;

    return (
        <div className="tablaAlumno-contenedor">
            <div className="filtro-nivel">
                <label htmlFor="nivel-select">Filtrar por nivel:</label>
                <select
                    id="nivel-select"
                    value={nivelSeleccionado}
                    onChange={handleNivelSeleccionado}
                    className="select-nivel"
                >
                    <option value="">Todos los niveles</option>
                    <option value="1">A1: Principiante</option>
                    <option value="2">A2: Básico</option>
                    <option value="3">B1: Pre-intermedio</option>
                    <option value="4">B2: Intermedio</option>
                    <option value="5">C1: Intermedio-alto</option>
                    <option value="6">C2: Avanzado</option>
                </select>
            </div>

            <div className="añadirAlumno">
                <button className="boton-añadir" onClick={hadleNavigate}>
                    Añadir nuevo alumno
                </button>
            </div>

            {/* Contenedor con scroll */}
            <div className="tablaA-scroll">
                <table className="tablaAlumno-tabla">
                    <thead>
                        <tr>
                            <th>Nombre y apellido</th>
                            <th>Correo electrónico</th>
                            <th>🔽 Nivel</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody className="tabla-datos">
                        {isDataValid ? (
                            alumnosNivel.map((alumno) => (
                                <FilaAlumnos
                                    key={alumno.idusuario}
                                    alumno={alumno}
                                    onDelete={onDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="sin-datos">
                                    No hay datos disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaAlumnos;

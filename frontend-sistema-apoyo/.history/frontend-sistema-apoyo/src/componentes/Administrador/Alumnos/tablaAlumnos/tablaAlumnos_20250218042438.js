import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilaAlumnos from "../filaAlumnos/filaAlumnos.js";

const TablaAlumnos = ({ data, onDelete }) => {
    const navigate = useNavigate();
    const [nivelSeleccionado, setNivelSeleccionado] = useState("");

    const handleNavigate = () => {
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
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="mb-4">
                <label htmlFor="nivel-select" className="block text-sm font-medium text-gray-700">
                    Filtrar por nivel:
                </label>
                <select
                    id="nivel-select"
                    value={nivelSeleccionado}
                    onChange={handleNivelSeleccionado}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            <div className="mb-4 flex justify-end">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={handleNavigate}
                >
                    Añadir nuevo alumno
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-3 px-4 border-b">Nombre y apellido</th>
                            <th className="py-3 px-4 border-b">Correo electrónico</th>
                            <th className="py-3 px-4 border-b">Nivel</th>
                            <th className="py-3 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
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
                                <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
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
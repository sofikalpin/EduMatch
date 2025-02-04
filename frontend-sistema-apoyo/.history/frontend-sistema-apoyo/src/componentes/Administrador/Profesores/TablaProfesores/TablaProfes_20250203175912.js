import React, { useState } from "react";
import FilaProfesores from "../filaProfesores/filaProfesores.js";
import { useNavigate } from "react-router-dom";

const TablaProfes = ({ data, onDelete }) => {
    const navigate = useNavigate();
    const [nivelSeleccionado, setNivelSeleccionado] = useState("");

    const hadleNavigate = () => {
        try {
            navigate("nuevoProfesor");
        } catch (error) {
            console.error("Error al navegar: ", error);
        }
    };

    const handleNivelSeleccionado = (e) => {
        setNivelSeleccionado(e.target.value);
    };

    const profesorNivel = data.filter((profesor) =>
        nivelSeleccionado === "" || profesor.idnivel.toString() === nivelSeleccionado
    );

    const isDataValid = profesorNivel.length > 0;

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-4">
                <label htmlFor="nivel-select" className="block text-gray-700 font-semibold mb-2">
                    Filtrar por nivel:
                </label>
                <select
                    id="nivel-select"
                    value={nivelSeleccionado}
                    onChange={handleNivelSeleccionado}
                    className="w-full p-2 border border-gray-300 rounded-md"
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

            <div className="mb-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={hadleNavigate}
                >
                    Añadir nuevo profesor
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-700">Nombre y apellido</th>
                            <th className="px-4 py-2 text-left text-gray-700">Correo electrónico</th>
                            <th className="px-4 py-2 text-left text-gray-700">🔽 Nivel</th>
                            <th className="px-4 py-2 text-left text-gray-700">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isDataValid ? (
                            profesorNivel.map((profesor) => (
                                <FilaProfesores
                                    key={profesor.idusuario}
                                    profesor={profesor}
                                    onDelete={onDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
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

export default TablaProfes;

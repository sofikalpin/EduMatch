import React, { useState } from "react";
import FilaProfesor from "../FilaProfesor/FilaProfesorExterno.js";

const TablaProfesAExterno = ({ data, onDelete, onAutorizar }) => {
    const [nivelSeleccionado, setNivelSeleccionado] = useState("");

    const handleNivelSeleccionado = (e) => {
        setNivelSeleccionado(e.target.value);
    };

    const uniqueData = data.reduce((acc, current) => {
        const x = acc.find(item => item.idbolsa === current.idbolsa);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    const profesorNivel = nivelSeleccionado === "" 
        ? uniqueData 
        : uniqueData.filter((profesor) => {
            const nivelProfesor = profesor.nivel || "";
            return nivelProfesor.toLowerCase() === nivelSeleccionado.toLowerCase();
        });

    const isDataValid = profesorNivel.length > 0;

    return (
        <div className="p-4 bg-white shadow-lg rounded-xl">
            <div className="mb-4">
                <label htmlFor="nivel-select" className="block text-gray-700 font-semibold mb-2">
                    Filtrar por nivel:
                </label>
                <select
                    id="nivel-select"
                    value={nivelSeleccionado}
                    onChange={handleNivelSeleccionado}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Todos los niveles</option>
                    <option value="a1">A1: Principiante</option>
                    <option value="a2">A2: Básico</option>
                    <option value="b1">B1: Pre-intermedio</option>
                    <option value="b2">B2: Intermedio</option>
                    <option value="c1">C1: Intermedio-alto</option>
                    <option value="c2">C2: Avanzado</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                            <th className="py-3 px-4 border-b">Nombre y apellido</th>
                            <th className="py-3 px-4 border-b">Correo electrónico</th>
                            <th className="py-3 px-4 border-b">Especialidad</th>
                            <th className="py-3 px-4 border-b">Nivel</th>
                            <th className="py-3 px-4 border-b">Ver CV</th>
                            <th className="py-3 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isDataValid ? (
                            profesorNivel.map((profesor) => (
                                <FilaProfesor
                                    key={`${profesor.idusuario}-${profesor.correo}`}
                                    profesor={profesor}
                                    onDelete={onDelete}
                                    onAutorizar={onAutorizar}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-4 text-center text-gray-500">
                                    No hay datos disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 text-sm text-gray-500">
                Total de profesores: {uniqueData.length}
                <br />
                Profesores filtrados: {profesorNivel.length}
            </div>
        </div>
    );
};

export default TablaProfesAExterno;
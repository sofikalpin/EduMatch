import React from "react";

const TablaProfesoresExterno = ({ data = [], onDelete }) => {
    if (!Array.isArray(data)) {
        return <div className="text-center text-gray-500">No hay datos disponibles.</div>;
    }

    return (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-green-500 text-white">
                <tr>
                    <th className="py-2 px-4">Nombre</th>
                    <th className="py-2 px-4">Correo</th>
                    <th className="py-2 px-4">Profesión</th>
                    <th className="py-2 px-4">Especialidad</th>
                    <th className="py-2 px-4">Nivel</th>
                    <th className="py-2 px-4">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((profesor) => (
                        <tr key={profesor.idbolsa} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4">{profesor.nombreCompleto}</td>
                            <td className="py-2 px-4">{profesor.correo}</td>
                            <td className="py-2 px-4">{profesor.profesion}</td>
                            <td className="py-2 px-4">{profesor.especildad}</td>
                            <td className="py-2 px-4">{profesor.nivel}</td>
                            <td className="py-2 px-4 flex gap-2">
                                <button 
                                    onClick={() => onDelete(profesor.idbolsa)} 
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                >
                                    Rechazar
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center py-4">No hay profesores por autorizar.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TablaProfesoresExterno;

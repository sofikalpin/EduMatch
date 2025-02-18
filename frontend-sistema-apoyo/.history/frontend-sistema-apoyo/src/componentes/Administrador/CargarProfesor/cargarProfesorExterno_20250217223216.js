import React from "react";

const TablaProfesoresExterno = ({ data = [], onDelete }) => {
    console.log("Datos recibidos en la tabla:", data);

    return (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-green-500 text-white">
                <tr>
                    <th className="py-2 px-4">Nombre</th>
                    <th className="py-2 px-4">Correo</th>
                    <th className="py-2 px-4">Profesión</th>
                    <th className="py-2 px-4">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((profesor) => (
                        <tr key={profesor.idbolsa} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4">{profesor.nombreCompleto}</td>
                            <td className="py-2 px-4">{profesor.correo}</td>
                            <td className="py-2 px-4">{profesor.profesion}</td>
                            <td className="py-2 px-4 flex gap-2">
                                <button 
                                    onClick={() => {
                                        console.log("Botón eliminar presionado para ID:", profesor.idbolsa);
                                        onDelete(profesor.idbolsa);
                                    }} 
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                >
                                    Rechazar
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center py-4">No hay profesores por autorizar.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TablaProfesoresExterno;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FilaProfesor = ({ profesor, onDelete, onAutorizar }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const navigate = useNavigate();

    const controlarEliminar = () => {
        if (window.confirm(`¿Desea eliminar al profesor ${profesor.nombrecompleto}?`)) {
            onDelete(profesor.idusuario);
        }
    };

    const iniciales = (name) => {
        if (!name) return "";
        return name
            .split(" ")
            .map(word => word[0])
            .join("").toUpperCase();
    };

    const nivelInicial = (nivelId) => {
        const niveles = {
            "1": "A1", "2": "A2", "3": "B1", "4": "B2", "5": "C1", "6": "C2",
        };
        return niveles[nivelId] || " ";
    };

    const handleAutorizarProfesor = () => {
        if (window.confirm(`¿Estás seguro de que deseas autorizar al profesor ${profesor.nombrecompleto}?`)) {
            onAutorizar(profesor.idusuario);
        }
    };

    return (
        <tr className="border-b hover:bg-gray-100">
            <td className="px-4 py-3 flex items-center gap-2">
                <span className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                    {iniciales(profesor.nombrecompleto)}
                </span>
                <span>{profesor.nombrecompleto}</span>
            </td>
            <td className="px-4 py-3">{profesor.correo}</td>
            <td className="px-4 py-3 text-center">{nivelInicial(profesor.idnivel)}</td>
            <td className="px-4 py-3 flex items-center gap-2">
                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md" onClick={handleAutorizarProfesor}>
                    Autorizar
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md" onClick={controlarEliminar}>
                    Eliminar
                </button>
                <div className="relative">
                    <button 
                        className="text-gray-600 text-xl px-2" 
                        onClick={() => setShowTooltip(!showTooltip)}
                    >
                        ⋮
                    </button>
                    {showTooltip && (
                        <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-md">
                            <button
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
                                onClick={() => navigate("/profesorCV")}
                            >
                                Ver CV
                            </button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default FilaProfesor;

import React from "react";
import { useNavigate } from "react-router-dom";

const FilaProfesorExterno = ({ profesor, onDelete, onAutorizar }) => {
    const navigate = useNavigate();
    
    const controlarRechazar = () => {
        if (window.confirm(`¿Estás seguro que deseas rechazar al profesor ${profesor.nombreCompleto}?`)) {
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
        if (window.confirm(`¿Estás seguro de que deseas autorizar al profesor ${profesor.nombreCompleto}?`)) {
            onAutorizar(profesor.idusuario);
        }
    };
    
    const handleVerCV = () => {
        navigate("/administrador/cargarProfesorExterno/profesorCVExterno", { 
            state: { 
                profesor: {
                    id: profesor.idusuario,
                    nombreCompleto: profesor.nombreCompleto,
                    correo: profesor.correo,
                    especialidad: profesor.especialidad,
                    nivel: nivelInicial(profesor.idnivel),
                    cvUrl: profesor.cvUrl
                } 
            }
        });
    };
    
    return (
        <tr className="border-b hover:bg-gray-100">
            {/* Nombre y Apellido */}
            <td className="px-4 py-3 flex items-center gap-2">
                <span className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                    {iniciales(profesor.nombreCompleto)}
                </span>
                <span>{profesor.nombreCompleto}</span>
            </td>
            
            {/* Correo electrónico */}
            <td className="px-4 py-3">{profesor.correo}</td>
            
            {/* Especialidad */}
            <td className="px-4 py-3">{profesor.especialidad}</td>
            
            {/* Nivel */}
            <td className="px-4 py-3 text-center">{nivelInicial(profesor.idnivel)}</td>
            
            {/* Ver CV */}
            <td className="px-4 py-3 text-center">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                    onClick={handleVerCV}
                >
                    Ver CV
                </button>
            </td>
            
            {/* Acciones: Autorizar y Rechazar */}
            <td className="px-4 py-3 flex items-center gap-2">
                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md" onClick={handleAutorizarProfesor}>
                    Autorizar
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md" onClick={controlarRechazar}>
                    Rechazar
                </button>
            </td>
        </tr>
    );
};

export default FilaProfesorExterno;
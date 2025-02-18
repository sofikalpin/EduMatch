import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FilaProfesor = ({ profesor, onDelete, onAutorizar }) => {
    const navigate = useNavigate();

    const obtenerCV = async (idUsuario) => {
        try {
            const response = await axios.get(`http://localhost:5228/API/Usuario/ObtenerCV?idUsuario=${idUsuario}`, {
                responseType: 'arraybuffer', 
            });
    
            if (response.data && response.data.byteLength > 0) {
                const file = new Blob([response.data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
    
                const link = document.createElement('a');
                link.href = fileURL;
                link.download = `cv_${idUsuario}.pdf`; 
                link.click();
            } else {
                alert("El archivo no está disponible.");
            }
        } catch (error) {
            console.error("Error al obtener el CV", error);
            alert("No se pudo obtener el CV.");
        }
    };

    const controlarRechazar = () => {
        if (window.confirm(`¿Estas seguro que deseas rechazar al profesor ${profesor.nombrecompleto}?`)) {
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

    const handleVerCV = () => {
       
        const cvUrl = `http://localhost:5228/API/Usuario/ObtenerCV?idUsuario=${profesor.idusuario}`;
      
        window.open(cvUrl, '_blank');
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
            
      
            <td className="px-4 py-3 text-center">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                    onClick={() => obtenerCV(profesor.idusuario)}
                >
                    Ver CV
                </button>
            </td>

           
            <td className="px-4 py-3 flex items-center gap-2">
                <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md" 
                    onClick={handleAutorizarProfesor}
                >
                    Autorizar
                </button>
                <button 
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md" 
                    onClick={controlarRechazar}
                >
                    Rechazar
                </button>
            </td>
        </tr>
    );
};

export default FilaProfesor;
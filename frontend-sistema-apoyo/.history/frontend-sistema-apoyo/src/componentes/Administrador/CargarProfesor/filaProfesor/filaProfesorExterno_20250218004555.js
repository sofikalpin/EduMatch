import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FilaProfesorExterno = ({ profesor, onDelete, onAutorizar }) => {
    const navigate = useNavigate();
    
    const controlarRechazar = () => {
        if (window.confirm(`¿Estás seguro que deseas rechazar al profesor ${profesor.nombreCompleto}?`)) {
            onDelete(profesor.idbolsa);
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

    const handleAutorizarProfesor = async () => {
        if (window.confirm(`¿Estás seguro de que deseas enviar para autorización al profesor ${profesor.nombreCompleto}?`)) {
            try {
                // Primero, crear el objeto con los datos del profesor para la tabla de autorización
                const profesorData = {
                    nombrecompleto: profesor.nombreCompleto,
                    correo: profesor.correo,
                    idnivel: profesor.idnivel,
                    cvUrl: profesor.cvUrl,
                    especialidad: profesor.especialidad
                };

                // Enviar los datos al endpoint para crear el profesor pendiente de autorización
                await axios.post('http://localhost:5228/API/AdministradorProfesor/CrearProfesor', profesorData);

                // Si la creación fue exitosa, eliminar de la bolsa de trabajo
                await axios.delete(`http://localhost:5228/api/Bolsatrabajo/EliminarBolsa?id=${profesor.idbolsa}`);

                // Llamar a la función onAutorizar para actualizar el estado local
                onAutorizar(profesor.idusuario);

                // Mostrar mensaje de éxito
                alert("Profesor enviado exitosamente para autorización");

            } catch (error) {
                console.error("Error al procesar la autorización:", error);
                alert("Ocurrió un error al procesar la solicitud. Por favor, intente nuevamente.");
            }
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
            <td className="px-4 py-3 flex items-center gap-2">
                <span className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
                    {iniciales(profesor.nombreCompleto)}
                </span>
                <span>{profesor.nombreCompleto}</span>
            </td>
            <td className="px-4 py-3">{profesor.correo}</td>
            <td className="px-4 py-3">{profesor.especialidad}</td>
            <td className="px-4 py-3 text-center">{nivelInicial(profesor.idnivel)}</td>
            <td className="px-4 py-3 text-center">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                    onClick={handleVerCV}
                >
                    Ver CV
                </button>
            </td>
            <td className="px-4 py-3 flex items-center gap-2">
                <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md" 
                    onClick={handleAutorizarProfesor}
                >
                    Enviar para autorización
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

export default FilaProfesorExterno;
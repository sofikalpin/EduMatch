import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FilaProfesorExterno = ({ profesor, onDelete, onAutorizar }) => {
    const navigate = useNavigate();
    const [niveles, setNiveles] = useState([]);
    
    useEffect(() => {
        const cargarNiveles = async () => {
            try {
                const response = await axios.get('http://localhost:5228/API/Nivel/Listar Niveles');
                const nivelesData = Array.isArray(response.data) ? response.data : [];
                setNiveles(nivelesData);
            } catch (error) {
                console.error("Error al cargar niveles:", error);
                setNiveles([]); 
            }
        };
        
        cargarNiveles();
    }, []);
    
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
    
    const getNivelIdFromDescripcion = (nivelDescripcion) => {
        if (!Array.isArray(niveles)) return null;
        const nivel = niveles.find(n => n.descripcion === nivelDescripcion);
        return nivel ? nivel.idnivel : null;
    };
    
    const nivelInicial = (nivelId) => {
        const nivelesMap = {
            "1": "A1", "2": "A2", "3": "B1", "4": "B2", "5": "C1", "6": "C2",
        };

        if (!Array.isArray(niveles) || niveles.length === 0) {
            return nivelesMap[nivelId] || " ";
        }

        const nivel = niveles.find(n => n.idnivel === nivelId);
        return nivel ? nivel.descripcion : nivelesMap[nivelId] || " ";
    };
    
    const generarContraseñaAleatoria = (longitud = 12) => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let contraseña = '';
        for (let i = 0; i < longitud; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            contraseña += caracteres.charAt(indice);
        }
        return contraseña;
    };
    
    const generarToken = () => {
        return [...Array(32)].map(() => Math.floor(Math.random() * 36).toString(36)).join('');
    };

    const handleAutorizarProfesor = async () => {
        if (window.confirm(`¿Estás seguro de que deseas enviar para autorización al profesor ${profesor.nombreCompleto}?`)) {
            try {
                const contraseñaGenerada = generarContraseñaAleatoria();
                const tokenGenerado = generarToken();
                
                const fechaExpiracion = new Date();
                fechaExpiracion.setHours(fechaExpiracion.getHours() + 24);
                
                const nivelId = getNivelIdFromDescripcion(profesor.nivel) || profesor.idnivel;
                
                const profesorData = {
                    idusuario: 0,
                    nombrecompleto: profesor.nombreCompleto,
                    correo: profesor.correo,
                    contraseñaHash: contraseñaGenerada,
                    fecharegistro: new Date().toISOString().split('T')[0],
                    idnivel: nivelId,
                    idrol: 2,
                    autProf: true, 
                    tokenRecuperacion: tokenGenerado,
                    tokenExpiracion: fechaExpiracion.toISOString(),
                    cvRuta: profesor.cvUrl,
                    fotoRuta: ""
                };

                await axios.post('http://localhost:5228/API/AdministradorProfesor/CrearProfesor', profesorData);
                await axios.delete(`http://localhost:5228/api/Bolsatrabajo/EliminarBolsa?id=${profesor.idbolsa}`);

                console.log(`Enviando credenciales al correo ${profesor.correo}: 
                    Usuario: ${profesor.correo}
                    Contraseña temporal: ${contraseñaGenerada}
                    Token de recuperación: ${tokenGenerado}`);

                onAutorizar(profesor.idusuario);
                alert("Profesor enviado exitosamente para autorización. Se le ha enviado un correo con sus credenciales temporales.");

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
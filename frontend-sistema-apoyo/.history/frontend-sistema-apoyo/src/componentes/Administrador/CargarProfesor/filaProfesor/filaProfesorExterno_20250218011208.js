import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FilaProfesorExterno = ({ profesor, onDelete, onAutorizar }) => {
    const navigate = useNavigate();
    const [niveles, setNiveles] = useState([]);
    
    useEffect(() => {
        // Cargar los niveles al montar el componente
        const cargarNiveles = async () => {
            try {
                const response = await axios.get('http://localhost:5228/API/Nivel/Nivel');
                setNiveles(response.data);
            } catch (error) {
                console.error("Error al cargar niveles:", error);
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
    
   
    
    // Función para generar una contraseña aleatoria
    const generarContraseñaAleatoria = (longitud = 12) => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let contraseña = '';
        for (let i = 0; i < longitud; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            contraseña += caracteres.charAt(indice);
        }
        return contraseña;
    };
    
    // Función para generar un token de recuperación
    const generarToken = () => {
        return [...Array(32)].map(() => Math.floor(Math.random() * 36).toString(36)).join('');
    };

    const handleAutorizarProfesor = async () => {
        if (window.confirm(`¿Estás seguro de que deseas enviar para autorización al profesor ${profesor.nombreCompleto}?`)) {
            try {
                // Generar contraseña aleatoria y token
                const contraseñaGenerada = generarContraseñaAleatoria();
                const tokenGenerado = generarToken();
                
                // Calcular fecha de expiración (24 horas desde ahora)
                const fechaExpiracion = new Date();
                fechaExpiracion.setHours(fechaExpiracion.getHours() + 24);
                
                // Preparar los datos del profesor
                const profesorData = {
                    idusuario: profesor.idusuario,
                    nombrecompleto: profesor.nombreCompleto,
                    correo: profesor.correo,
                    contraseñaHash: contraseñaGenerada, // La API se encargará de hacer el hash
                    fecharegistro: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
                    idnivel: profesor.idnivel,
                    idrol: 2, // Asumiendo que 2 es el rol de profesor
                    autProf: false, // Inicialmente no está autorizado
                    tokenRecuperacion: tokenGenerado,
                    tokenExpiracion: fechaExpiracion.toISOString(),
                    cvRuta: profesor.cvUrl,
                    fotoRuta: "" // Por defecto vacío
                };

                // Enviar los datos al endpoint para crear el profesor pendiente de autorización
                await axios.post('http://localhost:5228/API/AdministradorProfesor/CrearProfesor', profesorData);

                // Si la creación fue exitosa, eliminar de la bolsa de trabajo
                await axios.delete(`http://localhost:5228/api/Bolsatrabajo/EliminarBolsa?id=${profesor.idbolsa}`);

                // Enviar correo con las credenciales temporales (esto debería hacerse desde el backend)
                console.log(`Enviando credenciales al correo ${profesor.correo}: 
                    Usuario: ${profesor.correo}
                    Contraseña temporal: ${contraseñaGenerada}
                    Token de recuperación: ${tokenGenerado}`);

                // Llamar a la función onAutorizar para actualizar el estado local
                onAutorizar(profesor.idusuario);

                // Mostrar mensaje de éxito
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
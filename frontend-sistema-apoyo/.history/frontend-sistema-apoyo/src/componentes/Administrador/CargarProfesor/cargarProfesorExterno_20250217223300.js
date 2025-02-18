import React, { useEffect, useState } from "react";
import TablaProfesoresExterno from "./tablaProfesAutorizar/tablaProfesorAExterno.js";
import axios from "axios";
import { ArrowLeft } from 'lucide-react';
import Header from "../HeaderAdministrador.js";
import Footer from "../FooteraAdministrador.js";
import JellyJobs from "./imagen/JellyJobs.png";
import { useNavigate } from "react-router-dom"; 

const CargarProfesorExterno = () => {
    const [profesoresNoAutorizado, setProfesoresNoAutorizado] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [mensajeEliminacion, setMensaje] = useState("");

    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProfesores = async () => {
            setLoading(true);
            try {
                console.log("Obteniendo lista de profesores...");
                const response = await axios.get("http://localhost:5228/api/Bolsatrabajo/ingles"); 
                console.log("Datos recibidos:", response.data);
                
                if (Array.isArray(response.data)) {
                    setProfesoresNoAutorizado(response.data);
                } else {
                    console.error("Error: Respuesta inesperada del servidor.");
                    setError("No se pudo cargar la lista de profesores.");
                }
            } catch (error) {
                console.error("Error al cargar los profesores:", error);
                setError("Error al conectar con el servidor.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfesores();
    }, []);

    const handleDeleteProfesor = async (idbolsa) => {
        if (window.confirm("¿Estás seguro de que deseas rechazar este profesor?")) {
            try {
                console.log(`Eliminando profesor con idbolsa: ${idbolsa}`);
                await axios.delete(`http://localhost:5228/api/Bolsatrabajo/EliminarBolsa?id=${idbolsa}`);
                
                setMensaje("Profesor rechazado con éxito.");
                setTimeout(() => setMensaje(""), 2000);

                // Actualizar lista después de eliminar
                setProfesoresNoAutorizado((prevProfesores) => 
                    prevProfesores.filter((profesor) => profesor.idbolsa !== idbolsa)
                );
            } catch (error) {
                console.error("Error al rechazar al profesor:", error);
                alert("Ocurrió un error al rechazar el profesor. Por favor, intenta nuevamente.");
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
        <Header />

        <div className="flex-grow flex flex-col items-center justify-center px-5 py-10">
            
            <div className="flex items-center justify-start w-full mb-0">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                    <ArrowLeft className="w-6 h-6" />
                    <span>Volver</span>
                </button>
            </div>

            <div className="flex flex-col items-center w-full mb-2">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Autorizar Profesores de</h1>
                <img src={JellyJobs} alt="Logo" className="w-30 h-30 mb-4" />
            </div>

            {mensajeEliminacion && <div className="text-green-600 text-center mb-4">{mensajeEliminacion}</div>}
            {error && <div className="text-red-600 text-center mb-4">{error}</div>}
            {loading ? (
                <div className="text-center text-gray-500">Cargando...</div>
            ) : (
                <TablaProfesoresExterno 
                    data={profesoresNoAutorizado} 
                    onDelete={handleDeleteProfesor} 
                />
            )}
        </div>

        <Footer />
    </div>
    );
};

export default CargarProfesorExterno;

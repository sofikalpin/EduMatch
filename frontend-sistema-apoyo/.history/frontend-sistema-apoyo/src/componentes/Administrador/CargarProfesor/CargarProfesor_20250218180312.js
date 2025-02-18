import React, { useEffect, useState } from "react";
import TablaProfesores from "./TablaProfesAutorizar/TablaProfesA.js";
import axios from "axios";
import Header from "../HeaderAdministrador.js";
import Footer from "../FooteraAdministrador.js";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom"; 

const CargarProfesor = () => {
    const [profesoresNoAutorizado, setProfesoresNoAutorizado] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [mensajeEliminacion, setMensaje] = useState("");
    const [cantidad, setCantidad] = useState(0);

    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProfesores = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5228/API/AdministradorProfesor/ListaProfesoresNOAutorizados");
                if (response.data.status && Array.isArray(response.data.value)) {
                    setProfesoresNoAutorizado(response.data.value);
                    setCantidad(response.data.value.length);
                } else {
                    console.error("Error al cargar los profesores: " + response.data.message);
                    setError("No se pudo cargar la lista de profesores.");
                }
            } catch (error) {
                console.error("Error al cargar los profesores: ", error);
                setError("Error al conectar con el servidor.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfesores();
    }, []);

    const profesorFiltro = profesoresNoAutorizado.filter((profesor) =>
        profesor.nombrecompleto?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleDeleteProfesor = (id) => {
        if (window.confirm("¿Estás seguro de que deseas rechazar este profesor?")) {
            axios.delete(`http://localhost:5228/API/AdministradorProfesor/EliminarProfesor?id=${id}`)
                .then(() => {
                    setProfesoresNoAutorizado((prevProfesores) => prevProfesores.filter((profesor) => profesor.idusuario !== id));
                    setMensaje("Profesor rechazado con éxito.");
                    setCantidad((prevCantidad) => prevCantidad - 1);
                    setTimeout(() => setMensaje(""), 2000);
                })
                .catch((error) => {
                    console.error("Error al rechazar al profesor: ", error);
                    alert("Ocurrió un error al rechazar el profesor. Por favor, intenta nuevamente.");
                });
        }
    };

    const handleAutorizarProfesor = (id) => {
        if (window.confirm("¿Estás seguro de que deseas autorizar este profesor?")) {
            axios.put(`http://localhost:5228/API/AdministradorProfesor/AutorizarProfesor?id=${id}`)
                .then(() => {
                    setProfesoresNoAutorizado((prevProfesores) => prevProfesores.filter((profesor) => profesor.idusuario !== id));
                    setMensaje("Profesor autorizado con éxito.");
                    setTimeout(() => setMensaje(""), 2000);
                    setCantidad((prevCantidad) => prevCantidad - 1);
                })
                .catch((error) => {
                    console.error("Error al autorizar al profesor: ", error);
                    alert("Ocurrió un error al autorizar el profesor. Por favor, intenta nuevamente.");
                });
        }
    };

    const handleRedirectToProfesores = () => {
    
        navigate('/administrador/cargarProfesorExterno');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
            <Header />

            <div className="flex items-center justify-start w-full mt-4 mb-0 px-20">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                    <ArrowLeft className="w-6 h-6" />
                    <span>Volver</span>
                </button>
            </div>

            <div className="flex flex-col items-center mt-8 px-20 max-w-13xl mx-auto flex-grow mb-16">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Autorizar Profesores</h1>

                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Buscar por nombre de profesor..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="p-4 w-96 text-lg border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoComplete="off"
                    />

                    <button
                        onClick={handleRedirectToProfesores}
                        className="bg-[#00A89F] hover:bg-[#008F8C] active:bg-[#007C79] text-white px-6 py-2 rounded-md ml-4 transition-all"
                    >
                        Ver Profesores de JellyJobs
                    </button>
                </div>

                {mensajeEliminacion && <div className="text-green-600 text-center mb-4">{mensajeEliminacion}</div>}
                {error && <div className="text-red-600 text-center mb-4">{error}</div>}
                {loading ? (
                    <div className="text-center text-gray-500">Cargando...</div>
                ) : (
                    <TablaProfesores 
                        data={profesorFiltro} 
                        onDelete={handleDeleteProfesor} 
                        onAutorizar={handleAutorizarProfesor} 
                    />
                )}
            </div>

            <Footer />
        </div>
    );
};

export default CargarProfesor;

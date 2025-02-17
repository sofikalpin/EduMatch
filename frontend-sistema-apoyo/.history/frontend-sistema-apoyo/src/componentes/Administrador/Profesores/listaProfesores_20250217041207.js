import React, { useEffect, useState } from "react";
import TablaProfesoresT from "./TablaProfesores/TablaProfes";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import axios from "axios";
import Header from "../HeaderAdministrador.js";
import Footer from "../FooteraAdministrador.js";

const ListaProfesores = () => {
    const [profesores, setProfesores] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [mensajeEliminacion, setMensaje] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfesores = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5228/API/AdministradorProfesor/ListaProfesoresAutorizados");
                if (response.data.status && Array.isArray(response.data.value)){
                    setProfesores(response.data.value);
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

    const profesorFiltro = profesores.filter((profesor) =>
        profesor.nombrecompleto?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleDeleteProfesor = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este profesor?")) {
            axios.delete(`http://localhost:5228/API/AdministradorProfesor/EliminarProfesor?id=${id}`)
                .then(() => {
                    setProfesores((prevProfesores) => prevProfesores.filter((profesor) => profesor.idusuario !== id));
                    console.log("Profesor eliminado con éxito.");
                    setMensaje("Profesor eliminado con éxito.");
                    setTimeout(() => setMensaje(""), 2000); // Limpiar mensaje después de 3 segundos
                })
                .catch((error) => {
                    console.error("Error al eliminar al profesor: ", error);
                    alert("Ocurrió un error al eliminar el profesor. Por favor, intenta nuevamente.");
                });
        }
    };

    const iniciales = (name) => {
        if (!name) return "";
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();
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
    
            <div className="flex flex-col items-center mt-8 px-20 max-w-13xl mx-auto flex-grow">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Lista de Profesores Registrados</h1>
    
                {/* Campo de búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar por nombre de profesor..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                    autoComplete="off"
                />
    
                {/* Mostrar mensaje de eliminación, error o la tabla */}
                <div>
                    {mensajeEliminacion && <div className="text-green-500 mb-4">{mensajeEliminacion}</div>}
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {loading ? (
                        <div className="text-gray-600">Cargando...</div>
                    ) : (
                        <TablaProfesoresT data={profesorFiltro} onDelete={handleDeleteProfesor} />
                    )}
                </div>
            </div>
    
            <Footer />
        </div>
    );
};

export default ListaProfesores;

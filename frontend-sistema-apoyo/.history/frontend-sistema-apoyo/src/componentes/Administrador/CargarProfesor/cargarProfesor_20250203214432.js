import React, { useEffect, useState } from "react";
import TablaProfesores from "./tablaProfesAutorizar/tablaProfesA.js";
import Titulo from "./titulo/titulo.js";
import axios from "axios";
import Header from "../HeaderAdministrador.js";
import Footer from "../FooteraAdministrador.js";
import logo from "../../../logo/LogoInicio.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const socialIcons = [
    { name: 'Facebook', color: 'hover:text-blue-500' },
    { name: 'Instagram', color: 'hover:text-pink-500' },
    { name: 'Twitter', color: 'hover:text-blue-400' },
    { name: 'Youtube', color: 'hover:text-red-500' },
    { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const CargarProfesor = () => {
    const [profesoresNoAutorizado, setProfesoresNoAutorizado] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [mensajeEliminacion, setMensaje] = useState("");
    const [cantidad, setCantidad] = useState(0);

    const navigate = useNavigate(); // Initialize navigate

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
        if (window.confirm("¿Estás seguro de que deseas eliminar este profesor?")) {
            axios.delete(`http://localhost:5228/API/AdministradorProfesor/EliminarProfesor?id=${id}`)
                .then(() => {
                    setProfesoresNoAutorizado((prevProfesores) => prevProfesores.filter((profesor) => profesor.idusuario !== id));
                    setMensaje("Profesor eliminado con éxito.");
                    setCantidad((prevCantidad) => prevCantidad - 1);
                    setTimeout(() => setMensaje(""), 2000);
                })
                .catch((error) => {
                    console.error("Error al eliminar al profesor: ", error);
                    alert("Ocurrió un error al eliminar el profesor. Por favor, intenta nuevamente.");
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

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header onNavigate={navigate} logo={logo} />
            <div className="flex flex-col items-center mt-16 px-10 max-w-12xl mx-auto">
                <input
                    type="text"
                    placeholder="Buscar por nombre de profesor..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="p-4 w-96 text-lg border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="off"
                />

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
            <div className="mb-16"></div>
            <Footer socialIcons={socialIcons} className="w-full" />
        </div>
    );
};

export default CargarProfesor;

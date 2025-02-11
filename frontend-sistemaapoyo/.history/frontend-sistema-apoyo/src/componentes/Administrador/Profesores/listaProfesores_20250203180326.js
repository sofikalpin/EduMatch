import React, { useEffect, useState } from "react";
import TablaProfes from "./TablaProfesores/tablaProfesores";
import logo from "../../../logo/LogoInicio.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        <div className="container mx-auto p-4">
            <header className="flex items-center justify-between mb-6">
                <img src={logo} alt="Logo" className="w-16 h-16" />
                <h1 className="text-2xl font-bold">Lista de Profesores</h1>
                <button 
                    className="bg-gray-300 text-black rounded-full w-10 h-10 flex items-center justify-center"
                    onClick={() => navigate("/perfil")}
                >
                    {iniciales("Administrador 1")}
                </button>
            </header>

            <input
                type="text"
                placeholder="Buscar por nombre de profesor..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded w-full"
                autoComplete="off"
            />

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
    );
};

export default ListaProfesores;

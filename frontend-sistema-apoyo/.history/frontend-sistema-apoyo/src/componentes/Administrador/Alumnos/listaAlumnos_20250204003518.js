import React, { useEffect, useState } from "react";
import logo from "../../../logo/LogoInicio.png";
import TablaAlumnos from "./tablaAlumnos/tablaAlumnos.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../HeaderAdministrador.js";
import Footer from "../FooteraAdministrador.js";

const socialIcons = [
    { name: 'Facebook', color: 'hover:text-blue-500' },
    { name: 'Instagram', color: 'hover:text-pink-500' },
    { name: 'Twitter', color: 'hover:text-blue-400' },
    { name: 'Youtube', color: 'hover:text-red-500' },
    { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const ListaAlumnos = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [mensajeEliminacion, setMensaje] = useState("");
    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlumnos = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5228/API/AdministradorAlumno/ListaAlumnos");
                if (response.data.status && Array.isArray(response.data.value)) {
                    setAlumnos(response.data.value);
                } else {
                    console.error("Error al cargar los alumnos: " + response.data.message);
                    setError("No se pudo cargar la lista de alumnos");
                }
            } catch (error) {
                console.error("Error al cargar los alumnos: ", error);
                setError("Error al conectar con el servidor.");
            } finally {
                setLoading(false);
            }
        };
        fetchAlumnos();
    }, []);

    const alumnosFiltro = alumnos.filter((alumno) => 
        alumno.nombrecompleto?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleDeleteAlumno = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este alumno?")) {
            setDeleting(true);
            axios.delete(`http://localhost:5228/API/AdministradorAlumno/EliminarAlumno?id=${id}`)
                .then(() => {
                    setAlumnos((prevAlumnos) => prevAlumnos.filter((alumno) => alumno.idusuario !== id));
                    console.log("Alumno eliminado con éxito.");
                    setMensaje("Alumno eliminado con éxito.");
                    setTimeout(() => setMensaje(""), 2000);
                })
                .catch((error) => {
                    console.error("Error al eliminar el alumno: ", error);
                    alert("Ocurrió un error al eliminar el alumno. Por favor, intenta nuevamente.");
                })
                .finally(() => {
                    setDeleting(false);
                });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header onNavigate={navigate} logo={logo} />
            <div className="flex-grow flex flex-col items-center mt-16 px-20 max-w-13xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Alumnos</h1>

                <input
                    type="text"
                    placeholder="Buscar alumno por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    autoComplete="off"
                />

                <div className="w-full">
                    {mensajeEliminacion && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{mensajeEliminacion}</div>}
                    {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
                    {loading ? (
                        <div className="text-center text-gray-500">Cargando...</div>
                    ) : (
                        <TablaAlumnos data={alumnosFiltro} onDelete={handleDeleteAlumno} deleting={deleting} />
                    )}
                </div>
            </div>
            <div className="mb-16"></div>
            <Footer socialIcons={socialIcons} className="w-full" />
        </div>
    );
};

export default ListaAlumnos;
import React, { useEffect, useState } from "react";
import "./listaAlumnos.css";
import logo from "../../../logo/LogoInicio.png";
import TablaAlumnos from "./tablaAlumnos/tablaAlumnos.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ListaAlumnos = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [mensajeEliminacion, setMensaje] = useState("");

    const navigate = useNavigate();

    const iniciales = (name) => {
        if (!name) return "";
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();
    };

    useEffect(() => {
        const fetchAlumnos = async() => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5228/API/AdministradorAlumno/ListaAlumnos")
                if (response.data.status && Array.isArray(response.data.value)){
                    setAlumnos(response.data.value);
                }else{
                    console.error("Error al cargar los alumnos: " + response.data.message);
                    setError("No se pudo cargar la lista de alumnos");
                }
            }catch (error) {
                console.error("Error al cargar los alumnos: ", error);
                setError("Error al conectar con el servidor.");
            }finally{
                setLoading(false);
            }
        }
        fetchAlumnos();
    }, []);
    
    const alumnosFiltro = alumnos.filter((alumno) => 
        alumno.nombrecompleto?.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleDeleteAlumno = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este alumno?")) {
            axios.delete(`http://localhost:5228/API/AdministradorAlumno/EliminarAlumno?id=${id}`)
                .then(() => {
                    setAlumnos((prevAlumnos) => prevAlumnos.filter((alumno) => alumno.idusuario !== id));
                    console.log("Alumno eliminado con éxito.");
                    setMensaje("Alumno eliminado con éxito.");
                    setTimeout(() => setMensaje(""), 2000); // Limpiar mensaje después de 3 segundos
                })
                .catch((error) => {
                    console.error("Error al eliminar el alumno: ", error);
                    alert("Ocurrió un error al eliminar el alumno. Por favor, intenta nuevamente.");
                });
        }
    }

    return (
        <div className="listaAlumnos-Container">
            <header className="listaAlumnos-titulo">
                <img src={logo} alt="Logo" className="logo-img" />
                <h1 className="titulo-nombre">Lista de Alumnos</h1>
                <button className="avatar-perfil" onClick={() => navigate("/perfil")}>{iniciales("Administrador 1")}</button>
            </header>

            <input
                type="text"
                placeholder="Buscar alumno por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="input-busqueda"
                autoComplete="off"
            />

            <div>
                {mensajeEliminacion && <div className="mensaje-eliminacion">{mensajeEliminacion}</div>}
                {error && <div className="error-message">{error}</div>}
                {loading ? (<div className="cargador">Cargando...</div>
                ) : (
                    <TablaAlumnos data={alumnosFiltro} onDelete={handleDeleteAlumno} />
                )}
            </div>
        </div>
    );
};

export default ListaAlumnos;
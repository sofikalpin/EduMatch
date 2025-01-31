import React, { useEffect, useState } from "react";
import "./cargarProfesor.css";
import TablaProfesores from "./tablaProfesAutorizar/tablaProfesA.js";
import Titulo from "./titulo/titulo.js";
import axios from "axios";


const CargarProfesor = () => {

    const [profesoresNoAutorizado, setProfesoresNoAutorizado] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [mensajeEliminacion, setMensaje] = useState("");
    const [cantidad, setCantidad] = useState(0);

    useEffect(() => {
        const fetchProfesores  = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5228/API/AdministradorProfesor/ListaProfesoresNOAutorizados");
                if (response.data.status && Array.isArray(response.data.value)){
                    setProfesoresNoAutorizado(response.data.value);
                    setCantidad(response.data.value.length);
                }else{
                    console.error("Error al cargar los profesores: " + response.data.message);
                    setError("No se pudo cargar la lista de profesores.");
                }
                
                
            }catch (error) {
                console.error("Error al cargar los profesroes: ", error);
                setError("Error al conectar con el servidor.");
            }finally{
                setLoading(false);
            };
        }
        fetchProfesores ();
    }, []);

    const profesorFiltro = profesoresNoAutorizado.filter((profesor) =>
        profesor.nombrecompleto?.toLowerCase().includes(busqueda.toLowerCase())
    );
      

    const handleDeleteProfesor = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este profesor?")) {
            axios.delete(`http://localhost:5228/API/AdministradorProfesor/EliminarProfesor?id=${id}`)
                .then(() => {
                    setProfesoresNoAutorizado((prevProfesores) => prevProfesores.filter((profesor) => profesor.idusuario !== id));
                    console.log("Profesor eliminado con éxito.");
                    setMensaje("Profesor eliminado con éxito.");
                    setCantidad((prevCantidad) => prevCantidad - 1);
                    setTimeout(() => setMensaje(""), 2000); // Limpiar mensaje después de 3 segundos
                })
                .catch((error) => {
                    console.error("Error al eliminar al profesor: ", error);
                    alert("Ocurrió un error al eliminar el profesor. Por favor, intenta nuevamente.");
                });
        }
    };

    const handleAutorizarProfesor = (id) => {
        if (window.confirm("¿Estás seguro de que deseas autorizar este profesor?")) {
            axios
                .put(`http://localhost:5228/API/AdministradorProfesor/AutorizarProfesor?id=${id}`)
                .then(() => {
                    setProfesoresNoAutorizado((prevProfesores) =>
                        prevProfesores.filter((profesor) => profesor.idusuario !== id)
                    );
                    console.log("Profesor autorizado con éxito.");
                    setMensaje("Profesor autorizado con éxito.");
                    setTimeout(() => setMensaje(""), 2000);
                    setCantidad((prevCantidad) => prevCantidad - 1);
                })
                .catch((error) => {
                    console.error("Error al autorizar al profesor: ", error);
                    alert("Ocurrió un error al autorizar el profesor. Por favor, intenta nuevamente.");
                });
        }
    }

    return (
        <div className="cargaProfesor-Container">
            <header className="header">
                <Titulo cantidad={cantidad} />
            </header>

            <input
                type="text"
                placeholder="Buscar por nombre de profesor..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="input-busqueda-carga"
                autoComplete="off" // Desactiva el autocompletado si no es necesario
            />

            <div>
                {mensajeEliminacion && <div className="mensaje-eliminacion">{mensajeEliminacion}</div>}
                {error && <div className="error-message">{error}</div>}
                {loading ? (<div className="cargador">Cargando...</div>
                ) : (
                    <TablaProfesores 
                        data={profesorFiltro} 
                        onDelete={handleDeleteProfesor}
                        onAutorizar={handleAutorizarProfesor}/>
                )}
            </div>
        </div>
    );
};

export default CargarProfesor;

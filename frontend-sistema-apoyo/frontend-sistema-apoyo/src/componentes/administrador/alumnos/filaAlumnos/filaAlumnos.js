import React, {useState} from "react";
import "./filaAlumnos.css";
import { useNavigate } from "react-router-dom";
import EditarAlumno from "../editAlumno/editAlumno.js";

const FilaAlumnos = ({ alumno, onDelete }) => {
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const navigate = useNavigate();
    
    const handleNavigate = () => {
        if (!alumno?.idusuario) {
            console.error("El idusuario del alumno no está definido o es inválido.");
            return;
        }
        console.log("El idusuario: " + alumno.idusuario);
        navigate(`editarAlumno?id=${encodeURIComponent(alumno.idusuario)}`);
        setMostrarEditar(true)
    };
    
    const controlarEliminar = () => {        
        //Mostrar cuadro de confirmacion
        const confirmarEliminar = window.confirm(`¿Está seguro de que desea eliminar al alumno ${alumno.nombrecompleto}?`);
        if (confirmarEliminar) {
            onDelete(alumno.idusuario);
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

    const nivelInicial = (nivelId) => {
        const niveles = {
            "1": "A1",
            "2": "A2",
            "3": "B1",
            "4": "B2",
            "5": "C1",
            "6": "C2",
        };
        return niveles[nivelId] || "Desconocido";
    }

    const handleUpdate = () => {
        // Verifica si onUpdate es una función
        if (typeof onUpdate !== 'function') {
            console.error("onUpdate no es una función");
            return;
        }
        console.log("Alumno actualizado");
        setMostrarEditar(false);  // Cierra el modal
    };

    
    
    return(
        <>
            <tr className="fila-alumnos">
                <td>
                    <div className="alumno">
                        <span className="avatar">{iniciales(alumno.nombrecompleto)}</span>
                        {alumno.nombrecompleto}
                    </div>
                </td>
                <td>
                    <div className="email">
                        {alumno.correo}
                    </div>
                </td>
                <td>
                    <span className="nivel">{nivelInicial(alumno.idnivel)}</span>
                </td>
                <td>
                    <button className="boton-editar" onClick={handleNavigate}>Editar</button>
                    {mostrarEditar && (
                        <div className="modal-overlay">
                            <EditarAlumno 
                                onUpdate={handleUpdate} 
                            />
                        </div>
                    )}
                    <button className="boton-eliminar" onClick={controlarEliminar}>Eliminar</button>
                </td>
            </tr>

            
        </>
            
    );
};

export default FilaAlumnos;
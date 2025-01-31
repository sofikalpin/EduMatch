import React, {useState} from "react";
import "./filaProfesores.css";
import { useNavigate } from "react-router-dom";
import EditarProfesor from "../editProfesor/editProfesor.js";

const FilaProfesores = ({ profesor, onDelete }) => {
    //console.log("Datos del profesor:", profesor);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const navigate = useNavigate();

    const toggleTooltip = () => {
        setShowTooltip(prevState => !prevState)
    };

    const handleNavigate = () => {
        if (!profesor?.idusuario){
            console.error("El idusuario del profesor no esta definido o es invalido");
            return;
        }
        console.log("El idusuario: " + profesor.idusuario);
        navigate(`editarProfesor?id=${encodeURIComponent(profesor.idusuario)}`);
        setMostrarEditar(true)
    }

    const controlarEliminar = () => {
        //Mostrar cuadro de confirmacion
        const confirmarEliminar = window.confirm(`¿Desea eliminar al profesor ${profesor.nombrecompleto}?`);
        if (confirmarEliminar) {
            onDelete(profesor.idusuario);
        }
    };

    const iniciales = (name) => {
        if (!name) return "";
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();
    }

    const nivelInicial = (nivelId) => {
        const niveles = {
            "1": "A1",
            "2": "A2",
            "3": "B1",
            "4": "B2",
            "5": "C1",
            "6": "C2",
        };
        return niveles[nivelId] || " ";
    }

    const handleUpdate = () => {
        // Verifica si onUpdate es una función
        if (typeof onUpdate !== 'function') {
            console.error("onUpdate no es una función");
            return;
        }
        console.log("Profesor actualizado");
        setMostrarEditar(false);  // Cierra el modal
    };

    return (
        <tr className="fila-profesores">
            <td>
                <div className="profesor">
                    <span className="avatar">{iniciales(profesor.nombrecompleto)}</span>
                    {profesor.nombrecompleto}
                </div>
            </td>
            <td>
                <div className="email">
                    {profesor.correo}
                </div> 
            </td>
            <td>
                <span className="nivel">{nivelInicial(profesor.idnivel)}</span>
            </td>
            <td className="columna-accion">
                <button className="boton-editar" onClick={handleNavigate}>Editar</button>
                {mostrarEditar && (
                    <div className="modal-overlay">
                        <EditarProfesor 
                            onUpdate={handleUpdate}
                        />
                    </div>
                )}

                <button className="boton-eliminar" onClick={controlarEliminar}>Eliminar</button>
                <div 
                        className="menu-opciones-container"
                        onClick={toggleTooltip}
                    >
                        <button className="menu-opciones">⋮</button>
                        {showTooltip && (
                            <span className="tooltip-text">
                                <button
                                    className="tooltip-button"
                                    onClick={() => {
                                        console.log("Navegando a ProfesorCV")
                                        navigate("/profesorCV")}}
                                >
                                    Ver CV
                                </button>
                            </span>
                        )}
                    </div>
            </td>
        </tr>
    );
};

export default FilaProfesores;
import React, { useState }  from "react";
import "./filaProfesor.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FilaProfesor = ({ profesor, onDelete, onAutorizar }) => 
    {
        const [showTooltip, setShowTooltip] = useState(false);
        const navigate = useNavigate();

        const toggleTooltip = () => {
            setShowTooltip(prevState => !prevState)
        };

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

        const handleAutorizarProfesor = (id) => {
            if (
                window.confirm(
                  `¿Estás seguro de que deseas autorizar al profesor ${profesor.nombrecompleto}?`
                )
              ) {
                onAutorizar(profesor.idusuario);
              }
        };

        return (
            <tr className="fila-profesor">
                <td>
                    <div className="icono-nombre">
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
                <td>
                    <button className="boton-aceptar" onClick={handleAutorizarProfesor}>Autorizar</button>
                    <button className="boton-eliminar" onClick={controlarEliminar}>Eliminar</button>
                    <div 
                        className="menu-opciones-container"
                        onClick={() => setShowTooltip(!showTooltip)}
                    >
                        <button className="menu-opciones">⋮</button>
                        {showTooltip && (
                            <span className="tooltip-text">
                                <button
                                    className="tooltip-button"
                                    onClick={() => navigate("/profesorCV")}
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
    export default FilaProfesor;
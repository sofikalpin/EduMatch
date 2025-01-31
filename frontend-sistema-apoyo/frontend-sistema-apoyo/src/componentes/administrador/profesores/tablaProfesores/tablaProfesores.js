import React, {useState} from "react";
import "./tablaProfesores.css";
import FilaProfesores from "../filaProfesores/filaProfesores.js";
import { useNavigate } from "react-router-dom";

const TablaProfes = ({ data, onDelete }) => {
    const navigate = useNavigate();
    const [nivelSeleccionado, setNivelSeleccionado] = useState("");

    const hadleNavigate = () => {
        try {
            navigate("nuevoProfesor");
        }catch (error){
            console.error("Error al navegar: ", error);
        }
    }

    const handleNivelSeleccionado = (e) => {
        setNivelSeleccionado(e.target.value);
    }

    const profesorNivel = data.filter((profesor) =>
        nivelSeleccionado === "" || profesor.idnivel.toString() === nivelSeleccionado 
    );

    const isDataValid = profesorNivel.length > 0;

    return(
        <div className="tablaProfesor-contenedor">
                <div className="filtro-nivel">
                    <label htmlFor="nivel-select">Filtrar por nivel:</label>
                    <select 
                        id="nivel-select" 
                        value={nivelSeleccionado} 
                        onChange={handleNivelSeleccionado}
                        className="select-nivel"
                    >
                        <option value="">Todos los niveles</option>
                        <option value="1">A1: Principiante</option>
                        <option value="2">A2: Básico</option>
                        <option value="3">B1: Pre-intermedio</option>
                        <option value="4">B2: Intermedio</option>
                        <option value="5">C1: Intermedio-alto</option>
                        <option value="6">C2: Avanzado</option>
                    </select>
                </div>

                <div className="añadirProfesor">
                    <button className="boton-añadir" onClick={hadleNavigate}>Añadir nuevo profesor</button>
                </div>


                <div className="tablaP-scroll">
                    <table className="tablaProfesor-tabla">
                        <thead>
                            <tr>
                                <th> Nombre y apellido </th>
                                <th> Correo electrónico </th>
                                <th> 🔽 Nivel </th>
                                <th> Acción </th>
                            </tr>
                        </thead>
                        <tbody className="tabla-datos">
                            {isDataValid ? (
                                profesorNivel.map((profesor) => (
                                    <FilaProfesores 
                                        key={profesor.idusuario} 
                                        profesor={profesor} 
                                        onDelete={onDelete}/>
                                )) 
                            ) : (
                                <tr>
                                    <td colSpan={4} className="sin-datos">No hay datos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>     
        </div>
    );
};

export default TablaProfes;

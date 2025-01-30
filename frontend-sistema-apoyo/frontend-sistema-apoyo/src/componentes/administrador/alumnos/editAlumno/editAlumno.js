import React, { useEffect, useState } from "react";
import logo from '../../../../logo/LogoFinal.png';
import { useSearchParams, useNavigate } from "react-router-dom";
import "./editAlumno.css";
import axios from "axios";

const niveles = {
    A1: 1,
    A2: 2,
    B1: 3,
    B2: 4,
    C1: 5,
    C2: 6,
};

export const EditarAlumno = ({ onUpdate }) => {
    const [searchParams] = useSearchParams(); // Obtén los parámetros de consulta
    const idusuario = searchParams.get("id"); // Extrae el idusuario
    const [email, setEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [nivel, setNivel] = useState("");
    const [contraseñaHash, setContraseñaHash] = useState("");
    const [mensajeActualizado, setMensajeActualizado] = useState("");

    const navigate = useNavigate();

    // Cargar los datos del alumno al montar el componente
    useEffect(() => {
        const cargarAlumno = async () => {
            if (!idusuario) {
            return;
            }

            try {
                console.log("El idusuario: ", idusuario);
                const response = await axios.get(
                    `http://localhost:5228/API/AdministradorAlumno/AlumnoID?id=${idusuario}`
                );
                console.log("Respuesta del servidor:", response.data);
                const alumno = response.data.value;

                // Verificar que alumno y nombrecompleto están definidos
                if (!alumno || !alumno.nombrecompleto) {
                    throw new Error("El alumno o el nombre completo no están definidos en la respuesta.");
                }

                const [nombre, apellido] = alumno.nombrecompleto.split(" ") || ["", ""];
                setNombre(nombre || "");
                setApellido(apellido || "");
                setEmail(alumno.correo || "");
                setContraseñaHash(alumno.contraseñaHash || "");
                setNivel(Object.keys(niveles).find(key => niveles[key] === alumno.idnivel) || "");
            } catch (error) {
                console.error("Error al cargar los datos del alumno:", error);
                alert(error.response?.data?.msg || "No se pudieron cargar los datos del alumno.");
            }
        };

        cargarAlumno();
    }, [idusuario]);

    const handleActualizar = async (e) => {
        e.preventDefault();

        if (!nombre || !apellido || !email || !nivel) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            const nivelId = niveles[nivel];

            const datosActualizados = {
                idusuario: parseInt(idusuario, 10), // Convertir a número
                nombrecompleto: `${nombre.trim()} ${apellido.trim()}`,
                correo: email.trim(),
                idnivel: nivelId,
                idrol: 2,
                contraseñaHash: contraseñaHash,
            };

            console.log("Datos del alumno actualizado: ", datosActualizados);

            const response = await axios.put(
                `http://localhost:5228/API/AdministradorAlumno/EditarporID?id=${idusuario}`,
                datosActualizados
            );

            console.log("Respuesta del servidor:", response.data);

            if (response.data.status) {
                setMensajeActualizado("Alumno actualizado con éxito.");
                setTimeout(() => setMensajeActualizado(""), 2000);
                console.log("Ejecutando onUpdate...");
                if (typeof onUpdate === "function") {
                    onUpdate();
                }
                setTimeout(() => setMensajeActualizado(""), 2000);
            } else {
                alert(response.data.msg || "No se pudo actualizar el alumno.");
                
            }
        } catch (error) {
            console.error("Error al actualizar el alumno:", error);
        }
    };

    const handleCancelar = () => {
        navigate("../listaAlumnos", {replace: true});
    }

    return (
        <div className="contenedor-principal">
            <img src={logo} alt="Logo" className="logo-img" />

            {mensajeActualizado && <div className="actualizado-message">{mensajeActualizado}</div>}

            <form onSubmit={handleActualizar} className="edit-form">
                <h3>EDITAR ALUMNO</h3>

                <label htmlFor="nombre" className="titulo-form">Nombre</label>
                <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    type="text"
                    id="nombre"
                    className="login-input"
                    placeholder={nombre || "Ejemplo: Juan"}
                />

                <label htmlFor="apellido" className="titulo-form">Apellido</label>
                <input
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    type="text"
                    id="apellido"
                    className="login-input"
                    placeholder={apellido || "Ejemplo: Pérez"}
                />

                <label htmlFor="email" className="titulo-form">Correo electrónico</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    className="login-input"
                    placeholder={email || "Ejemplo: correo@dominio.com"}
                />

                <label htmlFor="nivel" className="titulo-form">Nivel</label>
                <select
                    id="nivel"
                    value={nivel}
                    onChange={(e) => setNivel(e.target.value)}
                    className="login-input"
                >
                    <option value="" disabled>Seleccione un nivel</option>
                    <option value="A1">A1: Principiante</option>
                    <option value="A2">A2: Básico</option>
                    <option value="B1">B1: Pre-intermedio</option>
                    <option value="B2">B2: Intermedio</option>
                    <option value="C1">C1: Intermedio-alto</option>
                    <option value="C2">C2: Avanzado</option>
                </select>

                <button type="submit" className="link-actualizar" onClick={handleActualizar}>Actualizar Alumno</button>
                <button type="button" className="link-cancelar" onClick={handleCancelar}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditarAlumno;
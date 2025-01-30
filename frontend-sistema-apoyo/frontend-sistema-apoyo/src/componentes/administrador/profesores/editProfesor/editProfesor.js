import React, { useEffect, useState } from "react";
import logo from "../../../../logo/LogoFinal.png";
import { useSearchParams, useNavigate, replace } from "react-router-dom";
import "./editProfesor.css";
import axios from "axios";

const niveles = {
    A1: 1,
    A2: 2,
    B1: 3,
    B2: 4,
    C1: 5,
    C2: 6,
};

export const EditarProfesor = ({ onUpdate }) => {
    const [searchParams] = useSearchParams(); // Obtén los parámetros de consulta
    const idusuario = searchParams.get("id"); // Extrae el idusuario
    const [email, setEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [nivel, setNivel] = useState("");
    const [contraseñaHash, setContraseñaHash] = useState("");
    const [mensajeActualizado, setMensajeActualizado] = useState("");

    const navigate = useNavigate();

    // Cargar los datos del profesor al montar el componente
    useEffect(() => {
        const cargarProfesor = async () => {
            if (!idusuario) {
            return;
            }

            try {
                console.log("El idusuario: ", idusuario);
                const response = await axios.get(
                    `http://localhost:5228/API/AdministradorProfesor/ProfesorID?id=${idusuario}`
                );
                console.log("Respuesta del servidor:", response.data);
                const profesor = response.data.value;

                // Verificar que profesor y nombrecompleto están definidos
                if (!profesor || !profesor.nombrecompleto) {
                    throw new Error("El profesor o el nombre completo no están definidos en la respuesta.");
                }

                const [nombre, apellido] = profesor.nombrecompleto.split(" ") || ["", ""];
                setNombre(nombre || "");
                setApellido(apellido || "");
                setEmail(profesor.correo || "");
                setContraseñaHash(profesor.contraseñaHash || "");
                setNivel(Object.keys(niveles).find(key => niveles[key] === profesor.idnivel) || "");
            } catch (error) {
                console.error("Error al cargar los datos del profesor:", error);
                alert(error.response?.data?.msg || "No se pudieron cargar los datos del profesor.");
            }
        };

        cargarProfesor();
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
                idrol: 1,
                contraseñaHash: contraseñaHash,
            };

            console.log("Datos del profesor actualizados: ", datosActualizados);

            const response = await axios.put(
                `http://localhost:5228/API/AdministradorProfesor/EditarporID?id=${idusuario}`,
                datosActualizados
            );

            console.log("Respuesta del servidor:", response.data);

            if (response.data.status) {
                setMensajeActualizado("Profesor actualizado con éxito.");
                setTimeout(() => setMensajeActualizado(""), 2000);
                console.log("Ejecutando onUpdate...");
                if (typeof onUpdate === "function") {
                    onUpdate();
                    console.log("Actualización finalizada.")
                }
                setTimeout(() => setMensajeActualizado(""), 2000);
            } else {
                alert(response.data.msg || "No se pudo actualizar el profesor.");
                
            }
        } catch (error) {
            console.error("Error al actualizar el profesor:", error);
        }
    };

    const handleCancelar = () => {
        navigate("../listaProfesores", {replace: true});
    }

    return (
        <div className="contenedor-principal">
            <img src={logo} alt="Logo" className="logo-img" />

            {mensajeActualizado && <div className="actualizado-message">{mensajeActualizado}</div>}

            <form onSubmit={handleActualizar} className="edit-form-prof">
                <h3>EDITAR PROFESOR</h3>

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

                <button type="submit" className="link-actualizar-prof" onClick={handleActualizar}>Actualizar Profesor</button>
                <button type="button" className="link-cancelar-prof" onClick={handleCancelar}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditarProfesor;
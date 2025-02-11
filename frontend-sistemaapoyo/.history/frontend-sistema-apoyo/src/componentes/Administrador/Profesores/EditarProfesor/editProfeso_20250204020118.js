import React, { useEffect, useState } from "react";
import logo from "../../../../logo/LogoInicio.png";
import { useSearchParams, useNavigate } from "react-router-dom";
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
        <div className="flex flex-col items-center">
            <img src={logo} alt="Logo" className="w-32 h-32 mb-6" />

            {mensajeActualizado && <div className="text-green-500 text-xl">{mensajeActualizado}</div>}

            <form onSubmit={handleActualizar} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h3 className="text-2xl font-semibold mb-4 text-center">EDITAR PROFESOR</h3>

                <label htmlFor="nombre" className="block text-lg mb-2">Nombre</label>
                <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    type="text"
                    id="nombre"
                    className="w-full p-2 border rounded-md mb-4"
                    placeholder={nombre || "Ejemplo: Juan"}
                />

                <label htmlFor="apellido" className="block text-lg mb-2">Apellido</label>
                <input
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    type="text"
                    id="apellido"
                    className="w-full p-2 border rounded-md mb-4"
                    placeholder={apellido || "Ejemplo: Pérez"}
                />

                <label htmlFor="email" className="block text-lg mb-2">Correo electrónico</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded-md mb-4"
                    placeholder={email || "Ejemplo: correo@dominio.com"}
                />

                <label htmlFor="nivel" className="block text-lg mb-2">Nivel</label>
                <select
                    id="nivel"
                    value={nivel}
                    onChange={(e) => setNivel(e.target.value)}
                    className="w-full p-2 border rounded-md mb-4"
                >
                    <option value="" disabled>Seleccione un nivel</option>
                    <option value="A1">A1: Principiante</option>
                    <option value="A2">A2: Básico</option>
                    <option value="B1">B1: Pre-intermedio</option>
                    <option value="B2">B2: Intermedio</option>
                    <option value="C1">C1: Intermedio-alto</option>
                    <option value="C2">C2: Avanzado</option>
                </select>

                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-1/2 mr-2" onClick={handleActualizar}>Actualizar Profesor</button>
                    <button type="button" className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 w-1/2" onClick={handleCancelar}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditarProfesor;

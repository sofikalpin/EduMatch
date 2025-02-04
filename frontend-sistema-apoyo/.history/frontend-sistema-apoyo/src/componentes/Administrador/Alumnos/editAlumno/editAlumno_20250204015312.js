import React, { useEffect, useState } from "react";
import logo from '../../../../logo/LogoInicio.png';
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

export const EditarAlumno = ({ onUpdate }) => {
    const [searchParams] = useSearchParams();
    const idusuario = searchParams.get("id");
    const [email, setEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [nivel, setNivel] = useState("");
    const [contraseñaHash, setContraseñaHash] = useState("");
    const [mensajeActualizado, setMensajeActualizado] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const cargarAlumno = async () => {
            if (!idusuario) return;

            try {
                const response = await axios.get(`http://localhost:5228/API/AdministradorAlumno/AlumnoID?id=${idusuario}`);
                const alumno = response.data.value;
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
                idusuario: parseInt(idusuario, 10),
                nombrecompleto: `${nombre.trim()} ${apellido.trim()}`,
                correo: email.trim(),
                idnivel: nivelId,
                idrol: 2,
                contraseñaHash: contraseñaHash,
            };

            const response = await axios.put(`http://localhost:5228/API/AdministradorAlumno/EditarporID?id=${idusuario}`, datosActualizados);

            if (response.data.status) {
                setMensajeActualizado("Alumno actualizado con éxito.");
                setTimeout(() => setMensajeActualizado(""), 2000);
                if (typeof onUpdate === "function") {
                    onUpdate();
                }
            } else {
                alert(response.data.msg || "No se pudo actualizar el alumno.");
            }
        } catch (error) {
            console.error("Error al actualizar el alumno:", error);
        }
    };

    const handleCancelar = () => {
        navigate("../listaAlumnos", { replace: true });
    };

    return (
        <div className="flex flex-col items-center p-6">
            <img src={logo} alt="Logo" className="w-32 h-32 mb-6" />

            {mensajeActualizado && <div className="text-green-500 mb-4">{mensajeActualizado}</div>}

            <form onSubmit={handleActualizar} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-center">EDITAR ALUMNO</h3>

                <label htmlFor="nombre" className="block text-sm font-medium mb-2">Nombre</label>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" id="nombre" className="w-full px-4 py-2 border rounded-md mb-4" />

                <label htmlFor="apellido" className="block text-sm font-medium mb-2">Apellido</label>
                <input value={apellido} onChange={(e) => setApellido(e.target.value)} type="text" id="apellido" className="w-full px-4 py-2 border rounded-md mb-4" />

                <label htmlFor="email" className="block text-sm font-medium mb-2">Correo electrónico</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="w-full px-4 py-2 border rounded-md mb-4" />

                <label htmlFor="nivel" className="block text-sm font-medium mb-2">Nivel</label>
                <select id="nivel" value={nivel} onChange={(e) => setNivel(e.target.value)} className="w-full px-4 py-2 border rounded-md mb-4">
                    <option value="" disabled>Seleccione un nivel</option>
                    {Object.keys(niveles).map((key) => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>

                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">Actualizar Alumno</button>
                    <button type="button" className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600" onClick={handleCancelar}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditarAlumno;
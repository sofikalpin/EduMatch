import React, { useState } from 'react';
import logo from '../../../../logo/LogoInicio.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const NuevoProfesor = () => {
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nivel, setNivel] = useState('');
    const [mensajeCreado, setMensajeCreado] = useState("");

    const navigate = useNavigate();
    
    const niveles = {
        A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6,
    };

    const handleRegistrar = async (e) => {
        e.preventDefault();
        
        if (!nombre || !apellido || !email || !clave || !nivel) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            const nivelId = niveles[nivel];
            const datosProfesor = {
                nombrecompleto: `${nombre.trim()} ${apellido.trim()}`,
                correo: email.trim(),
                contraseñaHash: clave.trim(),
                idnivel: nivelId,
                idrol: 1, 
            };

            const response = await axios.post("http://localhost:5228/API/AdministradorProfesor/CrearProfesor", datosProfesor);

            if (response.data.status) {
                setMensajeCreado("Profesor creado con éxito.");
                setTimeout(() => setMensajeCreado(""), 2000);
                setNombre(""); setApellido(""); setEmail(""); setClave(""); setNivel("");
            } else {
                alert(response.data.msg || "No se pudo crear el profesor.");
            }
        } catch (error) {
            console.error("Error al registrar profesor:", error);
            alert("Ocurrió un error al registrar el profesor. Por favor, intenta nuevamente.");
        }
    };

    const handleCancelar = () => {
        navigate("../listaProfesores", { replace: true });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <img src={logo} alt="Logo" className="w-32 mb-6" />
            {mensajeCreado && <div className="mb-4 text-green-600">{mensajeCreado}</div>}
            <form onSubmit={handleRegistrar} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h3 className="text-xl font-bold mb-4 text-center">REGISTRAR PROFESOR</h3>
                <label className="block font-semibold">Nombre</label>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    className="w-full p-2 border rounded mb-3" 
                    placeholder="Ejemplo: Juan" 
                />
                
                <label className="block font-semibold">Apellido</label>
                <input 
                    type="text" 
                    value={apellido} 
                    onChange={(e) => setApellido(e.target.value)} 
                    className="w-full p-2 border rounded mb-3" 
                    placeholder="Ejemplo: Pérez" 
                />
                
                <label className="block font-semibold">Correo electrónico</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full p-2 border rounded mb-3" 
                    placeholder="Ejemplo: correo@dominio.com" 
                />
                
                <label className="block font-semibold">Contraseña</label>
                <input 
                    type="password" 
                    value={clave} 
                    onChange={(e) => setClave(e.target.value)} 
                    className="w-full p-2 border rounded mb-3" 
                    placeholder="Contraseña segura" 
                />
                
                <label className="block font-semibold">Nivel</label>
                <select 
                    value={nivel} 
                    onChange={(e) => setNivel(e.target.value)} 
                    className="w-full p-2 border rounded mb-3"
                >
                    <option value="" disabled>Seleccione un nivel</option>
                    <option value="A1">A1: Principiante</option>
                    <option value="A2">A2: Básico</option>
                    <option value="B1">B1: Pre-intermedio</option>
                    <option value="B2">B2: Intermedio</option>
                    <option value="C1">C1: Intermedio-alto</option>
                    <option value="C2">C2: Avanzado</option>
                </select>
                
                <button 
                    type="submit" 
                    className="w-full bg-[#00A89F] text-white p-2 rounded hover:bg-opacity-90"
                >
                    Crear Profesor
                </button>
                <button 
                    type="button" 
                    onClick={handleCancelar} 
                    className="w-full bg-gray-300 text-black p-2 rounded mt-2 hover:bg-gray-400"
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
};

export default NuevoProfesor;
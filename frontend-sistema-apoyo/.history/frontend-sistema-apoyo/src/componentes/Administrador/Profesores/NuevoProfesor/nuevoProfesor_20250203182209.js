import React, { useState } from "react";
import logo from "../../../../logo/LogoInicio.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const NuevoProfesor = () => {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nivel, setNivel] = useState('');
  const [rol, setRol] = useState('profesor'); // Valor por defecto como 'profesor'
  const [mensajeCreado, setmensajeCreado] = useState("");

  const navigate = useNavigate();

  const niveles = {
    A1: 1,
    A2: 2,
    B1: 3,
    B2: 4,
    C1: 5,
    C2: 6,
  };

  const cancelar = () => {
    navigate("../listaProfesores", { replace: true })
  }

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
        idrol: 1, // Rol fijo para profesores
      };

      console.log("Datos del profesor:", datosProfesor);

      const response = await axios.post(
        "http://localhost:5228/API/AdministradorProfesor/CrearProfesor",
        datosProfesor
      );

      if (response.data.status) {
        setmensajeCreado("Profesor creado con éxito.");
        setTimeout(() => setmensajeCreado(""), 2000); // Limpiar mensaje después de 3 segundos
        // Reiniciar Formulario
        setNombre("");
        setApellido("");
        setEmail("");
        setClave("");
        setNivel("");
      } else {
        alert(response.data.msg || "No se pudo crear el profesor.");
      }
    } catch (error) {
      console.error("Error al registrar profesor:", error);
      alert("Ocurrió un error al registrar el profesor. Por favor, intenta nuevamente.");
    }
  }

  return (
    <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">
      <img src={logo} alt="Logo" className="w-32 mb-6" />
      
      {mensajeCreado && <div className="bg-green-500 text-white p-2 rounded mb-4">{mensajeCreado}</div>}
      
      <form onSubmit={handleRegistrar} className="w-full max-w-sm">
        <h3 className="text-xl font-bold text-center mb-6">REGISTRAR PROFESOR</h3>
        
        <label htmlFor="rol" className="block text-gray-700 mb-2">Tipo de Usuario</label>
        <select 
          id="rol" 
          value={rol} 
          onChange={(e) => setRol('profesor')} 
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="profesor">Profesor</option>
        </select>

        <label htmlFor="nombre" className="block text-gray-700 mb-2">Nombre</label>
        <input 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          type="text" 
          id="nombre" 
          name="nombre" 
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Ejemplo: Juan" 
        />

        <label htmlFor="apellido" className="block text-gray-700 mb-2">Apellido</label>
        <input 
          value={apellido} 
          onChange={(e) => setApellido(e.target.value)} 
          type="text" 
          id="apellido" 
          name="apellido" 
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Ejemplo: Pérez" 
        />

        <label htmlFor="email" className="block text-gray-700 mb-2">Correo electrónico</label>
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded mb-4" 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Ejemplo: correo@dominio.com" 
        />

        <label htmlFor="clave" className="block text-gray-700 mb-2">Contraseña</label>
        <input 
          value={clave} 
          onChange={(e) => setClave(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded mb-4" 
          type="password" 
          id="clave" 
          name="clave"
          placeholder="Contraseña segura"  
        />

        <label htmlFor="nivel" className="block text-gray-700 mb-2">Nivel</label>
        <select 
          id="nivel" 
          value={nivel} 
          onChange={(e) => setNivel(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="" disabled>Seleccione un nivel</option>
          <option value="A1">A1: Principiante</option>
          <option value="A2">A2: Básico</option>
          <option value="B1">B1: Pre-intermedio</option>
          <option value="B2">B2: Intermedio</option>
          <option value="C1">C1: Intermedio-alto</option>
          <option value="C2">C2: Avanzado</option>
        </select>

        <div className="flex justify-between mt-6">
          <button type="submit" className="w-48 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Crear Profesor</button>
          <button type="button" className="w-48 p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200" onClick={cancelar}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default NuevoProfesor;

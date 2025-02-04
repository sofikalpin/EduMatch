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
  const [rol, setRol] = useState('profesor');
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
        idrol: 1,
      };

      console.log("Datos del profesor:", datosProfesor);

      const response = await axios.post(
        "http://localhost:5228/API/AdministradorProfesor/CrearProfesor",
        datosProfesor
      );

      if (response.data.status) {
        setmensajeCreado("Profesor creado con éxito.");
        setTimeout(() => setmensajeCreado(""), 2000);
        
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-blue-500 p-6 text-center">
          <img src={logo} alt="Logo" className="mx-auto w-24 h-24 object-contain mb-4" />
          <h3 className="text-2xl font-bold text-white">REGISTRAR PROFESOR</h3>
        </div>
        
        {mensajeCreado && (
          <div className="bg-green-500 text-white text-center p-3 animate-pulse">
            {mensajeCreado}
          </div>
        )}
        
        <form onSubmit={handleRegistrar} className="p-6 space-y-4">
          <div>
            <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Usuario
            </label>
            <select 
              id="rol" 
              value={rol} 
              onChange={(e) => setRol('profesor')} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="profesor">Profesor</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                type="text" 
                id="nombre" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Juan" 
              />
            </div>
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">
                Apellido
              </label>
              <input 
                value={apellido} 
                onChange={(e) => setApellido(e.target.value)} 
                type="text" 
                id="apellido" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Pérez" 
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              id="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="correo@dominio.com" 
            />
          </div>

          <div>
            <label htmlFor="clave" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input 
              value={clave} 
              onChange={(e) => setClave(e.target.value)} 
              type="password" 
              id="clave" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contraseña segura"  
            />
          </div>

          <div>
            <label htmlFor="nivel" className="block text-sm font-medium text-gray-700 mb-2">
              Nivel
            </label>
            <select 
              id="nivel" 
              value={nivel} 
              onChange={(e) => setNivel(e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Seleccione un nivel</option>
              <option value="A1">A1: Principiante</option>
              <option value="A2">A2: Básico</option>
              <option value="B1">B1: Pre-intermedio</option>
              <option value="B2">B2: Intermedio</option>
              <option value="C1">C1: Intermedio-alto</option>
              <option value="C2">C2: Avanzado</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
              Crear Profesor
            </button>
            <button 
              type="button" 
              onClick={cancelar} 
              className="w-full py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-300 shadow-md"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoProfesor;
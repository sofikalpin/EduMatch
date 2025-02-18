import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom'; 
import logo from '../../logo/LogoInicio.png';
import axios from 'axios';
import { useUser } from "../../context/userContext.js";
import HeaderForo from './HeaderForo.js';


const socialIcons = [
  { name: 'Facebook', color: 'hover:text-blue-500' },
  { name: 'Instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', color: 'hover:text-blue-400' },
  { name: 'Youtube', color: 'hover:text-red-500' },
  { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const NuevaConsulta = () => {
  const { user } = useUser();
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); 
  const idusuario = user?.idUsuario;
  const idForo = 5;

  const hadleNuevaConsulta = async(e) => {
    e.preventDefault();

    setLoading(true);
    
    if ( !titulo || !contenido ){
        alert("Todos los campos son obligatorios");
        setLoading(false);
        return;
    }

    if (titulo.length < 5) {
        setMensaje({ tipo: "error", texto: "El nombre debe tener al menos 5 caracteres." });
        setLoading(false);
        return;
    }
      
    if (contenido.length < 10) {
        setMensaje({ tipo: "error", texto: "La descripción debe tener al menos 10 caracteres." });
        setLoading(false);
        return;
    }
    

    try {
        const datosConsulta = {
          idconsulta: 0 ,
          titulo:  titulo.trim(),
          contenido: contenido.trim(),
          idusuario: idusuario,
          idForo: idForo,
          fechahora: new Date().toISOString(),
        };

        console.log("Datos de la consulta:", datosConsulta);

        const response = await axios.post(
          "http://localhost:5228/API/Consulta/CrearConsulta",
          datosConsulta
        );

        console.log("Consulta creada");

        if (response?.status === 200)
        {
          setMensaje("Consulta creado con éxito. Redirigiendo...");
          setTimeout(() => navigate("/consulta"), 2000);
          setTitulo("");
          setContenido("");
        }
        else{
          alert(response?.data?.msg || "No se pudo crear la consulta.");
        }

    }catch (error){
      console.error("Error al registrar la consulta:", error);
      alert("Ocurrió un error al registrar la consulta. Por favor, intenta nuevamente.");

    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">

      <HeaderForo />

      <div className="w-full max-w-3xl px-6 py-10">
        <button 
           onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition font-medium mb-6"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver al foro</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Nueva Consulta</h2>
        
        {mensaje && <p className="text-center text-red-500">{mensaje}</p>}
        {loading}

        <form onSubmit={hadleNuevaConsulta} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo" className="text-lg font-semibold text-gray-800">
              Título
            </label>
            <input 
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-sm bg-white"
              placeholder="Escribe un título descriptivo"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contenido" className="text-lg font-semibold text-gray-800">
              Contenido
            </label>
            <textarea 
              id="contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-sm bg-white min-h-[150px]"
              placeholder="Describe tu contenido en detalle"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 shadow-md transition-all duration-300"
          >
            <Send className="w-6 h-6" />
            Publicar Consulta
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default NuevaConsulta;

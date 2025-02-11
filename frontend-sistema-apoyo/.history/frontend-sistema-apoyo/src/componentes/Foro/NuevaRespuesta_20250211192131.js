import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom'; 
import logo from '../../logo/LogoInicio.png';
import axios from 'axios';
import { useUser } from "../../context/userContext.js";


const socialIcons = [
  { name: 'Facebook', color: 'hover:text-blue-500' },
  { name: 'Instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', color: 'hover:text-blue-400' },
  { name: 'Youtube', color: 'hover:text-red-500' },
  { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const NuevaRespuesta = () => {
  //const { idConsulta } = useParams();
  const { user } = useUser();
  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); 

  const idusuario = user?.idUsuario;
  const idconsulta = 6;

  const hadleNuevaRespuesta = async(e) => {
    e.preventDefault();

    setLoading(true);
    
    if (!contenido ){
        alert("Todos los campos son obligatorios");
        setLoading(false);
        return;
    }
      
    if (contenido.length < 10) {
        setMensaje({ tipo: "error", texto: "El contenido de la respuesta debe tener al menos 10 caracteres." });
        setLoading(false);
        return;
    }
    

    try {
        const datosRespuesta = {
          idrespuesta: 0 ,
          contenido: contenido.trim(),
          idusuario: idusuario,
          idconsulta: idconsulta,
          fechahora: new Date().toISOString(),
        };

        console.log("Datos de la respuesta:", datosRespuesta);

        const response = await axios.post(
          "http://localhost:5228/API/Respuesta/CrearRespuesta",
          datosRespuesta
        );

        console.log("Respuesta creada");

        if (response?.status === 200)
        {
          setMensaje("Respuesta creada con éxito. Redirigiendo...");
          setTimeout(() => navigate("/:idConsulta"), 2000);
          setContenido("");
        }
        else{
          alert(response?.data?.msg || "No se pudo crear la respuesta.");
        }

    }catch (error){
      console.error("Error al registrar la respuesta:", error);
      alert("Ocurrió un error al registrar la respuesta. Por favor, intenta nuevamente.");

    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">

      <div className="flex-grow flex flex-col items-center justify-center p-6 mb-16">
        <button 
           onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver a las respuestas</span>
        </button>

        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Nueva Respuesta</h2>
        
        {mensaje}
        {loading}

        <form onSubmit={hadleNuevaRespuesta} className="w-full max-w-3xl space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="contenido" className="text-lg font-semibold text-gray-800">
            </label>
            <textarea 
              id="contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-sm bg-white min-h-[150px]"
              placeholder="Describe tu respuesta en detalle..."
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 shadow-md transition-all duration-300"
          >
            <Send className="w-6 h-6" />
            Publicar Respuesta
          </button>
        </form>
      </div>
    </div>
  );
};

export default NuevaRespuesta;
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';  // Importa el hook de navegación
import axios from 'axios';
import { useUser } from "../../context/userContext.js";
import HeaderForo from './HeaderForo.js';


const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Respuesta = () => {
  const { user } = useUser();
  
  const location = useLocation();
  const navigate = useNavigate();

  const [consulta, setConsulta] = useState(null);
  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const iniciales = (name) => {
    if (!name) return "";
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();
  };
  
  
  useEffect(() => {
    if (location.state){
      setConsulta(location.state.consulta);
    }
  }, [location.state])
  console.log(location.state.consulta);

  const idusuario = user?.idUsuario;
  const idconsulta = consulta?.idconsulta;

  const nombreConsulta = consulta?.titulo;

  const hadleNuevaRespuesta = async(e) => {
    e.preventDefault();

    setLoading(true);
    
    if (!contenido ){
        alert("Todos los campos son obligatorios");
        setLoading(false);
        return;
    }
      
    if (contenido.length < 10) {
        setMensaje("El contenido de la respuesta debe tener al menos 10 caracteres.");
        setLoading(false);
        return;
    }

    if (!idconsulta || !idusuario) {
      setMensaje({ tipo: "error", texto: "No se pudo obtener la información del usuario o la consulta." });
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
          setTimeout(() => navigate("-1"), 2000);
          setContenido("");
        }
        else{
          alert(response?.data?.msg || "No se pudo crear la respuesta.");
        }

    } catch (error) {
        console.error("Error al registrar la respuesta:", error.response?.data || error.message);
        setMensaje("Ocurrió un error al registrar la respuesta. Por favor, intenta nuevamente.");
    
    } finally{
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* HeaderForo ocupa todo el ancho de la pantalla */}
      <HeaderForo />
      {/* Contenido principal adaptado a toda la pantalla */}
      <div className="flex-1 container mx-auto p-6 mb-16">
        <button
           onClick={() => navigate(-1)} // Llama a la función onBack
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver a respuestas</span>
        </button>

        {/* Contenedor blanco para la pregunta y la respuesta */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-16">
          {/* Pregunta */}
          <Card className="mb-6">
            <CardContent className="text-gray-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {iniciales(user.nombreCompleto)}
                </div>
                <div>
                  <h3 className="text-xl text-gray-900">{user.nombreCompleto || 'Usuario'}</h3>
                </div>
              </div>
              <p className="text-lg leading-relaxed font-bold">Consulta: {nombreConsulta}</p>
            </CardContent>
          </Card>

          {mensaje}
          {loading}

          {/* Formulario de respuesta */}
          <Card>
          <form onSubmit={hadleNuevaRespuesta} className="w-full max-w space-y-6">
            <CardContent className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-left">Tu Respuesta</h2>

              <textarea 
              id="contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-sm bg-white min-h-[150px]"
              placeholder="Describe tu respuesta en detalle..."
              />

              <button type="submit" className="inline-flex items-center gap-3 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg">
                <Send className="w-5 h-5" />
                <span>Enviar Respuesta</span>
              </button>
            </CardContent>
          </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Respuesta;

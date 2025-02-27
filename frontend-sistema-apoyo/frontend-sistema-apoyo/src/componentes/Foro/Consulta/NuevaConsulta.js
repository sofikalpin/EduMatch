import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { useUser } from "../../../Context/UserContext.js";
import axiosInstance from "../../../AxiosConfig/AxiosConfig.js";
import Header from "../../inicio/Componentes/Header.js";


const NuevaConsulta = () => {
  const { user } = useUser();
  const { idForo } = useParams(); 
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); 
  const idusuario = user?.idusuario;

  const handleNuevaConsulta = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);

    if (!titulo.trim() || !contenido.trim()) {
        setMensaje({ tipo: "error", texto: "Todos los campos son obligatorios." });
        setLoading(false);
        return;
    }

    if (titulo.length < 5) {
        setMensaje({ tipo: "error", texto: "El título debe tener al menos 5 caracteres." });
        setLoading(false);
        return;
    }
      
    if (contenido.length < 10) {
        setMensaje({ tipo: "error", texto: "El contenido debe tener al menos 10 caracteres." });
        setLoading(false);
        return;
    }
    
    try {
        const datosConsulta = {
          idconsulta: 0,
          titulo: titulo.trim(),
          contenido: contenido.trim(),
          idusuario: idusuario,
          idForo: parseInt(idForo), 
          fechahora: new Date().toISOString(),
        };

        console.log("Datos de la consulta:", datosConsulta);

        const response = await axiosInstance.post("Consulta/CrearConsulta", datosConsulta);

        if (response?.status === 200) {
          setMensaje({ tipo: "success", texto: "Consulta creada con éxito." });
          setTimeout(() => navigate(-1), 1000);
          setTitulo("");
          setContenido("");
        } else {
          setMensaje({ tipo: "error", texto: response?.data?.msg || "No se pudo crear la consulta." });
        }

    } catch (error) {
      console.error("Error al registrar la consulta:", error);
      setMensaje({ tipo: "error", texto: "Ocurrió un error al registrar la consulta. Intenta nuevamente." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Header />

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
          
          {mensaje && (
            <p className={`text-center font-medium ${mensaje.tipo === "error" ? "text-red-500" : "text-green-500"}`}>
              {mensaje.texto}
            </p>
          )}

          {loading && <p className="text-center text-gray-500">Publicando consulta...</p>}

          <form onSubmit={handleNuevaConsulta} className="space-y-6">
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
              disabled={loading}
            >
              <Send className="w-6 h-6" />
              {loading ? "Publicando..." : "Publicar Consulta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NuevaConsulta;

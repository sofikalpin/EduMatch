import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, ChevronRight } from "lucide-react";
import logo from "../../logo/LogoInicio.png";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';


const Consulta = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [consulta, setConsulta] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!consulta && location.state){
      setConsulta(location.state.consulta);
    }
  }, [location.state])

  useEffect(() => {
    const cargarRespuestas = async () => {
      try {
        setLoading(true);
        setError("");
        const respuesta = await axios.get(`http://localhost:5228/API/Consulta/ListaRespuestasDeConsulta?consultaId=${consulta.idconsulta}`);
        if(respuesta.data.status && Array.isArray(respuesta.data.value)){
          setRespuestas(respuesta.data.value);
          console.log("Respuestas: ", respuesta.data.value);
        } else {
          console.error("Error al cargar las repuestas del la consulta " + respuesta.data.message);
          setError(respuesta.data.message);
        }
      } catch (error) {
        console.error("Error al obtener las respuestas: ", error);
        setError("No se pudieron cargar las respuestas.");
      } finally {
        setLoading(false);
      }
    };  

    cargarRespuestas();
  }, [consulta]);

  const handleNuevaRespuesta = () => {
    navigate("/crear-respuesta", {state: {consulta}});
  };

  if (loading) return <p className="text-center text-gray-500">Cargando respuestas de consulta...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
      >
      <ArrowLeft className="w-6 h-6" />
      <span>Volver a las consultas</span>
      </button>

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-32">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            {`Consulta: ${consulta.titulo}` || "Consulta sin titulo"} 
          </h1> 
          
          <button
            onClick={() => handleNuevaRespuesta()}
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Respuesta</span>
          </button>
        </div>

        <div className="space-y-6">
          {respuestas.length === 0 ? (
            <p className="text-center text-gray-500">La consulta seleccionada no posee respuestas disponibles.</p>
          ) : (
            <ul>
              {
                respuestas.map((respuesta) => (
                  <li key={respuesta.idrespuesta} className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800">
                        <p>{respuesta.contenido}</p>
                      </span>
                    </div>
                  </li>
                ))
              }
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Consulta;
import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import logo from "../../logo/LogoInicio.png";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';


const socialIcons = [
  { name: 'Facebook', color: 'hover:text-blue-500' },
  { name: 'Instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', color: 'hover:text-blue-400' },
  { name: 'Youtube', color: 'hover:text-red-500' },
  { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const Consulta = () => {
  const { idConsulta } = useParams();
  const [consulta, setConsulta] = useState({});
  const [respuestas, setRespuestas] = useState([]);
  const [loadingConsulta, setLoadingConsulta] = useState(true);
  const [loadingRespuestas, setloadingRespuestas] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const cargarRespuestas = async () => {
      try {
        setloadingRespuestas(true);
        setError("");
        const respuesta = await axios.get(`http://localhost:5228/API/Consulta/ListaRespuestasDeConsulta?consultaId=${idConsulta}`);
        setRespuestas(respuesta.data.value); 
      } catch (error) {
        console.error("Error al obtener las consultas: ", error);
        setError("No se pudieron cargar las consultas.");
      } finally {
        setloadingRespuestas(false);
      }
    };  

    if (idConsulta) {
      cargarRespuestas();
    }
  }, [idConsulta]);

  useEffect(() => {
    const cargaDatosConsulta = async () => {
      try {
        setLoadingConsulta(true);
        setError("");
        const datosConsulta = await axios.get(`http://localhost:5228/API/Consulta/ConsultaID?id=${idConsulta}`);
        setConsulta(datosConsulta.data.value);
      } catch (error) {
        console.error("Error al obtener la consulta elegida: ", error);
        setError("No se pudieron cargar los datos de la consulta.");
      } finally {
        setLoadingConsulta(false);
      }
    };

    if (idConsulta) {
      cargaDatosConsulta();
    }
  }, [idConsulta]);

  const handleNuevaRespuesta = () => {
    navigate(`/crear-respuesta/${idConsulta}`);
  };

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
            {loadingConsulta ? "Cargando consulta..." : `Consulta: ${consulta.titulo}` || "Consulta sin titulo"} 
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
          {loadingRespuestas ? (
            <p className="text-center text-gray-500">Cargando respuestas...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (respuestas && respuestas.length === 0) ? (
            <p className="text-center text-gray-500">La consulta seleccionada no posee respuestas disponibles.</p>
          ) : (
            <ul>
              {respuestas && respuestas.map((respuesta) => (
                <li key={respuesta.idrespuesta} className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800">
                      {respuesta.contenido}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Consulta;
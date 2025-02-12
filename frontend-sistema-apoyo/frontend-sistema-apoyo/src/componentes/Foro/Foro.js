import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, ChevronRight } from "lucide-react";
import logo from "../../logo/LogoInicio.png"; 
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

const Foro = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [foro, setForo] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!foro && location.state) {
      setForo(location.state.foro);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchConsultas = async () => {

      setLoading(true);
      setError("");
      
      try {
        const respuesta = await axios.get(`http://localhost:5228/API/Foro/ConsultasForo?idForo=${foro.idforo}`);
        if(respuesta.data.status && Array.isArray(respuesta.data.value)){
          setConsultas(respuesta.data.value);
          console.log("Consultas: ", respuesta.data.value);
        } else {
          console.error("Error al cargar las consultas del foro " + respuesta.data.message);
          setError(respuesta.data.message);
        }
      } catch (err) {
        console.error("Error al cargar las consultas: ", error);
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setConsultas([]);
      }finally{
        setLoading(false);
      }
    };

    fetchConsultas();
  }, [foro]);

  const handleNuevaConsulta = () => {
    navigate(`/crear-consulta/${foro.idforo}`);
  };

  if (loading) return <p className="text-center text-gray-500">Cargando consultas de foro...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
      >
        <ArrowLeft className="w-6 h-6" />
        <span>Volver a la lista de foros</span>
      </button>

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-32">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            {`Foro: ${foro?.nombre || "Sin título"}`}
          </h1> 
          <button
            onClick={() => handleNuevaConsulta()}
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Consulta</span>
          </button>
        </div>

        <div className="space-y-6">
          {consultas.length === 0 ? (
              <p className="text-center text-gray-500">El foro seleccionado no posee consultas disponibles.</p>
            ) : (
              <ul>
                {consultas.map((consulta) => (
                  <li key={consulta.idconsulta} className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800">
                        <strong>{consulta.titulo}</strong><br />
                        {consulta.contenido}
                      </span>
                      <button 
                        onClick={() => navigate("/consulta", { state: {consulta}})} 
                        className="text-teal-600 hover:text-teal-800"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
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

export default Foro;

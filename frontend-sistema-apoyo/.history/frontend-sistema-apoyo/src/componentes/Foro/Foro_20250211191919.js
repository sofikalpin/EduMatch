import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, ChevronRight } from "lucide-react";
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

const Foro = () => {
  const { idForo } = useParams();
  const [foro, setForo] = useState({});
  const [consultas, setConsultas] = useState([]);
  const [loadingConsultas, setLoadingConsultas] = useState(true);
  const [loadingForo, setLoadingForo] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const cargarConsultas = async () => {
      try {
        setLoadingConsultas(true);
        setError("");
        const respuesta = await axios.get(`http://localhost:5228/API/Foro/ConsultasForo?idForo=${idForo}`);
        setConsultas(respuesta.data.value); 
      } catch (error) {
        console.error("Error al obtener las consultas: ", error);
        setError("No se pudieron cargar las consultas.");
      } finally {
        setLoadingConsultas(false);
      }
    };  

    if (idForo) {
      cargarConsultas();
    }
  }, [idForo]);

  useEffect(() => {
    const cargaDatosForo = async () => {
      try {
        setLoadingForo(true);
        setError("");
        const datosForo = await axios.get(`http://localhost:5228/API/Foro/ForoID?id=${idForo}`);
        setForo(datosForo.data.value);
      } catch (error) {
        console.error("Error al obtener el foro elegido: ", error);
        setError("No se pudieron cargar los datos del foro.");
      } finally {
        setLoadingForo(false);
      }
    };

    if (idForo) {
      cargaDatosForo();
    }
  }, [idForo]);

  const handleNuevaConsulta = () => {
    navigate(`/crear-consulta/${idForo}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
       <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
                      <img 
                          src={logo} 
                          alt="Logo" 
                          className="h-12 w-auto cursor-pointer" 
                          onClick={() => navigate(-1)} // Redirigir a la página anterior
                      />
                      <h1 className="text-2xl font-bold text-gray-900 flex-1 text-center">Foros</h1>
                      <button
                          onClick={handleNuevoForo}
                          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full transition"
                      >
                          <Plus className="w-5 h-5" />
                          <span>Nuevo Foro</span>
                      </button>
                  </header>
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
            {loadingForo ? "Cargando foro..." : `Foro: ${foro.nombre || "Sin título"}`}
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
          {loadingConsultas ? (
            <p className="text-center text-gray-500">Cargando consultas...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : consultas.length === 0 ? (
            <p className="text-center text-gray-500">El foro seleccionado no posee consultas disponibles.</p>
          ) : (
            <ul>
              {consultas.map((consulta) => (
                <li key={consulta.idConsulta} className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800">
                      <strong>{consulta.titulo}</strong><br />
                      {consulta.contenido}
                    </span>
                    <button 
                      onClick={() => navigate(`/consulta/${consulta.idConsulta}`)} 
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

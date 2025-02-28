import { useEffect, useState } from "react";
import axios from "axios";
import HeaderForo from "../HeaderForo";
import { Plus, ChevronRight, User } from "lucide-react";
import FooterForo from "../FooterForo";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../../Context/UserContext";
import { ArrowLeft } from 'lucide-react';

const Consulta = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useUser();
  
  const [consulta, setConsulta] = useState(null);
  const [usuario, setUsuario] = useState([]);
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
        if (!consulta) return;

        setLoading(true);
        setError("");

        const respuesta = await axios.get(`http://localhost:5228/API/Consulta/ListaRespuestasDeConsulta?consultaId=${consulta.idconsulta}`);
        
        if(respuesta.data.status && Array.isArray(respuesta.data.value)){
          setRespuestas(respuesta.data.value);
          console.log("Respuestas: ", respuesta.data.value);

          const idUsuario = new Set();
          respuesta.data.value.forEach(respuesta => {
            idUsuario.add(respuesta.idusuario);
          });

          const usuarioDatos = await Promise.all(
            [...idUsuario].map(async (id) => {
              const usuarioResp = await axios.get(
                `http://localhost:5228/API/Usuario/BuscarUsuario?idUsuario=${id}`
              );
              return { id, ...usuarioResp.data.value };
            })
          );

          const usuarioMap = {};
          usuarioDatos.forEach(usuario => {
            usuarioMap[usuario.id] = usuario;
          })
          setUsuario(usuarioMap);
          console.log(usuarioMap);

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
    if (!consulta) return;

    if (user.idnivel < consulta.nivel) {
      error("Su nivel es menor al nivel necesario para participar en la consulta.");
      return;
    } else {
      navigate("/crear-respuesta", {state: {consulta}});
    }
  };

  if (loading) return <p className="text-center text-gray-500">Cargando respuestas de consulta...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const nivelColores = {
    "1": "bg-green-200 text-green-800",
    "2": "bg-blue-200 text-blue-800",
    "3": "bg-yellow-200 text-yellow-800",
    "4": "bg-orange-200 text-orange-800",
    "5": "bg-red-200 text-red-800",
    "6": "bg-purple-200 text-purple-800",
  }
  
  const niveles = {
    "1": "A1: Principiante",
    "2": "A2: Básico",
    "3": "B1: Pre-intermedio",
    "4": "B2: Intermedio",
    "5": "C1: Intermedio-alto",
    "6": "C2: Avanzado",
  }

  return (
    <div className="h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col">
      <HeaderForo/>

      <main className="flex-grow w-full max-w-3xl px-6 py-10 mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
          >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver a las consultas</span>
          </button>


          <div className={`p-6 rounded-lg border bg-pink-100 text-gray-700 border-gray-300" shadow-md`}>
            <h1 className="text-3xl font-bold">{`Consulta: ${consulta?.titulo || "Sin título"}`}</h1>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNuevaRespuesta}
              disabled={user.idnivel < consulta?.idnivel}
              className={`flex items-center gap-2 py-2 px-6 rounded-full text-lg transition-all shadow-md
                ${user.idnivel < consulta?.idnivel
                  ? "bg-gray-400 cursor-not-allowed text-gray-200" 
                  : "bg-green-500 text-white hover:bg-green-600"}
              `}
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Respuesta</span>
            </button>
          </div>

        <div className="mt-6 space-y-4">
          {respuestas.length === 0 ? (
            <p className="text-center text-gray-500">La consulta seleccionada no posee respuestas disponibles.</p>
          ) : (
            respuestas.map((respuesta) => {

              let nombreUsuario = usuario[respuesta.idusuario]?.nombrecompleto || "Usuario";
              let nivelUsuario = usuario[respuesta.idusuario]?.idnivel;
              let nivelUsuarioTexto = niveles[nivelUsuario] || "Nivel desconocido";

              return (
                <div key={respuesta.idrespuesta} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-gray-500" />
                      <span className="font-semibold text-gray-700">{nombreUsuario}</span>
                      <span className={`text-xs font-medium py-1 px-2 rounded-full ${nivelColores[nivelUsuario] || "bg-gray-200 text-gray-700"}`}>
                        {nivelUsuarioTexto}
                      </span>
                    </div>
                    <div>
                    <p className="text-sm text-gray-600 mt-1 text-left">{respuesta.contenido}</p>
                    </div>
                  </div>
              )
            })
          )}
        </div>
      </main>
        < FooterForo />
    </div>
  );
};

export default Consulta;
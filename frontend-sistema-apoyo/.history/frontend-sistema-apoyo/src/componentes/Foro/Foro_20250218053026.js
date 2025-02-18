import { useEffect, useState } from "react";
import axios from "axios";
import HeaderForo from "./HeaderForo.js";
import { Plus, ChevronRight, User } from "lucide-react";
import logo from "../../logo/LogoInicio.png"; 
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/userContext.js";
import FooterForo from "./FooterForo.js"
import { ArrowLeft } from 'lucide-react';

const Foro = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useUser();

  const [foro, setForo] = useState(null);
  const [usuario, setUsuario] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const iniciales = (name) => {
    if (!name) return "";
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();
  };

  useEffect(() => {
    if (!foro && location.state) {
      setForo(location.state.foro);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchConsultas = async () => {
      if (!foro) return;

      setLoading(true);
      setError("");
      
      try {
        const respuesta = await axios.get(`http://localhost:5228/API/Foro/ConsultasForo?idForo=${foro.idforo}`)
      
        if (Array.isArray(respuesta.data.value)) {  
          console.log(respuesta.data.value)
          setConsultas(respuesta.data.value);

          const idUsuario = new Set();
          respuesta.data.value.forEach(consulta => {
            idUsuario.add(consulta.idusuario);
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
          console.error("La respuesta de la API no contiene una lista de consultas:", respuesta.data);
          setError("La respuesta del servidor no es válida.");
        }

      } catch (err) {
        console.error("Error al cargar las consultas: ", err);
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setConsultas([]);  
      }finally{
        setLoading(false);
      }
    };

    fetchConsultas();
  }, [foro]);

  const handleNuevaConsulta = () => {
    if (!foro) return;

    if ( user.nivel < foro.nivel ){
      error("Su nivel es menor al nivel necesario para participar en el foro.");
      return;
    } else {
      navigate(`/crear-consulta/${foro.idforo}`);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Cargando consultas de foro...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col">

      <HeaderForo/>

      <main className="flex-grow w-full max-w-3xl px-6 py-10 mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition font-medium mb-6"
        >
        <ArrowLeft className="w-5 h-5" />
        <span>Volver a la lista de foros</span>
      </button>


        <div className={`p-6 rounded-lg border ${nivelColores[foro?.idnivel] || "bg-gray-100 text-gray-700 border-gray-300"} shadow-md`}>
          <h1 className="text-3xl font-bold">{`Foro: ${foro?.nombre || "Sin título"}`}</h1>
          <p className="text-sm mt-2">{niveles[foro.idnivel?.toString()] || "Desconocido"}</p>
        </div>
        <div className="mt-6 flex justify-end">
        <button
          onClick={handleNuevaConsulta}
          disabled={user.nivel < foro?.nivel}
          className={`flex items-center gap-2 py-2 px-6 rounded-full text-lg transition-all shadow-md
            ${user.nivel < foro?.nivel
              ? "bg-gray-400 cursor-not-allowed text-gray-200" 
              : "bg-green-500 text-white hover:bg-green-600"}
          `}
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Consulta</span>
        </button>
      </div>
        <div className="mt-6 space-y-4">
          {consultas.length === 0 ? (
              <p className="text-center text-gray-500">El foro seleccionado no posee consultas disponibles.</p>
            ) : (
                consultas.map((consulta) => {

                  let nombreUsuario = usuario[consulta.idusuario]?.nombrecompleto || "Usuario";
                  let nivelUsuario = usuario[consulta.idusuario]?.idnivel;
                  let nivelUsuarioTexto = niveles[nivelUsuario] || "Nivel desconocido";


                  return (
                  <div key={consulta.idconsulta} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-gray-500" />
                      <span className="font-semibold text-gray-700">{nombreUsuario}</span>
                      <span className={`text-xs font-medium py-1 px-2 rounded-full ${nivelColores[nivelUsuario] || "bg-gray-200 text-gray-700"}`}>
                        {nivelUsuarioTexto}
                      </span>
                    </div>
                    <h2 className="font-semibold text-lg text-gray-800 text-left">{consulta.titulo}</h2>
                    <p className="text-sm text-gray-600 mt-1 text-left">{consulta.contenido}</p>
                    <div className="mt-2 text-right">
                      <button 
                        onClick={() => navigate("/consulta", { state: { consulta } })} 
                        className="text-teal-600 hover:text-teal-800 flex items-center gap-1"
                      >
                        Ver más <ChevronRight className="w-4 h-4" />
                      </button>
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

export default Foro;

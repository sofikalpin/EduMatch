import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";  
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";  
import actividadImg from "../Imagenes/actividad.jpg";
import axios from "axios";
import { useUser } from "../../../context/userContext";

const Actividad = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [opcionCreacion, setOpcionCreacion] = useState("");
  const navigate = useNavigate(); 

  const idProfesor = user?.idUsuario;

  // Cargar actividades desde una API al montar el componente
  useEffect(() => {
    const fetchActividades = async () => {
      setLoading(true);
      try {

        const response = await axios.get(`http://localhost:5228/API/Actividad/ActividadesPorNivel?idNivel=${id}`); // Ajusta la ruta de tu API
        
        if (response.data.status && Array.isArray(response.data.value)){
          setActividades(response.data.value);
        }else{
          console.error("Error al cargar las actividades" + response.data.message);
          setError(response.data.message);
        }

      }catch (error){
        console.error("Error al cargar las actividades: ", error);
        setError("Error al conectar con el servidor.");
      }finally{
        setLoading(false);
      }
    }
    fetchActividades();
  }, [id]);

  const actividadCreador = actividades.filter(
    (actividad) => 
      opcionCreacion === "" || 
      (actividad.idusuario && actividad.idusuario.toString() === opcionCreacion)
  );

  const hadleNuevaActividad = () => {
    if (user.nivel < id) {
      error("Su nivel de perfil es menor al nivel correspondiente a la actividad que desea crear. Por favor cree actividades con su nivel o menor a este.")
    } else {
       navigate("/crear-actividad", {state: { id }})
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Se agrega el Header*/}
      <Header />
      
      {/* Contenido principal */}
      <div className="curso-detalles-container flex-grow px-12 py-16 text-center bg-[#f0faf7]">
        
        {/* Contenedor para el botón Volver y título */}
        <div className="relative mt-[-20px]">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 -ml-2 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Volver</span>
          </button>

          <h1 className="text-5xl font-bold text-[#2c7a7b] text-center w-full">
            Actividades
          </h1>
        </div>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto mt-10">Explora y accede a las actividades disponibles.</p>

        {/* Filtro y botón de Crear nueva actividad*/}
        <div className="mb-4 flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <label htmlFor="nivel-select" className="text-base font-semibold text-gray-700">
              Filtrar:
            </label>
            <select
              id="nivel-select"
              value={opcionCreacion}
              onChange={(e) => setOpcionCreacion(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg w-60"
            >
              <option value="">Todas las actividades</option>
              <option value={idProfesor?.toString()}>Mis actividades</option>
            </select>
          </div>

          {/* Botón "Crear nueva actividad" en la misma línea */}
          <button 
            onClick={() => hadleNuevaActividad()}
            disabled={user.nivel < id}
            className={ `py-2 px-6 rounded-full text-lg transition-all 
              ${user.nivel < id 
                ? "bg-gray-400 cursor-not-allowed text-gray-200" 
                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"}
            `}
          >
            Crear nueva actividad
          </button>
        </div>

        <div className="tarjetas-detalles flex justify-center gap-8 flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p>Cargando actividades ...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : actividadCreador.length > 0 ? (
            actividadCreador.map((actividad) => (
              <div 
                key={actividad.idactividad} 
                className="tarjeta-detalle bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center no-underline text-gray-800 transition-transform duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
              >
                <img src={actividadImg} alt="Imagen de actividad" className="tarjeta-imagen w-full h-40 object-cover rounded-lg mb-4" />
                <div className="tarjeta-texto">
                  <h3 className="text-2xl font-semibold text-[#2c7a7b] mb-2">{actividad.nombre}</h3>
                  <p className="text-base text-gray-600">{actividad.descripcion}</p>
                </div>
                <button 
                  onClick={() => navigate(`/actividad/${actividad.idactividad}`)}
                  className="mt-4 py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Acceder
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-xl">No hay actividades disponibles</p>
          )}

        </div>
      </div>

      {/* Footer al final de la página */}
      <Footer />
    </div>
  );
};

export default Actividad;

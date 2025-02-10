import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";  // Asegúrate de importar useNavigate
import { Link } from "react-router-dom";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";  // Asegúrate de importar el Footer
import actividadImg from "../Imagenes/actividad.jpg";
import axios from "axios";
import { useUser } from "../../../context/userContext";

const Actividad = () => {
  const { user } = useUser();
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicializa la función navigate

  // Cargar actividades desde una API al montar el componente
  useEffect(() => {
    const fetchActividades = async () => {
      setLoading(true);
      try {

        const idProfesor = user?.idUsuario;
        if (!idProfesor) {
          throw new Error("El ID del profesor no está disponible.");
        }

        const response = await axios.get(`http://localhost:5228/API/ProfesorActividad/ActividadID?id=${idProfesor}`); // Ajusta la ruta de tu API
        
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
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Agrega el Header aquí */}
      <Header />

      {/* Contenedor para el botón "Volver" y el título centrado */}
      <div className="flex items-center justify-between px-5 py-3">
        {/* Botón "Volver" en la esquina superior izquierda */}
        <button
          onClick={() => navigate(-1)} // Usa navigate aquí
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver</span>
        </button>

        {/* Título centrado con más espacio hacia abajo */}
        <h1 className="text-5xl font-bold text-[#2c7a7b] absolute left-1/2 transform -translate-x-1/2 mt-24">
          Actividades
        </h1>
      </div>

      {/* Contenido principal con menos espacio entre el título y el contenido */}
      <div className="curso-detalles-container px-12 py-16 text-center bg-[#f0faf7] mb-24">
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto mt-10 ">Explora y accede a las actividades disponibles.</p>

        <div className="tarjetas-detalles flex justify-center gap-8 flex-wrap">
          {loading ? (
            <p>Cargando actividades ...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : actividades.length > 0 ? (
            actividades.map((actividad) => (
              <div 
                key={actividad.idactividad} 
                className="tarjeta-detalle bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-64 text-center no-underline text-gray-800 transition-transform duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
              >
                <img src={actividadImg} alt="Imagen de actividad" className="tarjeta-imagen w-full h-40 object-cover rounded-lg mb-4" />
                <div className="tarjeta-texto">
                  <h3 className="text-2xl font-semibold text-[#2c7a7b] mb-2">{actividad.nombre}</h3>
                  <p className="text-base text-gray-600">{actividad.descripcion}</p>
                </div>
                <button 
                  onClick={() => window.location.href = `/actividad/${actividad.idactividad}`} 
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

        <Link 
          to="/crear-actividad" 
          className="inline-block mt-12 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-full text-lg hover:from-green-600 hover:to-green-700 transition-all"
        >
          Crear nueva actividad
        </Link>
      </div>

      {/* Footer al final de la página */}
      <Footer className="pt-20" />
    </div>
  );
};

export default Actividad;

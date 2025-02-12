import React, { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom"; 
import examenpng from "../Imagenes/examen.avif";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";  
import axios from "axios";
import { useUser } from "../../../context/userContext";

const Examen = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [examenes, setExamenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [opcionCreacion, setOpcionCreacion] = useState("");
  const navigate = useNavigate(); 

  const idProfesor = user?.idUsuario;

  // Función para obtener los exámenes desde la API
  useEffect(() => {
    const fetchExamenes = async () => {
      setLoading(true);
      try {

        const response = await axios.get(`http://localhost:5228/api/examenes/ExamenPorNivel?idNivel=${id}`); 
        if (response.data.status && Array.isArray(response.data.value)){
          setExamenes(response.data.value);
        }else{
          console.error("Error al cargar los examenes" + response.data.message);
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error al cargar exámenes:", error);
        setError("Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchExamenes();
  }, [id]); 

  const examenCreador = examenes.filter(
    (examen) => 
      opcionCreacion === "" || 
      (examen.idusuario && examen.idusuario.toString() === opcionCreacion)
  );

  const hadleNuevoExamen = () => {
    navigate("/crear-examen", { state: { id } })
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Se agrega el Header */}
      <Header />
      
      {/* Contenido principal */}
      <div className="curso-detalles-container flex-grow px-12 py-16 text-center bg-[#f0f8ff]">
        
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
            Exámenes
          </h1>
        </div>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto mt-10">Explora y accede a los exámenes disponibles.</p>

        {/* Filtro y botón de Crear nuevo examen */}
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
              <option value="">Todos los exámenes</option>
              <option value={idProfesor?.toString()}>Mis exámenes</option>
            </select>
          </div>

          {/* Botón "Crear nuevo examen" en la misma línea */}
          <button 
            onClick={() => hadleNuevoExamen()}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-full text-lg hover:from-green-600 hover:to-green-700 transition-all"
          >
            Crear nuevo examen
          </button>
        </div>

        <div className="tarjetas-detalles flex justify-center gap-8 flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p>Cargando exámenes ...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : examenCreador.length > 0 ? (
            examenCreador.map((examen) => (
              <div 
                key={examen.idexamen} 
                className="tarjeta-detalle bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center no-underline text-gray-800 transition-transform duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
              >
                <img src={examenpng} alt="Imagen de examen" className="tarjeta-imagen w-full h-40 object-cover rounded-lg mb-4" />
                <div className="tarjeta-texto">
                  <h3 className="text-2xl font-semibold text-[#2b6cb0] mb-2">{examen.titulo}</h3>
                  <p className="text-base text-gray-600">{examen.descripcion}</p>
                </div>
                <button 
                  onClick={() => navigate(`/examen/${examen.idexamen}`)}
                  className="mt-4 py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Acceder
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-xl">No hay exámenes disponibles</p>
          )}
        </div>
      </div>

      {/* Footer al final de la página */}
      <Footer />
    </div>
  );
};

export default Examen;

import React, { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom"; 
import { Link } from "react-router-dom";
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
        setLoading (false);
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
  navigate("/crear-examen", {state: { id }})
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header />
      <div className="flex items-center justify-between px-5 py-3">
        <button
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver</span>
        </button>
        <h1 className="text-5xl font-bold text-[#2b6cb0] absolute left-1/2 transform -translate-x-1/2 mt-24">
          Exámenes
        </h1>
      </div>

      <div className="container mx-auto px-12 py-16 text-center bg-[#f0f8ff] mb-20">
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto mt-10">
          Encuentra y accede a tus exámenes programados.
        </p>

        <div className="mb-4 flex items-center gap-4">
              <label htmlFor="nivel-select" className="text-base font-semibold text-gray-700">
                Filtrar:
              </label>
              <select
                id="nivel-select"
                value={opcionCreacion}
                onChange={(e) => setOpcionCreacion(e.target.value)}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg w-60"
              >
              <option value="">Todos los examenes</option>
              <option value={idProfesor?.toString()}>Mis examenes</option>
            </select>
        </div>

        <div className="flex justify-center gap-8 flex-wrap">
          {loading ? (
            <p>Cargando examenes ...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : examenCreador.length > 0 ? (
            examenCreador.map((examen) => (
              <div
                key={examen.idexamen}
                className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-64 text-center transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
              >
                <img src={examenpng} alt="Imagen de actividad" className="tarjeta-imagen w-full h-40 object-cover rounded-lg mb-4" />
                <div className="tarjeta-texto">
                  <h3 className="text-2xl font-semibold text-[#2b6cb0] mb-2">
                    {examen.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{examen.descripcion}</p>
                </div>
                <button
                  onClick={() => navigate(`/examen/${examen.idexamen}`)}
                  className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-full text-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  Acceder
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-xl">No hay exámenes disponibles</p>
          )}
        </div>

          <button 
            onClick={() => hadleNuevoExamen()}
            className="inline-block mt-16 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-full text-lg hover:from-green-600 hover:to-green-700 transition-all"
          >
            Crear nuevo examen
          </button>
      </div>

      <Footer className="pt-20"/>
    </div>
  );
};

export default Examen;
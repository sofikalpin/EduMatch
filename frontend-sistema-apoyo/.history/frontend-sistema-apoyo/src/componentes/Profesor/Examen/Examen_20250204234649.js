import React, { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";  

const Examen = () => {
  const [examenes, setExamenes] = useState([]);
  const navigate = useNavigate(); 

  // Función para obtener los exámenes desde la API
  const fetchExamenes = async () => {
    try {
      const response = await fetch("/api/examenes"); 
      const data = await response.json();
      setExamenes(data);
    } catch (error) {
      console.error("Error al cargar exámenes:", error);
    }
  };

  useEffect(() => {
    fetchExamenes();
  }, []);

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
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Encuentra y accede a tus exámenes programados.
        </p>

        <div className="flex justify-center gap-8 flex-wrap">
          {examenes.length > 0 ? (
            examenes.map((examen) => (
              <div
                key={examen.id}
                className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-64 text-center transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
              >
                <h3 className="text-2xl font-semibold text-[#2b6cb0] mb-2">
                  {examen.titulo}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{examen.descripcion}</p>
                <Link
                  to={`/examen/${examen.id}`}
                  className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-full text-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  Acceder
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-xl">No hay exámenes disponibles</p>
          )}
        </div>

        <Link to="/crear-examen">
          <button className="inline-block mt-16 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-full text-lg hover:from-green-600 hover:to-green-700 transition-all">
            Crear nuevo examen
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Examen;
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import examenLogo from "../Imagenes/examen.png";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";
import axios from "axios";

const Examenes = () => {
  const location = useLocation();
  const { nivel, nombre } = location.state || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [assignedExamenes, setAssignedExamenes] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamenes = async () => {
      setLoading(true);
      setError("");
      try {
        const idAlumnoNivel = nivel;
        if (!idAlumnoNivel) {
          throw new Error("El ID del alumno no está disponible.");
        }

        const response = await axios.get(`http://localhost:5228/api/examenes/ExamenPorNivel?idNivel=${idAlumnoNivel}`);
        if (response.data.status && Array.isArray(response.data.value)) {
          setAssignedExamenes(response.data.value);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setAssignedExamenes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExamenes();
  }, [nivel]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsFocused(true);
  };

  const filteredExamenes = assignedExamenes.filter(
    (examen) => examen.titulo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />

      <div className="flex-grow flex flex-col items-center justify-center px-5 py-10">
        
     
        <div className="flex items-center justify-between w-full mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Volver</span>
          </button>

          <h1 className="text-5xl font-bold text-[#2c7a7b] text-center flex-grow">Examenes</h1>
        </div>

      
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar examen o unidad..."
              className="w-full p-4 pl-12 border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
          </div>
          
          {isFocused && searchQuery && (
            <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-2 max-h-48 overflow-y-auto border border-gray-200 z-20">
              {loading ? (
                <p className="text-center py-4">Cargando examenes...</p>
              ) : error ? (
                <p className="text-center py-4 text-red-500">{error}</p>
              ) : filteredExamenes.length > 0 ? (
                filteredExamenes.map((examen) => (
                  <li key={examen.idexamen} className="p-3 hover:bg-gray-100 cursor-pointer transition-all">
                    <Link to={examen.link} className="block text-gray-700">{examen.titulo}</Link>
                  </li>
                ))
              ) : (
                <li className="p-3 text-center text-gray-500">No se encontraron resultados</li>
              )}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full max-w-7xl mx-auto">
          {filteredExamenes.map((examen) => (
            <div 
              key={examen.idexamen} 
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-2xl w-full h-96" 
            >
              <div to={examen.link} className="block h-full flex flex-col">
                <div className="h-1/2 relative">
                  <img 
                    src={examenLogo} 
                    alt="Examen" 
                    className="w-full h-full object-contain p-4" 
                  />
                </div>
                <div className="flex flex-col p-6 h-1/2"> 
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {examen.titulo}
                  </h3>
                  <button 
                    onClick={() => navigate(`/alumno/examenes/examen/${examen.idexamen}`)}
                    className="mt-4 w-full py-2 bg-[#2c7a7b] text-white rounded-lg text-xl font-semibold transition-all hover:bg-[#1b5c59]"
                  >
                    Acceder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Examenes;
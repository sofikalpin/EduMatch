import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react'; 
import articulo from "../Imagenes/articulo.png";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";
import axios from "axios";

const Articulos = () => {
  const location = useLocation();
  const { nivel, nombre } = location.state || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [assignedArticles, setAssignedArticles] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticulo = async () => {
      setLoading(true);
      setError("");
      try {
        const idAlumnoNivel = nivel;
        if (!idAlumnoNivel) {
          throw new Error("El ID del alumno no está disponible.");
        }

        const response = await axios.get(`http://localhost:5228/API/Articulo/ArticulosPorNivel?idNivel=${idAlumnoNivel}`);
        if (response.data.status && Array.isArray(response.data.value)) {
          setAssignedArticles(response.data.value);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setAssignedArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticulo();
  }, [nivel]);

  // Función para manejar el cambio en el campño de búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsFocused(true);
  };

  // Filtrar los artículos basados en la búsqueda
  const filteredArticles = assignedArticles.filter(
    (article) => article.titulo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />

      <div className="flex-grow flex flex-col items-center justify-center px-5 py-10">
        
        {/* Contenedor para el volver y el título */}
        <div className="flex items-center justify-between w-full mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Volver</span>
          </button>

          <h1 className="text-5xl font-bold text-[#2c7a7b] text-center flex-grow">Artículos</h1>
        </div>

        {/* Buscador de articulos*/}
        <div className="relative w-full max-w-2xl mx-auto mb-10">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar articulo..."
              className="w-full p-4 pl-12 border-2 border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
          </div>

          {/* Lista desplegable de resultados del buscador */}
          {isFocused && searchQuery && (
            <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-2 max-h-48 overflow-y-auto border border-gray-200 z-20">
              {loading ? (
                <p className="text-center py-4">Cargando artículos...</p>
              ) : error ? (
                <p className="text-center py-4 text-red-500">{error}</p>
              ) : filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <li key={article.idarticulo} className="p-3 hover:bg-gray-100 cursor-pointer transition-all">
                    <Link to={article.link} className="block text-gray-700">{article.titulo}</Link>
                  </li>
                ))
              ) : (
                <li className="p-3 text-center text-gray-500">No se encontraron resultados</li>
              )}
            </ul>
          )}
        </div>

        {/* Artículos filtrados */}
        <div className="tarjetas-detalles flex justify-center gap-8 flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {assignedArticles.length === 0 && !loading && !error ? (
            <div className="text-center text-gray-500">No hay artículos asignados.</div>
          ) : (
            (filteredArticles.length > 0 ? filteredArticles : assignedArticles).map((article) => (
              <div 
                key={article.idarticulo} 
                className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out w-full h-[350px] flex flex-col p-4"
              >
                <div to={article.link} className="block h-full flex flex-col">
                  <div className="relative w-full h-[150px] mb-4"> {/* Contenedor para la imagen */}
                    <img 
                      src={articulo} 
                      alt="Articulo" 
                      className="w-auto h-full object-contain mx-auto"  
                    />
                  </div>
                  <div className="flex flex-col flex-grow justify-between">
                    <h3 className="text-xl font-semibold text-[#2c7a7b] mb-3 truncate">
                      {article.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {article.descripcion}
                    </p>
                    <button 
                      onClick={() => navigate(`/alumno/articulos/articulo/${article.idarticulo}`)}
                      className="mt-auto py-2 px-4 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors duration-300"
                    >
                      Acceder
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default Articulos;
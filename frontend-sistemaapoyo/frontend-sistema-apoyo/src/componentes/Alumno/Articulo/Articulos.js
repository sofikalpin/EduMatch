import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import articulo from "../Imagenes/articulo.png";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";
import axios from "axios";

const Articulos = () => {
  const location = useLocation();
  const { nivel, nombre } = location.state || {};
  console.log(location.state);
  const [searchQuery, setSearchQuery] = useState("");
  const [assignedArticles, setAssignedArticles] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicializa la función navigate

  // Cargar articulos relacionadas al nivel seleccionado
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
          console.error("Error al cargar los articulos: " + response.data.message);
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error al cargar los articulos: ", error);
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setAssignedArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticulo();
  }, [nivel]); // Solo dependemos de nivel

  // Manejo de la búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsFocused(true);
  };

  // Filtrado de articulos
  const filteredArticles = assignedArticles.filter(
    (article) =>
      article.titulo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
    
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-10 mt-12">Articulos</h1>
        <div className="relative max-w-lg mx-auto">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Buscar actividad o Unidad..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
          </div>
            
          {isFocused && searchQuery && (
            <ul className="absolute w-full bg-white shadow-lg rounded-xl mt-2 max-h-48 overflow-y-auto">
              {loading ? (
                <p>Cargando articulos ...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <li key={article.idarticulo} className="p-2 hover:bg-gray-200 cursor-pointer">
                    <Link to={article.link}>{article.titulo}</Link>
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No se encontraron resultados</li>
              )}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {filteredArticles.map((article) => (
            <div key={article.idarticulo} className="bg-white shadow-md rounded-xl p-4">
              <Link to={article.link} className="block">
                <img src={articulo} alt="Articulo" className="w-full h-40 object-cover rounded-md" />
                <p className="text-lg font-semibold mt-2">{article.titulo}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-32"></div>
      <Footer />
    </div>
  );
};

export default Articulos;
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import articuloImg from "../Imagenes/articulo.jpg";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";
import axios from "axios";
import { useUser } from "../../../context/userContext";

const ArticulosProfesor = () => {
  const location = useLocation();
  const { nivel, nombre } = location.state || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [articulos, setArticulos] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [opcionCreacion, setOpcionCreacion] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  const idProfesor = user?.idUsuario;

  // Depuración: Mostrar el estado inicial
  useEffect(() => {
    console.log("Estado inicial - nivel:", nivel);
    console.log("Estado inicial - nombre:", nombre);
    console.log("Estado inicial - idProfesor:", idProfesor);
  }, [nivel, nombre, idProfesor]);

  //Obtener los articulos
  useEffect(() => {
    const fetchArticulos = async () => {
      setLoading(true);
      setError("");
      try {
        const idNivel = nivel;
        
        if (!idNivel) {
          throw new Error("El ID del nivel no está disponible.");
        }

        const response = await axios.get(`http://localhost:5228/API/Articulo/ArticulosPorNivel?idNivel=${idNivel}`);
        
        if (response.data.status && Array.isArray(response.data.value)) {
          setArticulos(response.data.value);
          setFilteredArticles(response.data.value);
        } else {
          setError(response.data.message || "Error al cargar los artículos");
        }
      } catch (error) {
        console.error("Error fetching articulos:", error);
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setArticulos([]);
        setFilteredArticles([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (nivel) {
      fetchArticulos();
    } else {
      setError("No se ha especificado un nivel válido");
      setLoading(false);
    }
  }, [nivel]);

  // Función para manejar a detalle del articulo
  const handleViewArticle = (articulo) => {
    navigate(`/profesor/cursos/detalle/articulos/${articulo.idarticulo}`, {
      state: {
        nivel: nivel,
        nombreNivel: nombre,
        idArticulo: articulo.idarticulo,
        fromListPage: true
      }
    });
  };

  // Filtrar los articulos
  useEffect(() => {
    const titlesFiltered = articulos.filter(
      (articulo) => articulo.titulo?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const filtered = titlesFiltered.filter(
      (articulo) => 
        opcionCreacion === "" || 
        (articulo.idusuario && articulo.idusuario.toString() === opcionCreacion)
    );
    
    // Actualizar el estado con los articulos filtrados
    setFilteredArticles(filtered);
  }, [searchQuery, opcionCreacion, articulos]);

  // Manejar el cambio de estado en la busqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsFocused(true);
  };

  // Función para crear nuevo articulo
  const handleNuevoArticulo = () => {
    if (user.nivel < nivel) {
      alert("Su nivel de perfil es menor al nivel correspondiente al artículo que desea crear. Por favor cree artículos con su nivel o menor a este.");
    } else {
      navigate("/crear-articulo", { 
        state: { 
          id: nivel,
          nivelNombre: nombre 
        } 
      });
    }
  };

  // Verificar si un artículo pertenece al profesor
  const isOwnArticle = (articulo) => {
    return articulo.idusuario && articulo.idusuario.toString() === idProfesor?.toString();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header />

      <div className="flex-grow flex flex-col items-center justify-center px-5 py-10">
        
        {/* Contenedor para el volver y el título */}
        <div className="flex items-center justify-between w-full mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Volver</span>
          </button>

          <h1 className="text-5xl font-bold text-[#2c7a7b] text-center flex-grow">Artículos</h1>
        </div>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Explora y administra los artículos disponibles.</p>

        {/* Contenedor con la barra de búsqueda y botón de crear nuevo artículo */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Buscador de articulos*/}
          <div className="relative w-full md:w-2/3">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artículo..."
                className="w-full p-3 pl-12 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              />
            </div>

            {/* Lista desplegable de resultados de la búsqueda */}
            {isFocused && searchQuery && (
              <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-2 max-h-48 overflow-y-auto border border-gray-200 z-20">
                {loading ? (
                  <p className="text-center py-4">Cargando artículos...</p>
                ) : error ? (
                  <p className="text-center py-4 text-red-500">{error}</p>
                ) : filteredArticles.length > 0 ? (
                  filteredArticles.map((articulo) => (
                    <li key={articulo.idarticulo} className="p-3 hover:bg-gray-100 cursor-pointer transition-all">
                      
                      <div 
                        onClick={() => handleViewArticle(articulo)}
                        className="block text-gray-700 cursor-pointer"
                      >
                        {articulo.titulo || "Artículo sin título"}
                        {isOwnArticle(articulo) && (
                          <span className="ml-2 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">Mi artículo</span>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-3 text-center text-gray-500">No se encontraron resultados</li>
                )}
              </ul>
            )}
          </div>

          {/* Filtro para mis artículos */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              id="nivel-select"
              value={opcionCreacion}
              onChange={(e) => setOpcionCreacion(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base w-full md:w-48"
            >
              <option value="">Todos los artículos</option>
              <option value={idProfesor?.toString()}>Mis artículos</option>
            </select>

            {/* Botón para crear un nuevo artículo */}
            <button 
              onClick={handleNuevoArticulo}
              className={`py-2 px-4 rounded-lg text-base transition-all whitespace-nowrap
                ${user.nivel < nivel 
                  ? "bg-gray-400 cursor-not-allowed text-gray-200" 
                  : "bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700"}
              `}
            >
              Crear artículo
            </button>
          </div>
        </div>

        {/* Artículos filtrados */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-gray-600">Cargando artículos...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-red-500">{error}</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-gray-500">No hay artículos disponibles para los criterios seleccionados.</p>
            </div>
          ) : (
            filteredArticles.map((articulo) => {
              const isUserArticle = isOwnArticle(articulo);
              return (
                <div 
                  key={articulo.idarticulo} 
                  className={`bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col h-[350px] p-4
                    ${isUserArticle ? 'ring-2 ring-teal-500 bg-teal-50' : ''}
                  `}
                >
                  {/* Etiqueta mi artículo, solo visible para artículos del usuario */}
                  {isUserArticle && (
                    <div className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                      Mi artículo
                    </div>
                  )}
                  
                  <div className="relative w-full h-[150px] mb-4"> 
                    <img 
                      src={articuloImg} 
                      alt="Artículo" 
                      className="w-auto h-full object-contain mx-auto rounded-lg"  
                    />
                  </div>
                  <div className="flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2c7a7b] mb-2">
                        {articulo.titulo || articulo.nombre || "Artículo sin título"}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {articulo.descripcion}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <button 
                        onClick={() => handleViewArticle(articulo)}
                        className="w-full py-2 px-3 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors duration-300"
                      >
                        Ver artículo
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArticulosProfesor;
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";  
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";  
import articuloImg from "../Imagenes/articulo.jpg"; // Cambia la imagen por la de artículo
import axios from "axios";
import { useUser } from "../../../context/userContext";

const Articulo = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [opcionCreacion, setOpcionCreacion] = useState("");
  const navigate = useNavigate(); 

  const idProfesor = user?.idUsuario;

  // Cargar artículos desde una API al montar el componente
  useEffect(() => {
    const fetchArticulos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5228/API/Articulo/ArticulosPorNivel?idNivel=${id}`); // Ajusta la ruta de tu API
        
        if (response.data.status && Array.isArray(response.data.value)){
          setArticulos(response.data.value);
        } else {
          console.error("Error al cargar los artículos" + response.data.message);
          setError(response.data.message);
        }

      } catch (error) {
        console.error("Error al cargar los artículos: ", error);
        setError("Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticulos();
  }, [id]);

  const articuloCreador = articulos.filter(
    (articulo) => 
      opcionCreacion === "" || 
      (articulo.idusuario && articulo.idusuario.toString() === opcionCreacion)
  );

  const handleNuevoArticulo = () => {
    navigate("/crear-articulo", { state: { id } })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Se agrega el Header */}
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
            Artículos
          </h1>
        </div>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto mt-10">Explora y accede a los artículos disponibles.</p>

        {/* Filtro y botón de Crear nuevo artículo*/}
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
              <option value="">Todos los artículos</option>
              <option value={idProfesor?.toString()}>Mis artículos</option>
            </select>
          </div>

          {/* Botón "Crear nuevo artículo" en la misma línea */}
          <button 
            onClick={() => handleNuevoArticulo()}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-full text-lg hover:from-green-600 hover:to-green-700 transition-all"
          >
            Crear nuevo artículo
          </button>
        </div>

        <div className="tarjetas-detalles flex justify-center gap-8 flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p>Cargando artículos ...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : articuloCreador.length > 0 ? (
            articuloCreador.map((articulo) => (
              <div 
                key={articulo.idarticulo} 
                className="tarjeta-detalle bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center no-underline text-gray-800 transition-transform duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
              >
                <img src={articuloImg} alt="Imagen de artículo" className="tarjeta-imagen w-full h-40 object-cover rounded-lg mb-4" />
                <div className="tarjeta-texto">
                  <h3 className="text-2xl font-semibold text-[#2c7a7b] mb-2">{articulo.nombre}</h3>
                  <p className="text-base text-gray-600">{articulo.descripcion}</p>
                </div>
                <button 
                  onClick={() => navigate(`/articulo/${articulo.idarticulo}`)}
                  className="mt-4 py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Acceder
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-xl">No hay artículos disponibles</p>
          )}

        </div>
      </div>

      {/* Footer al final de la página */}
      <Footer />
    </div>
  );
};

export default Articulo;

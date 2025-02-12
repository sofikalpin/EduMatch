import React, { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";  // Asegúrate de importar el Footer
import articulopng from "../Imagenes/articulo.jpg"; 
import axios from "axios";
import { useUser } from "../../../context/userContext";

const Articulo = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [opcionCreacion, setOpcionCreacion] = useState("");
  const navigate = useNavigate(); // Inicializa la función navigate

  const idProfesor = user?.idUsuario;

  // Cargar artículos desde una API al montar el componente
  useEffect(() => {
    const fetchArticulos = async () => {
      setLoading(true);
      try {

        const response = await axios.get(`http://localhost:5228/API/Articulo/ArticulosPorNivel?idNivel=${id}`); // Ajusta la ruta de tu API
        
        if (response.data.status && Array.isArray(response.data.value)){
          setArticulos(response.data.value);
        }else{
          console.error("Error al cargar los articulos" + response.data.message);
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error al cargar artículos:", error);
        setError("Error al conectar con el servidor.");
      }finally{
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

  const hadleNuevoArticulo = () => {
    navigate("/crear-articulo", {state: { id }})
  }

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
          Artículos
        </h1>
      </div>

      {/* Contenido principal con menos espacio entre el título y el contenido */}
      <div className="container mx-auto px-12 py-16 text-center bg-[#f0faf7] mb-20"> {/* Aumenté el padding y el margen inferior */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto mt-10">
          Explora artículos sobre diferentes temas de aprendizaje.
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
              <option value="">Todos los articulos</option>
              <option value={idProfesor?.toString()}>Mis articulos</option>
            </select>
        </div>

        <div className="flex justify-center gap-8 flex-wrap">
          {loading ? (
            <p>Cargando articulos ...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : articuloCreador.length > 0 ? (
            articuloCreador.map((articulo) => (
              <div
                key={articulo.idarticulo}
                className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-64 text-center transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
              >
                <img src={articulopng} alt="Imagen de articulo" className="tarjeta-imagen w-full h-40 object-cover rounded-lg mb-4" />
                <div className="tarjeta-texto">
                  <h3 className="text-2xl font-semibold text-[#2c7a7b] mb-2">{articulo.titulo}</h3>
                  <p className="text-base text-gray-600">{articulo.descripcion}</p>
                </div>
                <button
                  onClick={() => navigate(`/articulo/${articulo.idarticulo}`)}
                  className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-full text-lg hover:from-green-600 hover:to-green-700 transition-all"
                >
                  Acceder
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-xl">No hay artículos disponibles</p>
          )}

        </div>

          <button 
            onClick={() => hadleNuevoArticulo()}
            className="inline-block mt-16 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-full text-lg hover:from-green-600 hover:to-green-700 transition-all"
          >
            Crear nuevo artículo
          </button>
      </div>

      {/* Agrega el Footer aquí */}
      <Footer className="pt-20"/>
    </div>
  );
};

export default Articulo;
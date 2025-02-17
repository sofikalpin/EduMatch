import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LogoInicio from "../../../logo/LogoInicio.png";
import chatIcon from "../Imagenes/chat.png";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import articuloImagen from "../Imagenes/articulo.png"
import Header from '../HeaderAlumno';
import Footer from '../FooterAlumno';
import axios from 'axios';

const ArticuloDetalle = () => {
  const { idarticulo } = useParams();
    console.log("ID de la articulo:", idarticulo);
  
    const [loading, setLoading] = useState(false);
    const [articulo, setArticulo] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

  // Simula obtener el artículo desde un servidor o una base de datos
  useEffect(() => {
    // Datos simulados, reemplazar por la llamada al backend más adelante
    const encontrarArticulo = async () => {
      try {
        setLoading(true);
        const respuesta = await axios.get(`http://localhost:5228/API/Articulo/ArticuloID?id=${idarticulo}`);
        if (respuesta.data.status) {
          console.log("Respuesta completa de la API:", respuesta.data);
          setArticulo(respuesta.data.value);
        } else {
          setError(respuesta.data.message);
        }
      } catch (error) {
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setArticulo("");
      } finally {
        setLoading(false);
      }
    } 
    encontrarArticulo();
  }, [idarticulo]);

  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
<div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <span className="text-gray-600">Fecha de Publicacion: {articulo.fechaCreacion || "No posee fecha"}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">{articulo?.titulo}</h1>

          <div className="mt-6 flex justify-center">
            <img src={articuloImagen} alt="Actividad" className="w-40 h-auto rounded-lg shadow-md mx-auto my-4" />
          </div>

          <p className="text-lg leading-relaxed text-gray-600">{articulo?.descripcion}</p>

          <div className="border-t border-gray-200 mt-8 pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Archivo del articulo</h2>
            {articulo?.url ? (
              <a
                href={articulo.url}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(articulo.url, "_blank");
                }}
                className="py-2 px-6 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-md"
              >
                Ver archivo
              </a>
            ) : (
              <p className="text-gray-500 italic">Este articulo no posee ningún archivo adjunto</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticuloDetalle;
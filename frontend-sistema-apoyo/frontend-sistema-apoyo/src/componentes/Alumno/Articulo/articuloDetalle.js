import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LogoInicio from "../../../logo/LogoInicio.png";
import chatIcon from "../Imagenes/chat.png";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="lg:w-2/3">
        
        <h1 className="text-3xl font-bold text-gray-900">{articulo?.titulo}</h1>
        <div className="mt-6 flex justify-center">
          <img src={articuloImagen} alt="Articulo" className="w-32 h-auto rounded-lg shadow-md mx-auto" />
        </div>
          <p className="text-lg mt-6 font-semibold text-gray-800">Descripción:</p>
          <p className="mt-2 text-gray-600">{articulo?.descripcion}</p>
        <div className="mt-6">
          <p className="text-gray-800">Archivo del Articulo:</p>
          <a href={articulo.url || "#"} className="text-blue-500 hover:underline">
            {articulo.url ? articulo.url : "La actividad no posee ningún link"}
          </a>
        </div>
      </div>
      <div className="lg:w-1/3">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <span className="text-gray-600">Fecha de Publicacion: {articulo.fechaCreacion}</span>
        </div>
      </div>
        <Footer />
      </div>
    </div>
    </div>
  );
};

export default ArticuloDetalle;
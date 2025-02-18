import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import axios from 'axios';
import { useUser } from '../../../context/userContext';
import articuloImagen from "../Imagenes/articulo.jpg";
import deleteIcon from "../Imagenes/delete.png";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";

const ArticuloDetalle = () => {
  const { idarticulo } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [loading, setLoading] = useState(false);
  const [articulo, setArticulo] = useState(null);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const encontrarArticulo = async () => {
      try {
        setLoading(true);
        setError(""); 
        const respuesta = await axios.get(`/API/Articulo/ArticuloID?id=${idarticulo}`);
        if (respuesta.data.status) {
          setArticulo(respuesta.data.value);
        } else {
          setError(respuesta.data.message || "No se encontró el artículo.");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setArticulo(null);
      } finally {
        setLoading(false);
      }
    };

    encontrarArticulo();
  }, [idarticulo]);

  const handleDelete = async () => {
    if (!window.confirm("¿Está seguro que desea eliminar este artículo?")) {
      return;
    }
  
    try {
      setIsDeleting(true);
      const response = await axios.delete(`http://localhost:5228/API/ProfesorArticulo/EliminarArticulo?id=${idarticulo}`);
      
      if (response.data.status) {
        navigate(-1); 
      } else {
        setError(response.data.message || "Error al eliminar el artículo");
      }
    } catch (error) {
      console.error("Error al eliminar el artículo:", error);
      setError("Error al conectar con el servidor, inténtelo más tarde.");
    } finally {
      setIsDeleting(false);
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-600">Cargando artículo...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg mt-12 p-6 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <span className="text-gray-600 text-xl">Fecha de Publicación: {articulo?.fechaCreacion}</span>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">{articulo?.titulo}</h1>
              
              {user && articulo && user.idUsuario === articulo.idusuario && (
                <button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  aria-label="Eliminar artículo"
                  className={`p-2 ${isDeleting ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-100 hover:bg-red-200'} rounded-full transition-colors duration-200`}
                >
                  <img src={deleteIcon} alt="Eliminar" className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="flex justify-center">
              <img src={articuloImagen} alt="Imagen del artículo" className="h-48 w-auto rounded-lg shadow-md object-cover" />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Descripción</h2>
              <ReactMarkdown className="text-gray-600 text-justify" breaks={true}>
                {articulo?.descripcion}
              </ReactMarkdown>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Archivo del Artículo</h2>
              {articulo?.url ? (
                <a href={articulo.url} className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold" target="_blank" rel="noopener noreferrer">
                  Ver archivo
                </a>
              ) : (
                <p className="text-gray-500 italic">Este artículo no posee ningún archivo adjunto</p>
              )}
            </div>

            <button
              onClick={() => navigate(-1)}
              className="py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              aria-label="Volver a artículos"
            >
              Volver a Artículos
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticuloDetalle;

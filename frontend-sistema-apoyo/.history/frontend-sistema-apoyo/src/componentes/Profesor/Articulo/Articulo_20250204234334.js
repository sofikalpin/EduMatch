import React, { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";  // Asegúrate de importar el Footer

const Articulo = () => {
  const [articulos, setArticulos] = useState([]);
  const navigate = useNavigate(); // Inicializa la función navigate

  // Cargar artículos desde una API al montar el componente
  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await fetch("/api/articulos"); // Ajusta la ruta de tu API
        const data = await response.json();
        setArticulos(data);
      } catch (error) {
        console.error("Error al cargar artículos:", error);
      }
    };

    fetchArticulos();
  }, []);

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
        <h1 className="text-5xl font-bold text-[#2c7a7b] absolute left-1/2 transform -translate-x-1/2 mt-16">
          Artículos
        </h1>
      </div>

      {/* Contenido principal con menos espacio entre el título y el contenido */}
      <div className="container mx-auto px-12 py-16 text-center bg-[#f0faf7] mb-20"> {/* Aumenté el padding y el margen inferior */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Explora artículos sobre diferentes temas de aprendizaje.
        </p>

        <div className="flex justify-center gap-8 flex-wrap">
          {articulos.length > 0 ? (
            articulos.map((articulo) => (
              <div
                key={articulo.id}
                className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-64 text-center transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
              >
                <h3 className="text-2xl font-semibold text-[#2c7a7b] mb-2">
                  {articulo.titulo}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{articulo.descripcion}</p>
                <Link
                  to={`/articulo/${articulo.id}`}
                  className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-full text-lg hover:from-green-600 hover:to-green-700 transition-all"
                >
                  Acceder
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-xl">No hay artículos disponibles</p>
          )}
        </div>

        <Link to="/crear-articulo">
          <button className="inline-block mt-16 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-full text-lg hover:from-green-600 hover:to-green-700 transition-all">
            Crear nuevo artículo
          </button>
        </Link>
      </div>

      {/* Agrega el Footer aquí */}
      <Footer />
    </div>
  );
};

export default Articulo;
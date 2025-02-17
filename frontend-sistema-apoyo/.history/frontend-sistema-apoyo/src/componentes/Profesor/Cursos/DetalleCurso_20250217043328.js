import React, {useState} from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";
import actividad from "../Imagenes/actividad.jpg";
import foro from "../Imagenes/foro.jpg";
import examen from "../Imagenes/examen.avif";
import articulos from "../Imagenes/articulo.jpg";

const cursos = [
  { id: 1, nombre: "A1: Curso Principiante", descripcion: "Introducción al Inglés, conociendo vocabulario básico y frases simples para situaciones cotidianas" },
  { id: 2, nombre: "A2: Curso Básico", descripcion: "Expande tu vocabulario y mejora tu capacidad para comunicarte en situaciones cotidianas." },
  { id: 3, nombre: "B1: Curso Pre-Intermedio", descripcion: "Mejora tu comprensión y expresión, aprendiendo a comunicarte con más claridad en Inglés" },
  { id: 4, nombre: "B2: Curso Intermedio", descripcion: "Desarrolla fluidez para interactuar de manera más natural y comprender textos más complejos" },
  { id: 5, nombre: "C1: Curso Intermedio-Alto", descripcion: "Perfecciona tu Inglés para comunicarte con confianza en situaciones profesionales y sociales" },
  { id: 6, nombre: "C2: Curso Avanzado", descripcion: "Domina el Inglés, con capacidad para comprender y expresar ideas complejas con fluidez" },
];

const tarjetas = [
  { id: 1, nombre: "Actividad", descripcion: "Ver actividades relacionadas", imagen: actividad},
  { id: 2, nombre: "Artículos", descripcion: "Explorar artículos", imagen: articulos},
  { id: 3, nombre: "Exámenes", descripcion: "Acceder al examen", imagen: examen},
];

const CursoDetalle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");  // Mensaje de error
  const { nivel, nombre } = location.state || {}; // Datos del curso

  console.log(nivel, nombre);

  const DescripcionNivel = (nivel) => {
    const cursoEncontrado = cursos.find((c) => c.id === nivel);
    return cursoEncontrado ? cursoEncontrado.descripcion : "Nivel no encontrado";
  };
  

  const handleCardClick = (option) => {
    if (!nivel) {
      setError("Debe seleccionar un curso de estudio");
      return;
    }

    switch (option) {
      case "Actividad":
        navigate(`/profesor/cursos/detalle/actividad`, { state: { nivel, nombre } });
        break;
      case "Artículos":
        navigate(`/profesor/cursos/detalle/articulos`, { state: { nivel, nombre } });
        break;
      case "Exámenes":
        navigate(`/profesor/cursos/detalle/examen`, { state: { nivel, nombre } });
        break;
      case "Mis Cursos":
        navigate("/profesor/cursos");
        break;
      case "INICIO":
        navigate("/profesor");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      {/* Agrega el Header aquí */}
      <Header  />

      {/* Contenido principal */}
      <div className="curso-detalles-container px-5 py-10 text-center bg-[#f0faf7] flex-grow  ">
      <div className="flex items-center mb-12 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium ml-12"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Volver</span>
          </button>
          <h1 className="flex-grow text-5xl font-bold text-[#2c7a7b] text-center">
             {nombre}
          </h1>
          
        </div>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">{DescripcionNivel(nivel)}</p>

         {/* Mostrar error si existe */}
         {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="tarjetas-detalles flex justify-center gap-8 flex-wrap">
          {tarjetas.map((tarjeta) => (
            <div 
              onClick={() => handleCardClick(tarjeta.nombre)}
              key={tarjeta.id} 
              className="tarjeta-detalle bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-64 text-center no-underline text-gray-800 transition-transform duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
            >
              <img src={tarjeta.imagen} alt={`Imagen para ${tarjeta.nombre}`} className="tarjeta-imagen w-full h-40 object-cover rounded-lg mb-4" />
              <div className="tarjeta-texto">
                <h3 className="text-2xl font-semibold text-[#2c7a7b] mb-2">{tarjeta.nombre}</h3>
                <p className="text-base text-gray-600">{tarjeta.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer con margen superior */}
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default CursoDetalle;
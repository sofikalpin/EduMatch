import { Link, useParams } from "react-router-dom";
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
  { id: 1, nombre: "Actividad", descripcion: "Ver actividades relacionadas", imagen: actividad, link: "actividad" },
  { id: 2, nombre: "Artículos", descripcion: "Explorar artículos", imagen: articulos, link: "articulos" },
  { id: 3, nombre: "Exámenes", descripcion: "Acceder al examen", imagen: examen, link: "examen" },
  { id: 4, nombre: "Foro", descripcion: "Participar en el foro de consulta", imagen: foro, link: "foro" },
];

const CursoDetalle = () => {
  const { id } = useParams();
  const curso = cursos.find((c) => c.id === parseInt(id));

  if (!curso) {
    return <p>Curso no encontrado</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      {/* Agrega el Header aquí */}
      <Header />

      {/* Contenido principal */}
      <div className="curso-detalles-container px-5 py-10 text-center bg-[#f0faf7] flex-grow">
        <h1 className="text-5xl font-bold text-[#2c7a7b] mb-4">{curso.nombre}</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">{curso.descripcion}</p>

        <div className="tarjetas-detalles flex justify-center gap-8 flex-wrap">
          {tarjetas.map((tarjeta) => (
            <Link 
              to={`/profesor/cursos/detalle/${id}/${tarjeta.link}`} 
              key={tarjeta.id} 
              className="tarjeta-detalle bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-64 text-center no-underline text-gray-800 transition-transform duration-300 ease-in-out hover:transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between"
            >
              <img src={tarjeta.imagen} alt={`Imagen para ${tarjeta.nombre}`} className="tarjeta-imagen w-full h-40 object-cover rounded-lg mb-4" />
              <div className="tarjeta-texto">
                <h3 className="text-2xl font-semibold text-[#2c7a7b] mb-2">{tarjeta.nombre}</h3>
                <p className="text-base text-gray-600">{tarjeta.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>

        <Link 
          to="/profesor/cursos" 
          className="volver-link inline-block mt-16 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-full text-lg hover:from-green-600 hover:to-green-700 transition-all"
        >
          Volver a Mis Cursos
         </Link>
      </div>

      {/* Footer con margen superior */}
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default CursoDetalle;
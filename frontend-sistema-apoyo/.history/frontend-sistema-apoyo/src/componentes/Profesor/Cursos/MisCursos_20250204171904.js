import { Link } from "react-router-dom";
import logo from "../../../logo/LogoInicio.png";
import logoA1 from "../Logos/A1.png";
import logoA2 from "../Logos/A2.png";
import logoB1 from "../Logos/B1.png";
import logoB2 from "../Logos/B2.png";
import logoC1 from "../Logos/C1.png";
import logoC2 from "../../logo/C2.png";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";

const MisCursos = () => {
  const cursos = [
    { id: 1, nombre: "A1: Curso Principiante", alumnos: 20, imagen: logoA1 },
    { id: 2, nombre: "A2: Curso Básico", alumnos: 15, imagen: logoA2 },
    { id: 3, nombre: "B1: Curso Pre-Intermedio", alumnos: 25, imagen: logoB1 },
    { id: 4, nombre: "B2: Curso Intermedio", alumnos: 10, imagen: logoB2 },
    { id: 5, nombre: "C1: Curso Intermedio-Alto", alumnos: 15, imagen: logoC1 },
    { id: 6, nombre: "C2: Curso Avanzado", alumnos: 5, imagen: logoC2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      {/* Agrega el Header aquí */}
      <Header />

      {/* Contenedor de cursos con margen superior */}
      <div className="mis-cursos pt-10 px-6 flex-grow">
        {/* Título más elegante */}
        <h1 className="text-center text-5xl font-bold text-[#2c7a7b] mb-12">
          Mis Cursos
        </h1>

        {/* Grid de cursos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cursos.map((curso) => (
            <div
              key={curso.id}
              className="curso-card bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl"
            >
              {/* Imagen del curso */}
              <img
                src={curso.imagen || logo}
                alt={curso.nombre}
                className="w-full h-64 object-cover object-center"
              />

              {/* Contenido de la tarjeta */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {curso.nombre}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {curso.alumnos} Alumnos inscriptos
                </p>
                <Link
                  to={`/profesor/cursos/${curso.id}`}
                  className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-full text-sm hover:from-green-600 hover:to-green-700 transition-all"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer con margen superior para separación */}
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default MisCursos;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "./HeaderProfesor"; // Importa el Header
import Footer from "./FooterProfesor"; // Importa el Footer

const cursos = [
  { id: 1, nombre: "A1: Curso Principiante" },
  { id: 2, nombre: "A2: Curso Básico" },
  { id: 3, nombre: "B1: Curso Pre-Intermedio" },
  { id: 4, nombre: "B2: Curso Intermedio" },
  { id: 5, nombre: "C1: Curso Intermedio-Alto" },
  { id: 6, nombre: "C2: Curso Avanzado" },
];

const InicioProfesor = () => {
  const [busqueda, setBusqueda] = useState("");
  const [cursosFiltrados, setCursosFiltrados] = useState(cursos);
  const navigate = useNavigate();

  useEffect(() => {
    const resultados = cursos.filter((curso) =>
      curso.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setCursosFiltrados(resultados);
  }, [busqueda]);

  const manejarSeleccionCurso = (cursoId) => {
    navigate(`/profesor/cursos/${cursoId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      {/* Agrega el Header aquí */}
      <Header />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-12 sm:px-16 lg:px-8 py-12 flex-grow mb-24 mt-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Bienvenido a tu espacio de enseñanza!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora nuestros cursos de inglés y comienza a transformar la vida de tus estudiantes.
          </p>
        </div>

        {/* Buscador */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center w-full max-w-xl px-4 py-2 bg-white border border-gray-300 rounded-full shadow-lg">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar cursos..."
              className="w-full px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="ml-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lista de cursos filtrados */}
        {busqueda && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Resultados de la búsqueda:
            </h3>
            {cursosFiltrados.length > 0 ? (
              <ul className="space-y-3">
                {cursosFiltrados.map((curso, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200 transition cursor-pointer"
                    onClick={() => manejarSeleccionCurso(curso.id)}
                  >
                    {curso.nombre}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No se encontraron cursos.</p>
            )}
          </div>
        )}
      </main>

      {/* Footer al final */}
      <Footer className="mt-12" />
    </div>
  );
};

export default InicioProfesor;
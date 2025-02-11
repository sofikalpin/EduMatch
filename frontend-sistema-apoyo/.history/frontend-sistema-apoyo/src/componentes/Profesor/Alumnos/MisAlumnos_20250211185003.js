import React, { useState, useEffect } from "react";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";


const MisAlumnos = () => {
  const [cursos, setCursos] = useState({});

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch("/api/alumnos");
        const data = await response.json();

        const agrupadosPorCurso = data.reduce((acc, alumno) => {
          if (!acc[alumno.curso]) acc[alumno.curso] = [];
          acc[alumno.curso].push(alumno);
          return acc;
        }, {});

        setCursos(agrupadosPorCurso);
      } catch (error) {
        console.error("Error al cargar los alumnos:", error);
      }
    };

    fetchAlumnos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center">
      {/* Agrega el Header aquí */}
      <Header />

      <div className="w-full max-w-4xl mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mis Alumnos</h1>
        {Object.keys(cursos).length === 0 ? (
          <p className="text-gray-600">Cargando alumnos...</p>
        ) : (
          Object.keys(cursos).map((curso, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">{curso}</h2>
              <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md shadow">
                {cursos[curso].map((alumno) => (
                  <li key={alumno.id} className="text-gray-700">{alumno.nombre}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      <Footer
    </div>
  );
};

export default MisAlumnos;
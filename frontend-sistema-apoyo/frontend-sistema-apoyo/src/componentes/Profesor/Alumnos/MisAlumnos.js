import React, { useState, useEffect } from "react";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";

const MisAlumnos = () => {
  const [cursos, setCursos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Datoscursos = [
    { id: 1, nombre: "A1: Curso Principiante" },
    { id: 2, nombre: "A2: Curso Básico" },
    { id: 3, nombre: "B1: Curso Pre-Intermedio" },
    { id: 4, nombre: "B2: Curso Intermedio" },
    { id: 5, nombre: "C1: Curso Intermedio-Alto" },
    { id: 6, nombre: "C2: Curso Avanzado" },
  ];

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch("http://localhost:5228/API/AdministradorAlumno/ListaAlumnos");
        if (!response.ok) throw new Error("Error al obtener los datos");
        
        const data = await response.json();
        console.log("Respuesta de la API:", data);

        const agrupadosPorCurso = data.value.reduce((acc, alumno) => {
          if (!acc[alumno.idnivel]) acc[alumno.idnivel] = [];
          acc[alumno.idnivel].push(alumno);
          return acc;
        }, {});

        setCursos(agrupadosPorCurso);
        
      } catch (error) {
        console.error("Error al cargar los alumnos:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumnos();
  }, []);

  const obtenerNombreCurso = (idnivel) => {
    const curso = Datoscursos.find((curso) => curso.id === parseInt(idnivel));
    return curso ? curso.nombre : "Curso desconocido";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header */}
      <Header />

      {/* Contenido principal centrado */}
      <main className="flex flex-col items-center justify-center flex-grow w-full">
        <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Alumnos</h1>
          {loading ? (
            <p className="text-gray-600">Cargando alumnos...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : (
            Object.keys(cursos).length > 0 ? (
              Object.keys(cursos).map((curso, index) => (
                <div key={index} className="mb-6 text-left">
                  <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                    {obtenerNombreCurso(curso)}
                  </h2>
                  <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md shadow">
                    {cursos[curso].map((alumno) => (
                      <li key={alumno.idusuario} className="text-gray-700">
                        {alumno.nombrecompleto}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No hay alumnos registrados.</p>
            )
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MisAlumnos;

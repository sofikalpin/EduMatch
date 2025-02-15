import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor"; 

const MisAlumnos = () => {
  const [cursos, setCursos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const Datoscursos = [
    { id: 1, nombre: "A1: Curso Principiante", color: "bg-emerald-500" },
    { id: 2, nombre: "A2: Curso Básico", color: "bg-blue-500" },
    { id: 3, nombre: "B1: Curso Pre-Intermedio", color: "bg-purple-500" },
    { id: 4, nombre: "B2: Curso Intermedio", color: "bg-pink-500" },
    { id: 5, nombre: "C1: Curso Intermedio-Alto", color: "bg-amber-500" },
    { id: 6, nombre: "C2: Curso Avanzado", color: "bg-red-500" },
  ];

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch("http://localhost:5228/API/AdministradorAlumno/ListaAlumnos");
        const data = await response.json();
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
    return curso ? curso : { nombre: "Curso desconocido", color: "bg-gray-500" };
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="h-8 w-64 bg-gray-200 rounded" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-32 bg-gray-200 rounded" />
                <div className="h-32 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center text-red-500">
            <p>Error al cargar los datos: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />
      
      <div className="grid gap-10 p-10">
        {Object.keys(cursos).map((cursoId) => {
          const cursoInfo = obtenerNombreCurso(cursoId);
          return (
            <div key={cursoId} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className={`${cursoInfo.color} p-4`}>
                <h2 className="text-2xl font-bold text-white">{cursoInfo.nombre}</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cursos[cursoId].map((alumno) => (
                    <div key={alumno.idusuario} className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                              {alumno.nombrecompleto}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default MisAlumnos;

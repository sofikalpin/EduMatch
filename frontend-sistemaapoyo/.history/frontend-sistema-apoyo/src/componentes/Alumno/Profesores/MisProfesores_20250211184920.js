import React, { useState, useEffect } from "react";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";

const MisProfesores = () => {
  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch("/api/profesores");
        const data = await response.json();
        setProfesores(data);
      } catch (error) {
        console.error("Error al cargar los profesores:", error);
      }
    };

    fetchProfesores();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center">
      <Header />
      <div className="w-full max-w-4xl mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mis Profesores</h1>
        {profesores.length === 0 ? (
          <p className="text-gray-600">Cargando profesores...</p>
        ) : (
          <ul className="list-disc list-inside bg-gray-50 p-4 rounded-md shadow">
            {profesores.map((profesor) => (
              <li key={profesor.id} className="text-gray-700">{profesor.nombre}</li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MisProfesores;

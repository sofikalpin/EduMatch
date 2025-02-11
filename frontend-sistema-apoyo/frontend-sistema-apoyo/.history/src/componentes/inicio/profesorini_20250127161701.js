import React, { useState } from "react";

export default function InicioProfesor() {
  const [selectedLevel, setSelectedLevel] = useState("Todos");

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const teachers = [
    {
      name: "José Luis",
      status: "online",
      rating: 4.9,
      reviews: 13,
      title: "Super profesor",
      description: "Profesor con más de 20 años de experiencia en la enseñanza del inglés...",
      level: "Avanzado",
      badge: "Profesor destacado",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Ariel",
      status: "online",
      rating: 5,
      reviews: 6,
      title: "Certificado",
      description: "Si estás buscando cómo mejorar tu inglés, pronunciar mejor, entender cómo expresarte...",
      level: "Intermedio",
      badge: "Certificado",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Natasha",
      status: "online",
      rating: 4.8,
      reviews: 9,
      title: "Certificada",
      description: "Estudiante de 4to año de ESL. Experiencia comprobable con la enseñanza de inglés...",
      level: "Básico",
      badge: "Nuevo",
      image: "https://via.placeholder.com/150",
    },
  ];

  const filteredTeachers =
    selectedLevel === "Todos"
      ? teachers
      : teachers.filter((teacher) => teacher.level === selectedLevel);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Encabezado */}
      <div className="bg-blue-600 p-4 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-3xl font-bold">EduMatch</div>
          <nav className="space-x-4">
            <a href="#home" className="text-white hover:text-blue-200">Inicio</a>
            <a href="#professors" className="text-white hover:text-blue-200">Profesores</a>
            <a href="#about" className="text-white hover:text-blue-200">Acerca</a>
          </nav>
        </div>
      </div>

      {/* Selector de nivel - Movido arriba de la lista de profesores y alineado a la derecha */}
      <div className="p-4 max-w-7xl mx-auto mb-6 flex justify-end">
        <select
          value={selectedLevel}
          onChange={handleLevelChange}
          className="px-5 py-2 text-2xl border rounded w-full max-w-xs mx-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Filtrar por nivel"
        >
          <option value="Todos">Todos</option>
          <option value="Básico">Básico</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>

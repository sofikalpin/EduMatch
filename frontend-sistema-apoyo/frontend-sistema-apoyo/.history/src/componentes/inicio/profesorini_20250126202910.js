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
      description: "Profesor con más de 20 años de experiencia en la enseñanza del inglés como...",
      level: "Avanzado",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Ariel",
      status: "online",
      rating: 5,
      reviews: 6,
      title: "Certificado",
      description:
        "Si estás buscando cómo mejorar tu inglés, pronunciar mejor, entender cómo expresarte...",
      level: "Intermedio",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Natasha",
      status: "online",
      rating: 4.8,
      reviews: 9,
      title: "Certificada",
      description:
        "Estudiante de 4to año de ESL. Experiencia comprobable con la enseñanza de inglés...",
      level: "Básico",
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
          {/* Logo o nombre de la aplicación */}
          <div className="text-white text-3xl font-bold">EduMatch</div>

          {/* Menú de navegación */}
          <nav className="space-x-4">
            <a href="#home" className="text-white hover:text-blue-200">Inicio</a>
            <a href="#professors" className="text-white hover:text-blue-200">Profesores</a>
            <a href="#about" className="text-white hover:text-blue-200">Acerca</a>
          </nav>
        </div>
      </div>

      <div className="flex justify-start w-full">
  <h1 className="text-2xl font-bold mb-4">Profesores de EduMatch</h1>
  
</div>
<div className="flex justify-start w-full">
<select
        value={selectedLevel}
        onChange={handleLevelChange}
        className="mb-4 px-4 py-2 border rounded"
      >
        <option value="Todos">Todos</option>
        <option value="Básico">Básico</option>
        <option value="Intermedio">Intermedio</option>
        <option value="Avanzado">Avanzado</option>
      </select>
    </div>
      <div className="grid grid-cols-1 gap-6">
        {filteredTeachers.map((teacher, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold">{teacher.name}</h2>
            <p>{teacher.description}</p>
            <p className="text-gray-500">Nivel: {teacher.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

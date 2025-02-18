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
      description: "Profesor con más de 20 años de experiencia en la enseñanza del inglés.",
      level: "Avanzado",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    // Otros profesores...
  ];

  const filteredTeachers =
    selectedLevel === "Todos"
      ? teachers
      : teachers.filter((teacher) => teacher.level === selectedLevel);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Profesores Disponibles</h1>
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

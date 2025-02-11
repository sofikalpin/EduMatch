import React, { useState } from "react";

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

const TeacherCard = ({ teacher }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 max-w-xs flex flex-col items-center">
      <img
        src={teacher.image}
        alt={teacher.name}
        className="rounded-full w-24 h-24 object-cover mb-4"
      />
      <h3 className="text-lg font-bold mb-1">{teacher.name}</h3>
      <span className="text-green-600 text-sm mb-2">({teacher.status})</span>
      <p className="text-sm text-gray-600 text-center mb-2">{teacher.description}</p>
      <div className="flex items-center justify-between w-full mt-2">
        <span className="text-yellow-500 font-semibold">★ {teacher.rating}</span>
        <span className="text-gray-500 text-sm">({teacher.reviews} Opiniones)</span>
      </div>
      <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-lg mt-2">
        {teacher.title}
      </span>
      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-lg mt-2">
        Nivel: {teacher.level}
      </span>
    </div>
  );
};

export default function ProfesorIni() {
  const [selectedLevel, setSelectedLevel] = useState("Todos");

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const filteredTeachers =
    selectedLevel === "Todos"
      ? teachers
      : teachers.filter((teacher) => teacher.level === selectedLevel);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Profesores</h1>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-xl">REGÍSTRATE</button>
      </header>
      <div className="mb-4">
        <label htmlFor="level" className="block text-gray-700 font-medium mb-2">
          Filtrar por nivel:
        </label>
        <select
          id="level"
          value={selectedLevel}
          onChange={handleLevelChange}
          className="block w-full max-w-xs px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="Todos">Todos</option>
          <option value="Básico">Básico</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher} />
        ))}
      </div>
    </div>
  );
}

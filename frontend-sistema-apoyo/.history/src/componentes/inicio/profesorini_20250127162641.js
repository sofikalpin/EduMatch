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
      <div className="p-4 max-w-7xl mx-auto mb-6 flex justify-end ml-auto">

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
      </div>

      {/* Lista de profesores */}
      <div className="px-6 py-6">
        {filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.name}
                className="bg-gray-200 p-4 rounded-xl shadow-lg w-full h-auto flex flex-col items-center justify-between"
              >
                <div>
                  <div className="mb-4">
                    <img
                      className="w-20 h-20 rounded-full mx-auto border-4 border-gray-200"
                      src={teacher.image}
                      alt={`Foto de ${teacher.name}`}
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{teacher.name}</h2>
                  <p className="text-sm text-green-600">{teacher.status}</p>
                  <p className="text-sm text-gray-500 mt-1">{teacher.title}</p>
                  <span className="ml-2 text-sm">{teacher.badge}</span> {/* Aquí agregamos la propiedad badge */}
                </div>
                <div className="flex justify-center items-center mt-2">
                  {[...Array(Math.floor(teacher.rating))].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                  {teacher.rating % 1 !== 0 && (
                    <span className="text-yellow-400 text-xl">⭐</span>
                  )}
                  <span className="text-sm text-gray-500 ml-2">
                    ({teacher.reviews} Opiniones)
                  </span>
                </div>
                <div className="mt-4">
                  <button
                    className="text-blue-500 text-xl focus:outline-none mg-3"
                    onClick={() => alert(`Te interesaste en ${teacher.name}`)}
                  >
                    Me interesa
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 w-full">
            No hay profesores disponibles para este nivel.
          </p>
        )}
      </div>
    </div>
  );
}

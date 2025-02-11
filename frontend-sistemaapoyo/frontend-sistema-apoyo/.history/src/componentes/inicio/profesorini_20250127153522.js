import React from 'react';
import { Heart } from 'lucide-react';

const TeacherProfiles = () => {
  const teachers = [
    {
      name: "José Luis",
      status: "online",
      rating: 5,
      reviews: 13,
      badge: "Super profesor",
      description: "Profesor con más de 20 años de experiencia en la enseñanza del inglés como...",
      imageSrc: "/api/placeholder/300/300"
    },
    {
      name: "Ariel",
      status: "online",
      rating: 5,
      reviews: 8,
      badge: "Certificado",
      description: "Si estás buscando como mejorar tu inglés, pronunciar mejor, entender como expresarte...",
      imageSrc: "/api/placeholder/300/300"
    },
    {
      name: "Natasha",
      status: "online",
      rating: 5,
      reviews: 8,
      badge: "Certificada",
      description: "Estudiante de 4to año de IES. Experiencia comprobable en enseñanza de inglés...",
      imageSrc: "/api/placeholder/300/300"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-teal-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-8">
            <a href="#" className="text-yellow-400 font-bold">PROFESORES</a>
            <a href="#" className="text-white">PROGRAMA</a>
            <a href="#" className="text-white">HERRAMIENTAS</a>
          </div>
          <div className="flex space-x-4">
            <button className="text-white">ACCEDE</button>
            <button className="bg-pink-500 px-4 py-2 rounded-full font-bold">REGISTRATE</button>
          </div>
        </div>
      </nav>

      {/* Level Filter */}
      <div className="container mx-auto mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-full">
          NIVEL
        </button>
      </div>

      {/* Teacher Grid */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher, index) => (
            <div key={index} className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Favorite Button */}
              <button className="absolute top-2 right-2 z-10">
                <Heart className="text-gray-400 hover:text-red-500" />
              </button>
              
              {/* Teacher Image */}
              <img
                src={teacher.imageSrc}
                alt={teacher.name}
                className="w-full h-64 object-cover"
              />
              
              {/* Teacher Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{teacher.name}</h3>
                  <span className="text-green-500 text-sm">({teacher.status})</span>
                </div>
                
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {"★".repeat(teacher.rating)}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">
                    ({teacher.reviews} Opiniones)
                  </span>
                  <span className="ml-2 text-sm">{teacher.badge}</span>
                </div>
                
                <p className="text-gray-600 text-sm">{teacher.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfiles;
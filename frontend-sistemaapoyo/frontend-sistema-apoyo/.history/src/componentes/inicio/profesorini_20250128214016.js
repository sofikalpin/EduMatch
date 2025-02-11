import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ChevronDown, X } from 'lucide-react'; // Importar el ícono X
import logo from '../../logo/LogoInicio.png';
// Importar los nuevos componentes
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Componentes/Footer';

// Footer data
const footerSections = {
  section1: {
    title: "Información",
    links: ["Sobre Nosotros", "Términos y Condiciones", "Política de Privacidad", "Contacto"]
  },
  section2: {
    title: "Programas",
    links: ["Nivel Inicial", "Nivel Medio", "Nivel Superior"]
  }
};

const socialIcons = [
  { name: 'Facebook', color: 'hover:text-blue-500' },
  { name: 'Instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', color: 'hover:text-blue-400' },
  { name: 'Youtube', color: 'hover:text-red-500' },
  { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const TeacherCard = ({ teacher }) => {
  const placeholderImage = "https://via.placeholder.com/150";
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center">
      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-gray-200">
        <img
          className="w-full h-full object-cover"
          src={teacher.image || placeholderImage}
          alt={`Foto de ${teacher.name}`}
          onError={(e) => (e.target.src = placeholderImage)}
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-800">{teacher.name}</h2>
      <p className="text-sm text-green-600">{teacher.status}</p>
      <p className="text-sm text-gray-500 mt-1">{teacher.title}</p>
      <span className="ml-2 text-sm">{teacher.badge}</span>
      <div className="flex justify-center items-center mt-2">
        {[...Array(Math.floor(teacher.rating))].map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">⭐</span>
        ))}
        {teacher.rating % 1 !== 0 && <span className="text-yellow-400 text-xl">⭐</span>}
        <span className="text-sm text-gray-500 ml-2">({teacher.reviews} Opiniones)</span>
      </div>
      <button
        className="mt-4 text-blue-500 text-lg font-medium hover:text-blue-700 transition-transform transform hover:scale-105"
        onClick={() => alert(`Te interesaste en ${teacher.name}`)}
      >
        Me interesa
      </button>
    </div>
  );
};


const ProgramDropdown = ({ levels, onNavigate }) => (
  <div className="absolute mt-2 bg-white shadow-lg rounded-md z-10">
    {levels.map((level) => (
      <div
        key={level.name}
        onClick={() => onNavigate(level.route)}
        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
      >
        <p className="font-semibold">{level.name}</p>
        <p className="text-sm text-gray-500">{level.description}</p>
      </div>
    ))}
  </div>
);

export default function InicioProfesor() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState("Todos");
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleNavigation = (path) => {
    alert(`Navegando a: ${path}`); // Aquí puedes agregar navegación real con React Router o similar.
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
      image: "https://images.pexels.com/photos/3184642/pexels-photo-3184642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
      image: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
      image: "https://images.pexels.com/photos/5212361/pexels-photo-5212361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const filteredTeachers =
    selectedLevel === "Todos"
      ? teachers
      : teachers.filter((teacher) => teacher.level === selectedLevel);

  const levels = [
    { name: "Nivel Básico", route: "./NivelInicial", description: "Para principiantes (A1-A2)" },
    { name: "Nivel Intermedio", route: "./NivelIntermedio", description: "Mejora tu fluidez (B1-B2)" },
    { name: "Nivel Avanzado", route: "./NivelAvanzado", description: "Perfecciona tu inglés (C1-C2)" },
  ];

  return (
    <div className="bg-gray-100">
      <TopBar 
        onLogin={() => navigate('/iniciarsesion')} 
        onRegister={() => navigate('/registrarse')} 
      />
      <Header 
        onNavigate={navigate}
        logo={logo}
      />

      <div className="p-4 max-w-7xl mx-auto mb-6 flex justify-end">
        <select
          value={selectedLevel}
          onChange={handleLevelChange}
          className="px-3 py-2 text-lg border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Filtrar por nivel"
        >
          <option value="Todos">Todos</option>
          <option value="Básico">Básico</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
      </div>

      <div className="px-6 py-6">
        {filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.name} teacher={teacher} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 w-full">
            No hay profesores disponibles para este nivel.
          </p>
        )}
      </div>

      {/* Espacio adicional antes del Footer */}
      <div className="my-6"></div>

      <Footer 
        socialIcons={socialIcons}
        footerSections={footerSections}
        onNavigation={navigate}
      />
    </div>
  );
}

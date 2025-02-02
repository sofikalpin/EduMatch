import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Star, ChevronDown } from 'lucide-react';
import logo from '../../logo/LogoInicio.png';
import Imagen1 from './pexels-divinetechygirl-1181534.jpg';
import Imagen2 from './pexels-katerina-holmes-5905709.jpg';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

// Footer data
const footerSections = {
  section1: {
    title: "Información",
    links: ["Sobre Nosotros", "Términos y Condiciones", "Política de Privacidad", "Contacto"]
  },
  section2: {
    title: "Recursos",
    links: ["Blog", "Guías de Estudio", "Material Descargable", "FAQ"]
  }
};

const socialIcons = [
  { name: 'Facebook', color: 'hover:text-blue-500' },
  { name: 'Instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', color: 'hover:text-blue-400' },
  { name: 'Youtube', color: 'hover:text-red-500' },
  { name: 'Linkedin', color: 'hover:text-blue-700' }
];

// Modal Component
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-20">
    <div className="bg-white p-8 rounded-xl w-96">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button onClick={onClose}>
          <X className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

// ReviewStars Component
const ReviewStars = ({ rating }) => (
  <div className="flex space-x-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-400'}`} />
    ))}
  </div>
);

// ReviewCard Component
const ReviewCard = ({ name, date, content, rating }) => (
  <div className="p-4 bg-white shadow-md rounded-xl border border-gray-200">
    <ReviewStars rating={rating} />
    <p className="text-gray-700 mt-2">{content}</p>
    <div className="flex justify-between mt-3 text-sm text-gray-500">
      <span>{name}</span>
      <span>{date}</span>
    </div>
  </div>
);

// SocialIcon Mapping
const SocialIcon = (name) => {
  switch (name) {
    case 'Facebook': return Facebook;
    case 'Instagram': return Instagram;
    case 'Twitter': return Twitter;
    case 'Youtube': return Youtube;
    case 'Linkedin': return Linkedin;
    default: return null;
  }
};

// Program Dropdown Component
const ProgramDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const levels = [
    { name: 'Nivel Básico', route: '/programa/basico', description: 'Para principiantes (A1-A2)' },
    { name: 'Nivel Intermedio', route: '/programa/intermedio', description: 'Mejora tu fluidez (B1-B2)' },
    { name: 'Nivel Avanzado', route: '/programa/avanzado', description: 'Perfecciona tu inglés (C1-C2)' },
    { name: 'Business English', route: '/programa/business', description: 'Inglés para negocios' },
    { name: 'TOEFL Preparation', route: '/programa/toefl', description: 'Prepárate para el examen' },
    { name: 'IELTS Preparation', route: '/programa/ielts', description: 'Alcanza tu mejor puntaje' }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl py-2 z-50"
      onMouseLeave={onClose}
    >
      {levels.map((level, index) => (
        <button
          key={index}
          onClick={() => navigate(level.route)}
          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors group"
        >
          <div className="text-gray-900 font-medium group-hover:text-blue-600">
            {level.name}
          </div>
          <div className="text-sm text-gray-500 group-hover:text-blue-500">
            {level.description}
          </div>
        </button>
      ))}
    </div>
  );
};

export default function Inicio() {
  const navigate = useNavigate();
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  
  // Sample reviews data
  const reviews = [
    { name: 'Juan Pérez', date: '01/01/2025', content: 'Muy buen curso, aprendí mucho!', rating: 5 },
    { name: 'Ana Gómez', date: '12/12/2024', content: 'Excelente contenido, muy recomendable.', rating: 4 },
    { name: 'Carlos López', date: '11/11/2024', content: 'Me ayudó a mejorar mi inglés rápidamente.', rating: 4 },
  ];

  // Navigation handlers
  const handleLogin = () => {
    navigate('/iniciarsesion');
  };

  const handleRegister = () => {
    navigate('/registrarse');
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-gray-100">
      {/* Franja blanca con los botones de iniciar sesión y registrarse */}
      <div className="bg-white py-2 flex justify-end items-center px-6">
        <button
          onClick={handleLogin}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg mr-4 hover:bg-blue-600 transition-colors"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={handleRegister}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Registrarse
        </button>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between p-6" style={{ backgroundColor: '#00A89F' }}>
        <img src={logo} alt="Logo" className="h-12" />
        <nav className="flex gap-6 justify-end flex-1">
          <button
            onClick={() => handleNavigation('/inicioprofesor')}
            className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors"
          >
            Profesores
          </button>
          <div className="relative">
            <button
              onMouseEnter={() => setIsProgramsOpen(true)}
              className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors flex items-center gap-1"
            >
              Programa
              <ChevronDown 
                className={`w-5 h-5 transition-transform ${isProgramsOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <ProgramDropdown 
              isOpen={isProgramsOpen} 
              onClose={() => setIsProgramsOpen(false)}
            />
          </div>
          <button
            onClick={() => handleNavigation('/conocenos')}
            className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors"
          >
            Conocenos
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center p-16 text-center min-h-[80vh] relative"
        style={{ backgroundImage: `url(${Imagen2})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 mt-20">
          <h1 className="text-4xl font-bold text-white">Aprende Inglés de Manera Efectiva</h1>
          <p className="text-xl text-white mt-4">Clases personalizadas para todos los niveles con profesores nativos certificados</p>
        </div>
        <div className="relative z-10 mt-6 flex justify-center gap-4 flex-col sm:flex-row">
          <button 
            onClick={handleRegister} 
            className="px-6 py-3 bg-white text-blue-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            Comienza Ahora
          </button>
          <button 
            onClick={() => handleNavigation('/conocenos')} 
            className="px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-900 transition-colors"
          >
            Conoce Más
          </button>
        </div>
      </section>

      {/* Tres pilares de aprendizaje */}
      <section className="p-12 bg-gray-50">
        <h2 className="text-3xl font-semibold text-blue-900 mb-8 text-center">
          Tres pilares de aprendizaje que garantizan tu fluidez
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-1 space-y-8">
            {['Clases Grabadas', 'Clases Personalizadas', 'Clases con Profesores Nativos'].map((title, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <button onClick={handleRegister} className="w-full text-left">
                  <div className="flex justify-between items-center">
                    <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  </div>
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center lg:justify-end lg:w-1/3">
            <img
              src={Imagen1}
              alt="Image"
              className="w-80 h-80 object-cover rounded-full shadow-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Sección de Opiniones */}
      <section className="bg-white py-12 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl font-semibold text-blue-900 mb-6">Conoce la opinión de nuestros estudiantes</h1>

        {/* Rating general */}
        <div className="flex justify-center items-center mb-8">
          <span className="text-lg text-gray-700 mr-4">Muy bueno</span>
          <ReviewStars rating={4} />
        </div>

        <p className="text-sm text-gray-500 mb-12 text-center">En base a 6748 opiniones</p>

        {/* Tarjetas de reseñas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div className="mb-6" key={index}>
                <ReviewCard {...review} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay opiniones disponibles en este momento.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="mx-auto px-10 w-full">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            {/* Síguenos Section */}
            <div className="lg:w-1/3 space-y-4">
              <h2 className="text-2xl font-semibold text-center lg:text-left">¡Síguenos!</h2>
              <div className="flex justify-center lg:justify-start space-x-4">
                {socialIcons.map(({ name, color }) => {
                  const Icon = SocialIcon(name);
                  return Icon && (
                    <button key={name} className={`${color} transition-colors`}>
                      <Icon className="h-6 w-6" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Sections */}
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-12">
              {Object.values(footerSections).map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <button 
                          onClick={() => handleNavigation(`/${link.toLowerCase().replace(/\s+/g, '-')}`)}
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
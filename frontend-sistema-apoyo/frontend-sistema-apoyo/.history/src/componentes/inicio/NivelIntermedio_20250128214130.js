import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../logo/LogoInicio.png';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Componentes/Footer';

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

const B1CourseContent = () => {
  const courseTopicsB1 = [
    "Basic sentence structure",
    "Common verbs and adjectives",
    "Present simple and present continuous",
    "Questions and negations",
    "Prepositions of time and place",
    "Daily routines",
    "Asking for directions"
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Texto de B1 */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-green-600 mb-6">
            B1 - NIVEL INTERMEDIO
          </h2>
          <ul className="space-y-3">
            {courseTopicsB1.map((topic, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Imagen de B1 */}
        <div className="flex-1 flex justify-center md:justify-end items-start">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <img
              src="https://images.pexels.com/photos/3184636/pexels-photo-3184636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Students studying"
              className="rounded-full w-full h-full object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const B2CourseContent = () => {
  const courseTopicsB2 = [
    "Advanced connectors or sentence connectors",
    "-ed and -ing adjectives",
    "The verb 'to need'",
    "The verb 'to wish'",
    "Phrasal verbs",
    "Indefinite pronouns",
    "Active and passive voice",
    "Transitive and intransitive verbs",
    "Reported speech",
    "Relative clauses",
    "Direct and indirect speech"
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Texto de B2 */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-green-700 mb-6">
          B1 - NIVEL INTERMEDIO ALTO
          </h2>
          <ul className="space-y-3">
            {courseTopicsB2.map((topic, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Imagen de B2 */}
        <div className="flex-1 flex justify-center md:justify-end items-start">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <img
              src="https://images.pexels.com/photos/3769981/pexels-photo-3769981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Students studying"
              className="rounded-full w-full h-full object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const B2CourseContentPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TopBar 
        onLogin={() => navigate('/iniciarsesion')} 
        onRegister={() => navigate('/registrarse')} 
      />
      <Header 
        onNavigate={navigate}
        logo={logo}
      />

      {/* Main Content */}
      <div>
        {/* B1 Content */}
        <B1CourseContent />

        {/* Separator */}
        {/* Separator */}
        <div className="text-center py-8">
          <hr className="w-[80%] mx-auto border-t-2 border-gray-300" />
        </div>
        {/* B2 Content */}
        <B2CourseContent />
      
      <div className="mt-16" /> {/* Ajusta el valor del margen según sea necesario */}
      </div>

      <Footer 
        socialIcons={socialIcons}
        footerSections={footerSections}
        onNavigation={navigate}
      />
    </div>
  );
};

export default B2CourseContentPage;

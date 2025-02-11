import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Solo esta importación es necesaria
import logo from '../../logo/LogoInicio.png';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';

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
      <h2 className="text-2xl font-bold text-emerald-600 mb-6">
        B1 · INTERMEDIO
      </h2>
      <ul className="space-y-3">
        {courseTopicsB1.map((topic, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
            <span className="text-gray-700">{topic}</span>
          </li>
        ))}
      </ul>
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
      <h2 className="text-2xl font-bold text-emerald-600 mb-6">
        B2 · INTERMEDIO
      </h2>
      <ul className="space-y-3">
        {courseTopicsB2.map((topic, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
            <span className="text-gray-700">{topic}</span>
          </li>
        ))}
      </ul>
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
        <div className="text-center py-4">
          <span className="text-xl text-gray-500">-o-</span>
        </div>

        {/* B2 Content */}
        <B2CourseContent />
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

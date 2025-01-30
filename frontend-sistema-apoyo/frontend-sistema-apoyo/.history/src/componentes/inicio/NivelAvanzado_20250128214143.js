import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../logo/LogoInicio.png';
import TopBar from './TopBar';
import Header from './Componentes/Header';
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

const C1CourseContent = () => {
    const courseTopicsC1 = [
      "Advanced grammar structures",
      "Complex sentence formation",
      "Modals for deduction and speculation",
      "Future perfect and future continuous tenses",
      "Conditionals (third and mixed)",
      "Expressing opinions and making suggestions",
      "Reading and analyzing academic texts"
    ];
  
    return (
      <div className="max-w-6xl mx-auto p-6 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Texto de C1 */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              C1 - NIVEL AVANZADO
            </h2>
            <ul className="space-y-3">
              {courseTopicsC1.map((topic, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Imagen de C1 */}
          <div className="flex-1 flex justify-center md:justify-end items-start">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              <img
                src="https://images.pexels.com/photos/4226262/pexels-photo-4226262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Students studying"
                className="rounded-full w-full h-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const C2CourseContent = () => {
    const courseTopicsC2 = [
      "Advanced idiomatic expressions",
      "Cohesion and coherence in writing",
      "Cultural nuances and understanding",
      "Academic writing conventions",
      "Advanced speaking strategies",
      "Debating and presenting ideas",
      "Understanding advanced literature and poetry"
    ];
  
    return (
      <div className="max-w-6xl mx-auto p-6 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Texto de C2 */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              C2 - NIVEL PROFICIENCY
            </h2>
            <ul className="space-y-3">
              {courseTopicsC2.map((topic, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Imagen de C2 */}
          <div className="flex-1 flex justify-center md:justify-end items-start">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              <img
                src="https://images.pexels.com/photos/5676744/pexels-photo-5676744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          {/* C1 Content */}
          <C1CourseContent />
  
          {/* Separator */}
          <div className="text-center py-8">
            <hr className="w-[80%] mx-auto border-t-2 border-gray-300" />
          </div>
  
          {/* C2 Content */}
          <C2CourseContent />
        
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
  
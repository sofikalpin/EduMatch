import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../logo/LogoInicio.png';
import TopBar from '../Componentes/TopBar';
import Header from '../Componentes/Header';
import Footer from '../Componentes/Footer';

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

const A1CourseContent = () => {
  const courseTopicsA1 = [
    "Introductions and greetings",
    "Basic sentence structure",
    "Numbers and time",
    "Simple questions and answers",
    "Personal information",
    "Family and friends",
    "Common verbs and nouns"
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="flex flex-col md:flex-row gap-8">
     
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-pink-600 mb-6">
          A1 - PRINCIPIANTE
          </h2>
          <ul className="space-y-3">
            {courseTopicsA1.map((topic, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{topic}</span>
              </li>
            ))}
          </ul>
        </div>

   
        <div className="flex-1 flex justify-center md:justify-end items-start">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <img
              src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Students studying"
              className="rounded-full w-full h-full object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const A2CourseContent = () => {
  const courseTopicsA2 = [
    "Daily routines",
    "Basic travel vocabulary",
    "Food and drink",
    "Expressing preferences",
    "Describing people and places",
    "Talking about past events",
    "Future plans and intentions"
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="flex flex-col md:flex-row gap-8">
   
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-pink-700 mb-6">
          A2 - BASICO
          </h2>
          <ul className="space-y-3">
            {courseTopicsA2.map((topic, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{topic}</span>
              </li>
            ))}
          </ul>
        </div>

     
        <div className="flex-1 flex justify-center md:justify-end items-start">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <img
              src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Students studying"
              className="rounded-full w-full h-full object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const A1A2CourseContentPage = () => {
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


      <div>
       
        <A1CourseContent />

     
        <div className="text-center py-8">
          <hr className="w-[80%] mx-auto border-t-2 border-gray-300" />
        </div>

    
        <A2CourseContent />
      
      <div className="mt-16" /> 

      </div>

      <Footer 
        socialIcons={socialIcons}
        footerSections={footerSections}
        onNavigation={navigate}
      />
    </div>
  );
};

export default A1A2CourseContentPage;

import React from 'react';
import { Check } from 'lucide-react';

const B2CourseContent = () => {
  const courseTopics = [
    "Advanced connectors or sentence connectors",
    "-ed and -ing adjectives",
    "The verb \"to need\"",
    "The verb \"to wish\"",
    "Phrasal verbs",
    "Indefinite pronouns",
    "Active and passive voice",
    "Transitive and intransitive verbs",
    "Reported speech",
    "Relative clauses",
    "Direct and indirect speech"
  ];

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
      <div className="max-w-6xl mx-auto p-6 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contenedor de texto */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-emerald-600 mb-6">
              B2 · INTERMEDIO
            </h2>
            <ul className="space-y-3">
              {courseTopics.map((topic, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contenedor de la imagen a la derecha */}
          <div className="flex-1 flex justify-center md:justify-end items-start mt-[-390px]">
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
    </div>
  );
};

export default B2CourseContent;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ChevronDown, X, Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import logo from '../../logo/LogoInicio.png';
import Imagen1 from './pexels-divinetechygirl-1181534.jpg';
import Imagen2 from './pexels-katerina-holmes-5905709.jpg';

import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';

// Updated social icons with Lucide components
const socialIcons = [
  { name: 'Facebook', icon: Facebook, color: 'hover:text-blue-500', link: 'https://facebook.com' },
  { name: 'Instagram', icon: Instagram, color: 'hover:text-pink-500', link: 'https://instagram.com' },
  { name: 'Twitter', icon: Twitter, color: 'hover:text-blue-400', link: 'https://twitter.com' },
  { name: 'Youtube', icon: Youtube, color: 'hover:text-red-500', link: 'https://youtube.com' },
  { name: 'Linkedin', icon: Linkedin, color: 'hover:text-blue-700', link: 'https://linkedin.com' }
];

// Rest of your existing components (Modal, ReviewStars, ReviewCard) remain the same...
// [Previous code remains unchanged until footerSections]

const footerSections = {
  section1: {
    title: "Información",
    links: [
      { name: "Sobre Nosotros", path: "/informacion" },
      { name: "Términos y Condiciones", path: "/terminos" },
      { name: "Contacto", path: "/contacto" }
    ]
  },
  section2: {
    title: "Programas",
    links: [
      { name: "Nivel Inicial", path: "/nivel-inicial" },
      { name: "Nivel Medio", path: "/nivel-medio" },
      { name: "Nivel Superior", path: "/nivel-superior" }
    ]
  }
};

// Updated Footer Component with icons and copyright
const UpdatedFooter = ({ socialIcons, footerSections, navigate }) => {
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSocialClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {Object.values(footerSections).map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-semibold text-lg mb-4">Redes Sociales</h3>
            <div className="flex space-x-4">
              {socialIcons.map((icon, index) => {
                const IconComponent = icon.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSocialClick(icon.link)}
                    className={`text-gray-400 ${icon.color} transition-colors`}
                    aria-label={icon.name}
                  >
                    <IconComponent size={24} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              © {new Date().getFullYear()} English Learning Platform. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Rest of your component remains the same...
// [Previous code remains unchanged until the end]

export default function Inicio() {
  const navigate = useNavigate();
  
  const reviews = [
    { name: 'Juan Pérez', date: '01/01/2025', content: 'Muy buen curso, aprendí mucho!', rating: 5 },
    { name: 'Ana Gómez', date: '12/12/2024', content: 'Excelente contenido, muy recomendable.', rating: 4 },
    { name: 'Carlos López', date: '11/11/2024', content: 'Me ayudó a mejorar mi inglés rápidamente.', rating: 4 },
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

      {/* Previous sections remain unchanged */}
      {/* ... */}

      <UpdatedFooter 
        socialIcons={socialIcons}
        footerSections={footerSections}
        navigate={navigate}
      />
    </div>
  );
}
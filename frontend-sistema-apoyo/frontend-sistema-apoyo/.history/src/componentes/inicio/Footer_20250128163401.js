import React from "react";
import { Link } from "react-router-dom";  // Usamos Link para las rutas dentro de la SPA
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const icons = {
  Facebook: Facebook,
  Instagram: Instagram,
  Twitter: Twitter,
  Youtube: Youtube,
  Linkedin: Linkedin,
};

const SocialIcon = ({ name, color }) => {
  const Icon = icons[name];
  if (!Icon) return null;
  return (
    <button
      className={`${color} transition-colors`}
      aria-label={`Ir a ${name}`}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
};

const Footer = ({ socialIcons, footerSections, onNavigation }) => (
  <>
    <footer className="bg-blue-900 text-white py-12">
      <div className="mx-auto px-10 w-full">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Social Media */}
          <div className="lg:w-1/3 space-y-4">
            <h2 className="text-2xl font-semibold text-center lg:text-left">¡Síguenos!</h2>
            <div className="flex justify-center lg:justify-start space-x-4">
              {socialIcons.map(({ name, color }) => (
                <SocialIcon key={name} name={name} color={color} />
              ))}
            </div>
          </div>
          {/* Footer Links */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-12">
            {Object.values(footerSections).map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
    <div className="bg-blue-900 text-center text-gray-400 text-sm py-4">
      © 2025 - Todos los derechos reservados por EduMatch
    </div>
  </>
);

Footer.defaultProps = {
  socialIcons: [],
  footerSections: {
    section1: {
      title: "Información",
      links: ["Sobre Nosotros", "Términos y Condiciones", "Política de Privacidad", "Contacto"]
    },
    section2: {
      title: "Programas",
      links: ["Nivel Inicial", "Nivel Medio", "Nivel Superior"]
    }
  },
};

export default Footer;

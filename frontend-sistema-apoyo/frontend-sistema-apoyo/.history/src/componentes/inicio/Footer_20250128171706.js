import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

// Updated social icons with Lucide components
const socialIcons = [
  { name: 'Facebook', icon: Facebook, color: 'hover:text-blue-500', link: 'https://facebook.com' },
  { name: 'Instagram', icon: Instagram, color: 'hover:text-pink-500', link: 'https://instagram.com' },
  { name: 'Twitter', icon: Twitter, color: 'hover:text-blue-400', link: 'https://twitter.com' },
  { name: 'Youtube', icon: Youtube, color: 'hover:text-red-500', link: 'https://youtube.com' },
  { name: 'Linkedin', icon: Linkedin, color: 'hover:text-blue-700', link: 'https://linkedin.com' },
];

// Footer sections
const footerSections = {
  section1: {
    title: "Información",
    links: [
      { name: "Sobre Nosotros", path: "/informacion" },
      { name: "Términos y Condiciones", path: "/terminos" },
      { name: "Contacto", path: "/contacto" },
    ],
  },
  section2: {
    title: "Programas",
    links: [
      { name: "Nivel Inicial", path: "/nivel-inicial" },
      { name: "Nivel Medio", path: "/nivel-medio" },
      { name: "Nivel Superior", path: "/nivel-superior" },
    ],
  },
};

// Updated Footer Component with icons and copyright
const UpdatedFooter = ({ socialIcons = [], footerSections = {}, navigate }) => {
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

// Main component
export default function App() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100">
      {/* Footer */}
      <UpdatedFooter
        socialIcons={socialIcons}
        footerSections={footerSections}
        navigate={navigate}
      />
    </div>
  );
}

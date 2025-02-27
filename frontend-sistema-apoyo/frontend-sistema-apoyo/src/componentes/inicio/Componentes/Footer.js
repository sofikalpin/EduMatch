import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const socialIcons = [
  { name: 'Facebook', icon: Facebook, color: 'hover:text-blue-500', link: 'https://www.facebook.com/profile.php?id=61573209179555' },
  { name: 'Instagram', icon: Instagram, color: 'hover:text-pink-500', link: 'https://www.instagram.com/edumatch.ingles?igsh=MTFndjJidGZuc2dndQ%3D%3D&utm_source=qr' },
  { name: 'Twitter', icon: Twitter, color: 'hover:text-blue-400', link: 'https://twitter.com/EduMatch2024' },
  { name: 'Youtube', icon: Youtube, color: 'hover:text-red-500', link: 'https://www.youtube.com/@EduMatch2024' },
  { name: 'Linkedin', icon: Linkedin, color: 'hover:text-blue-700', link: 'https://www.linkedin.com/in/edumatch-ingles-aaa69a351?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
];

const Footer = ({ role }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSocialClick = (link) => {
    window.open(link, '_blank');
  };

  // Lista separada de secciones para mejor control
  const informacionSection = {
    title: "Información",
    links: [
      { name: "Sobre Nosotros", path: "/informacion" },
      { name: "Términos y Condiciones", path: "/informacion" },
      { name: "Contacto", path: "/informacion" }
    ]
  };

  const programaSection = {
    title: "Programa",
    links: [
      { name: "Nivel Inicial", path: "/NivelInicial" },
      { name: "Nivel Intermedio", path: "/NivelIntermedio" },
      { name: "Nivel Avanzado", path: "/NivelAvanzado" }
    ]
  };

  const opinionSection = {
    title: "Danos tu opinión!",
    links: [
      { name: "Junto a ArgyReviews", path: "/resena" }
    ]
  };

  // Función simplificada para obtener secciones
  const getVisibleSections = () => {
    const commonSections = [informacionSection, programaSection];
    
    if (role === 'administrador') {
      return [];
    }
    
    if (['alumno', 'profesor', 'profesorNoAutorizado', 'foro'].includes(role)) {
      return [...commonSections, opinionSection];
    }
    
    return commonSections;
  };

  const visibleSections = getVisibleSections();
  
  // Log para depuración
  console.log('Current role:', role);
  console.log('Visible sections:', visibleSections);

  return (
    <footer className="bg-blue-900 text-white w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {/* Secciones dinámicas */}
          {visibleSections.map((section, sectionIndex) => (
            <div 
              key={sectionIndex} 
              className="flex flex-col items-center sm:items-start space-y-4"
            >
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="flex flex-col items-center sm:items-start space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button 
                      onClick={() => handleNavigation(link.path)} 
                      className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Redes Sociales */}
          <div className={`flex flex-col items-center sm:items-start space-y-4 ${role === 'administrador' ? 'col-span-full' : ''}`}>
            <h3 className="text-lg font-semibold">Redes Sociales</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              {socialIcons.map((icon, index) => {
                const IconComponent = icon.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSocialClick(icon.link)}
                    className={`text-gray-400 ${icon.color} transition-colors p-2 hover:bg-blue-800 rounded-full`}
                    aria-label={icon.name}
                  >
                    <IconComponent size={20} className="sm:w-6 sm:h-6" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <p className="text-center sm:text-left text-gray-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} EduMatch. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
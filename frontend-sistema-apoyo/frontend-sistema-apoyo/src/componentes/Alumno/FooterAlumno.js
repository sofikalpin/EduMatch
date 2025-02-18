import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const socialIcons = [
  { name: 'Facebook', icon: Facebook, color: 'hover:text-blue-500', link: 'https://www.facebook.com/profile.php?id=61573209179555 ' },
  { name: 'Instagram', icon: Instagram, color: 'hover:text-pink-500', link: 'https://www.instagram.com/edumatch.ingles?igsh=MTFndjJidGZuc2dndQ%3D%3D&utm_source=qr' },
  { name: 'Twitter', icon: Twitter, color: 'hover:text-blue-400', link: 'https://twitter.com' },
  { name: 'Youtube', icon: Youtube, color: 'hover:text-red-500', link: 'https://youtube.com' },
  { name: 'Linkedin', icon: Linkedin, color: 'hover:text-blue-700', link: 'https://www.linkedin.com/in/edumatch-ingles-aaa69a351?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
];

const footerSections = {
  section1: {
    title: "Danos tu opinión sobre EduMatch",
    links: [
      { name: "Junto a ArgyReviews", path: "/resena" },
    
    ],
  },
};

const UpdatedFooter = ({ socialIcons = [], footerSections = {}, navigate }) => {
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSocialClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-6xl mx-auto py-12 px-4 text-center pl-30 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 justify-center pl-20">
          
          
          {Object.values(footerSections).map((section, index) => (
            <div key={index} className="text-center">
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

          <div className="text-center">
            <h3 className="font-semibold text-lg mb-4">Redes Sociales</h3>
            <div className="flex justify-center space-x-4">
              
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

        <div className="pt-8 mt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} EduMatch. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default function App() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100">
      <UpdatedFooter
        socialIcons={socialIcons}
        footerSections={footerSections}
        navigate={navigate}
      />
    </div>
  );
}
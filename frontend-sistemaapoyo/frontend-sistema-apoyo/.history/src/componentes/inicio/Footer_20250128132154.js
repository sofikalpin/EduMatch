import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const SocialIcon = (name) => {
  switch (name) {
    case 'Facebook': return Facebook;
    case 'Instagram': return Instagram;
    case 'Twitter': return Twitter;
    case 'Youtube': return Youtube;
    case 'Linkedin': return Linkedin;
    default: return null;
  }
};

const Footer = ({ socialIcons, footerSections, onNavigation }) => (
  <footer className="bg-blue-900 text-white py-12">
    <div className="mx-auto px-10 w-full">
      <div className="flex flex-col lg:flex-row justify-between gap-12">
        <div className="lg:w-1/3 space-y-4">
          <h2 className="text-2xl font-semibold text-center lg:text-left">¡Síguenos!</h2>
          <div className="flex justify-center lg:justify-start space-x-4">
            {socialIcons.map(({ name, color }) => {
              const Icon = SocialIcon(name);
              return Icon && (
                <button key={name} className={`${color} transition-colors`}>
                  <Icon className="h-6 w-6" />
                </button>
              );
            })}
          </div>
        </div>
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-12">
          {Object.values(footerSections).map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button 
                      onClick={() => onNavigation(`/${link.toLowerCase().replace(/\s+/g, '-')}`)}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  </footer>


);

export default Footer;
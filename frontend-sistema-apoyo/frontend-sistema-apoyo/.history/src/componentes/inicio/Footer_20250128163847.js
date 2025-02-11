import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react'; // Importar los íconos

const socialIcons = [
  { name: 'Facebook', component: Facebook, color: 'hover:text-blue-500' },
  { name: 'Instagram', component: Instagram, color: 'hover:text-pink-500' },
  { name: 'Twitter', component: Twitter, color: 'hover:text-blue-400' },
  { name: 'Youtube', component: Youtube, color: 'hover:text-red-500' },
  { name: 'Linkedin', component: Linkedin, color: 'hover:text-blue-700' }
];

const Footer = ({ socialIcons }) => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto flex flex-col items-center">
      <div className="flex space-x-4">
        {socialIcons.map(({ name, component: Icon, color }) => (
          <button key={name} className={`${color} transition-colors`} aria-label={`Ir a ${name}`}>
            <Icon className="h-6 w-6" />
          </button>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;

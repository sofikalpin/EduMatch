import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin2 } from 'lucide-react';

const icons = {
  Facebook: Facebook,
  Instagram: Instagram,
  Twitter: Twitter,
  Youtube: Youtube,
  Linkedin: Linkedin2,
};

const SocialIcon = (name) => icons[name] || null;

const Footer = ({ socialIcons, footerSections, onNavigation }) => (
  <footer
    className="bg-blue-900 text-white py-12"
    style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60px', // Ajusta el alto del footer según tus necesidades
    }}
  >
    <div className="mx-auto px-10 w-full">
      <div className="flex flex-col lg:flex-row justify-between gap-12">
        {/* Social Media */}
        <div className="lg:w-1/3 space-y-4">
          <h2 className="text-2xl font-semibold text-center lg:text-left">¡Síguenos!</h2>
          <div className="flex justify-center lg:justify-start space-x-4">
            {socialIcons.map(({ name, color }) => {
              const Icon = SocialIcon(name);
              return Icon && (
                <button
                  key={name}
                  className={`${color} w-8 h-8 p-2 rounded-full hover:bg-gray-200 transition-colors`}
                  onClick={() => onNavigation(name)}
                >
                  <Icon />
                </button>
              );
            })}
          </div>
        </div>
        {/* Footer sections */}
        <div className="lg:w-2/3 flex flex-col space-y-4">
          {footerSections.map(({ title, links }) => (
            <div key={title} className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold"></h3>
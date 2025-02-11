import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ socialIcons, footerSections }) => (
  <footer className="bg-blue-900 text-white py-12">
    <div className="mx-auto px-10 w-full">
      <div className="flex flex-col lg:flex-row justify-between gap-12">
        {/* Social Media */}
        <div className="lg:w-1/3 space-y-4">
          <h2 className="text-2xl font-semibold text-center lg:text-left">¡Síguenos!</h2>
          <div className="flex justify-center lg:justify-start space-x-4">
            {socialIcons.map(({ name, color }) => (
              <button key={name} className={`${color} transition-colors`} aria-label={`Ir a ${name}`}>
                <name.className="h-6 w-6" />
              </button>
            ))}
          </div>
        </div>
        {/* Footer Links */}
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-12">
          {Object.values(footerSections).map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.route} // Usa la ruta definida en el objeto
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name} {/* Muestra el nombre del enlace */}
                    </Link>
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

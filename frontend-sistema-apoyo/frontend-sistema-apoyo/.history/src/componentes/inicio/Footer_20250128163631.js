import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const SocialIcon = (name) => {
  switch (name.toLowerCase()) {
    case 'facebook':
      return FaFacebook;
    case 'twitter':
      return FaTwitter;
    case 'instagram':
      return FaInstagram;
    default:
      return null;
  }
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
              {socialIcons.map(({ name, color }) => {
                const Icon = SocialIcon(name);
                return Icon && (
                  <button
                    key={name}
                    className={`${color} transition-colors`}
                    aria-label={`Ir a ${name}`}
                  >
                    <Icon className="h-6 w-6" />
                  </button>
                );
              })}
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
                        to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {link}
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
    <div className="bg-blue-900 text-center text-gray-400 text-sm py-4">
      © 2025 - Todos los derechos reservados por EduMatch
    </div>
  </>
);

Footer.defaultProps = {
  socialIcons: [],
  footerSections: {},
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom'; // Asumiendo que estás usando react-router
import { Menu, X } from 'lucide-react';

const HeaderForo = ({ logo }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-10">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 md:h-16" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600">Inicio</Link>
          <Link to="/about" className="hover:text-blue-600">Acerca de</Link>
          <Link to="/services" className="hover:text-blue-600">Servicios</Link>
          <Link to="/contact" className="hover:text-blue-600">Contacto</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Menu" className="text-gray-700">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4">
          <nav className="space-y-4">
            <Link to="/" className="block text-lg font-medium text-gray-700">Inicio</Link>
            <Link to="/about" className="block text-lg font-medium text-gray-700">Acerca de</Link>
            <Link to="/services" className="block text-lg font-medium text-gray-700">Servicios</Link>
            <Link to="/contact" className="block text-lg font-medium text-gray-700">Contacto</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderForo;

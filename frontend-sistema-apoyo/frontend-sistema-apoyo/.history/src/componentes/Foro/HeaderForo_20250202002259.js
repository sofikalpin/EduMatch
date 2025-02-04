import React from 'react';
import { ChevronDown } from 'lucide-react';

const Header = ({ onNavigate, logo }) => {
  const handleLogoClick = () => {
    onNavigate('/'); // Redirige a la página de inicio
  };

  return (
    <header className="flex items-center justify-between p-6" style={{ backgroundColor: '#00A89F' }}>
      <img
        src={logo}
        alt="Logo"
        className="h-12 cursor-pointer" // Agregamos el cursor pointer para hacerlo clickeable
        onClick={handleLogoClick}
      />
      <nav className="flex gap-6 justify-end flex-1">
        <button
          onClick={() => onNavigate('/inicioprofesor')}
          className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors"
        >
          Profesores
        </button>
        <button
          className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors flex items-center gap-1"
        >
          Programas
          <ChevronDown className="w-5 h-5" />
        </button>
        <button
          onClick={() => onNavigate('/informacion')}
          className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors"
        >
          Conocenos
        </button>
      </nav>
    </header>
  );
};

export default Header;
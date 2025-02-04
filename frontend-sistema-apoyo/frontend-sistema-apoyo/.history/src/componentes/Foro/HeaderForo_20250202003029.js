import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Header = ({ onNavigate, logo }) => {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  const handleLogoClick = () => {
    onNavigate('/'); // Redirige a la página de inicio
  };

  return (
    <header className="flex items-center justify-between p-6" style={{ backgroundColor: '#00A89F' }}>
      <img
        src={logo}
        alt="Logo"
        className="h-12 cursor-pointer"
        onClick={handleLogoClick}
      />
      <nav className="flex gap-6 justify-end flex-1">
        <button
          onClick={() => onNavigate('/inicioprofesor')}
          className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors"
        >
          Profesores
        </button>
        <div className="relative">
          <button
            onMouseEnter={() => setIsProgramsOpen(true)}
            onMouseLeave={() => setIsProgramsOpen(false)}
            className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors flex items-center gap-1"
          >
            Programas
            <ChevronDown 
              className={`w-5 h-5 transition-transform ${isProgramsOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isProgramsOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
              <button
                onClick={() => onNavigate('/programa1')}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Programa 1
              </button>
              <button
                onClick={() => onNavigate('/programa2')}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Programa 2
              </button>
            </div>
          )}
        </div>
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
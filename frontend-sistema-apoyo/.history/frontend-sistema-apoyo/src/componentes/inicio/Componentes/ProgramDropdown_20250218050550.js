import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProgramDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const levels = [
    { name: 'Nivel Inicial', route: '/NivelInicial', description: 'Para principiantes (A1-A2)' },
    { name: 'Nivel Intermedio', route: '/NivelIntermedio', description: 'Mejora tu fluidez (B1-B2)' },
    { name: 'Nivel Avanzado', route: '/NivelAvanzado', description: 'Perfecciona tu inglés (C1-C2)' },
  ];
  
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl py-2 z-50"
      onMouseLeave={onClose}
    >
      {levels.map((level, index) => (
        <button
          key={index}
          onClick={() => navigate(level.route)}
          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors group"
        >
          <div className="text-gray-900 font-medium group-hover:text-blue-600">
            {level.name}
          </div>
          <div className="text-sm text-gray-500 group-hover:text-blue-500">
            {level.description}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProgramDropdown;
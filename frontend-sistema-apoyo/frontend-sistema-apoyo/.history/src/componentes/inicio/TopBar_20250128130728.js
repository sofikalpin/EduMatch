import React from 'react';

const TopBar = ({ onLogin, onRegister }) => (
  <div className="bg-white py-2 flex justify-end items-center px-6">
    <button
      onClick={onLogin}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg mr-4 hover:bg-blue-600 transition-colors"
    >
      Iniciar Sesión
    </button>
    <button
      onClick={onRegister}
      className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
    >
      Registrarse
    </button>
  </div>
);

export default TopBar;
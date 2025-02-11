import React, { useState } from "react";
import logo from "../../logo/LogoInicio.png";
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Foto from './Mujer con Computadora.jpg';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Componente ForgotPassword
const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage({ type: 'error', text: 'Correo electrónico inválido' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5228/API/Usuario/RecuperarContraseña', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: data.msg });
      } else {
        setMessage({ type: 'error', text: data.msg });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error en la recuperación' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Recuperar Contraseña</h2>
          <p className="text-gray-600 mt-2">Te enviaremos instrucciones a tu correo.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="resetEmail" className="block text-gray-700 text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="resetEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message.text && (
            <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button type="submit" className="w-full p-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar instrucciones'}
            </button>
            <button type="button" onClick={onClose} className="w-full p-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

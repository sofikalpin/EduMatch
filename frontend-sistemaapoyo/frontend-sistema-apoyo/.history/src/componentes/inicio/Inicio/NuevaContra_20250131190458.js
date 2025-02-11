import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../../../logo/LogoInicio.png'; // Ajusta la ruta según la ubicación de tu imagen

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Error al restablecer la contraseña');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#00A89F' }}>
      {/* Header con el logo */}
      <div className="absolute top-0 left-0 p-6">
        <img
          src={logo} // Usa la imagen importada
          alt="Logo"
          className="h-12" // Ajusta el tamaño del logo según necesites
        />
      </div>

      {/* Contenedor del formulario */}
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="newPassword" className="block text-lg font-medium text-gray-700">
              Nueva Contraseña:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">
              Confirmar Contraseña:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-2 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
          >
            Cambiar Contraseña
          </button>
        </form>
        {message && (
          <p
            className={`mt-6 text-center text-lg ${
              message.includes('éxito') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
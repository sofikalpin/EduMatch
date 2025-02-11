import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    contraseña: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => password.length >= 8;

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(formData.email)) newErrors.email = 'Correo inválido';
    if (!validatePassword(formData.contraseña)) newErrors.contraseña = 'Contraseña debe tener al menos 8 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await handleLogin({ email: formData.email, password: formData.contraseña });

      saveUserSession(response.token, formData.rememberMe);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Error al iniciar sesión. Verifica tus credenciales.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await fetch('http://localhost:5228/api/Usuario/IniciarSesion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, contrasenaHash: password }),
      });

      if (!response.ok) throw new Error('Error al iniciar sesión');

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const saveUserSession = (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-md"
          />
          {errors.email && <div className="text-red-600 text-xs">{errors.email}</div>}
        </div>

        <div className="mt-4">
          <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-md"
          />
          {errors.contraseña && <div className="text-red-600 text-xs">{errors.contraseña}</div>}
        </div>

        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm">Recuérdame</label>
        </div>

        {errors.submit && <div className="text-red-600 text-xs mt-2">{errors.submit}</div>}

        <button
          type="submit"
          className="w-full p-2.5 bg-blue-600 text-white font-semibold rounded-lg mt-6"
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
};

export default Login;

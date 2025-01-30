import React, { useState } from "react";
import logo from "../../logo/LogoInicio.png";
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Foto from './Mujer con Computadora.jpg';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    contraseña: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
    }
    if (formData.contraseña.length < 8) {
      newErrors.contraseña = 'La contraseña debe tener al menos 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveUserSession = (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5228/API/Usuario/IniciarSesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: formData.email,
          contrasenaHash: formData.contraseña,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.status) {
        throw new Error(data.msg || "Error al iniciar sesión");
      }

      saveUserSession(data.token, formData.rememberMe);
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        submit: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const response = await auth2.signIn();
      const token = response.getAuthResponse().id_token;
  
      return { token };
    } catch (error) {
      throw new Error('Google sign-in failed');
    }
  };
  
  const handleGoogleClick = async () => {
    try {
      const response = await handleGoogleSignIn();
      saveUserSession(response.token, formData.rememberMe);
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        submit: 'Falló el inicio de sesión con Google'
      });
    }
  };
  
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gray-100">
        <img src={Foto} alt="Imagen" className="w-full h-full object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4">
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto mb-6" style={{ width: '380px' }} />

          <div className="w-full max-w-md mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-gray-900">Iniciar Sesión</h1>
              <p className="text-gray-600">¡Bienvenido! Ingrese sus datos.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 text-left">
                  Correo electrónico
                </label>
                <input
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>

              <div>
                <label htmlFor="contraseña" className="block text-gray-700 text-left">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="contraseña"
                    type={showPassword ? 'text' : 'password'}
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                {errors.contraseña && (
                  <span className="text-red-500 text-sm">{errors.contraseña}</span>
                )}
              </div>

              <button 
                type="submit" 
                className="w-full p-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>

              {errors.submit && (
                <div className="text-red-500 text-sm mt-2">{errors.submit}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

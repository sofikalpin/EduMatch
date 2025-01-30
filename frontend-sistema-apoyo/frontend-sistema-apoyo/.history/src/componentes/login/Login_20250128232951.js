import React, { useState } from "react";
import logo from "../../logo/LogoInicio.png";
import { FaGoogle } from 'react-icons/fa';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom'; // Importar Link

// Función que maneja el inicio de sesión
const handleLogin = async ({ email, password }) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

// Función para guardar la sesión del usuario
const saveUserSession = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
};

// Función para manejar el inicio de sesión con Google
const handleGoogleSignIn = async () => {
  try {
    const response = await window.gapi.auth2.getAuthInstance().signIn();
    const token = response.getAuthResponse().id_token;
    return { token }; 
  } catch (error) {
    throw new Error('Google sign-in failed');
  }
};

const Login = () => {
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

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await handleLogin({
        email: formData.email,
        password: formData.contraseña
      });

      saveUserSession(response.token, formData.rememberMe);
    } catch (error) {
      setErrors({
        submit: 'Correo electrónico o contraseña inválidos'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleClick = async () => {
    try {
      const response = await handleGoogleSignIn();
      saveUserSession(response.token, formData.rememberMe);
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
        <img src="path-to-image" alt="Imagen" className="w-full h-full object-cover" />
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
                <label htmlFor="email" className="block text-gray-700 text-left">Correo electrónico</label>
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
                <label htmlFor="contraseña" className="block text-gray-700 text-left">Contraseña</label>
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
                    className="absolute right-3 top-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                {errors.contraseña && <span className="text-red-500 text-sm">{errors.contraseña}</span>}
              </div>

              {errors.submit && <div className="text-red-500">{errors.submit}</div>}

              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
              </button>
            </form>

            <div className="mt-4 text-sm">
              <Link to="#" onClick={() => setShowForgotPassword(true)} className="text-blue-600">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <div className="mt-4">
              <button
                onClick={handleGoogleClick}
                className="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center space-x-2"
              >
                <FaGoogle size={20} />
                <span>Iniciar sesión con Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)} />}
    </div>
  );
};

export default Login;

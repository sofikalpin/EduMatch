import React, { useState } from "react";
import logo from "../../logo/LogoInicio.png";
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Foto from './Mujer con Computadora.jpg';
import { X } from 'lucide-react';

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
      setMessage({ type: 'error', text: 'Por favor ingresa un correo electrónico válido' });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset email');
      }

      setMessage({ 
        type: 'success', 
        text: 'Te hemos enviado un correo con las instrucciones para restablecer tu contraseña'
      });
      setEmail('');
      
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Hubo un error al enviar el correo. Por favor intenta nuevamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Recuperar Contraseña
          </h2>
          <p className="text-gray-600 mt-2">
            Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
          </p>
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
            <div className={`p-3 rounded-lg text-sm ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button 
              type="submit" 
              className="w-full p-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar instrucciones'}
            </button>
            
            <button 
              type="button"
              onClick={onClose}
              className="w-full p-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
  // Nuevo estado para controlar la visibilidad del modal
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

    if (!validatePassword(formData.contraseña)) {
      newErrors.contraseña = 'La contraseña debe tener al menos 8 caracteres';
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
      {/* Left Panel with Image */}
      <div className="w-full md:w-1/2 bg-gray-100">
        <img src={Foto} alt="Imagen" className="w-full h-full object-cover" />
      </div>

      {/* Right Panel */}
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
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                {errors.contraseña && <span className="text-red-500 text-sm">{errors.contraseña}</span>}
              </div>

              <div className="flex items-center justify-between">
                <button 
                  type="button"
                  onClick={() => setShowForgotPassword(true)} 
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  ¿Olvidaste la contraseña?
                </button>
              </div>

              <button 
                type="submit" 
                className="w-full p-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>

              {errors.submit && <div className="text-red-500 text-sm mt-2">{errors.submit}</div>}

              <div className="my-4">
                <span className="text-gray-500">o</span>
              </div>

              <button
                type="button"
                className="w-full p-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 flex items-center justify-center space-x-2"
                onClick={handleGoogleClick}
              >
                <FaGoogle className="w-5 h-5" />
                <span>Ingresa con Google</span>
              </button>

              <p className="mt-4 text-sm text-gray-600">
                ¿No tienes cuenta? {' '}
                <a href="#" className="text-blue-600 hover:text-blue-800">Regístrate gratis</a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de Olvidé mi contraseña */}
      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

export default Login;
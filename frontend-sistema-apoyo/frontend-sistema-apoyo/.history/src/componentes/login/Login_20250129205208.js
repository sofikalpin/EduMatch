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

    try {
      const response = await fetch('http://localhost:5228/API/Usuario/IniciarSesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email,
          contrasenaHash: '',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Error al enviar la solicitud');
      }

      const data = await response.json();
      setMessage({ type: 'success', text: 'Se han enviado las instrucciones a tu correo.' });
    } catch (error) {
      console.error('Error en submit:', error);
      setMessage({ type: 'error', text: error.message || 'Error al enviar la solicitud.' });
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
  try {
    console.log("Enviando solicitud al backend...");
    const response = await fetch('http://localhost:5228/api/Usuario/IniciarSesion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correo: email,
        contrasenaHash: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error del backend:', errorData);
      throw new Error(errorData.msg || 'Error al iniciar sesión');
    }

    const data = await response.json();
    console.log('Respuesta del backend:', data);
    return data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};

// Función para guardar la sesión del usuario
const saveUserSession = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
};

// Componente principal Login
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
  
      console.log('Respuesta del login:', response);
  
      saveUserSession(response.token, formData.rememberMe);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error en submit:', error);
      setErrors({
        submit: error.message || 'Error al iniciar sesión. Por favor verifica tus credenciales.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Panel izquierdo con imagen */}
      <div className="w-full md:w-1/2 bg-gray-100">
        <img src={Foto} alt="Imagen" className="w-full h-full object-cover" />
      </div>

      {/* Panel derecho */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4">
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto mb-6" style={{ width: '380px' }} />

          <div className="w-full max-w-md mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-gray-900">Iniciar Sesión</h1>
              <p className="text-gray-600">¡Bienvenido! Ingrese sus datos.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo de email */}
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

              {/* Campo de contraseña */}
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

              {/* Olvidé contraseña */}
              <div className="flex items-center justify-between">
                <button 
                  type="button"
                  onClick={() => setShowForgotPassword(true)} 
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  ¿Olvidaste la contraseña?
                </button>
              </div>

              {/* Botón de inicio de sesión */}
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

              {/* Link de registro */}
              <p className="mt-4 text-sm text-gray-600">
                ¿No tienes cuenta? {' '}
                <Link to="/registrarse" className="text-blue-600 hover:text-blue-800">
                  Regístrate gratis
                </Link>
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
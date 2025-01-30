import React, { useState } from "react";
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import logo from "../../logo/LogoInicio.png";
import Foto from './Mujer con Computadora.jpg';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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

      if (!response.ok) throw new Error('Error al iniciar sesión');

      const data = await response.json();
      if (data.status) {
        localStorage.setItem('token', data.token);
        window.location.href = '/';
      } else {
        setMessage({ type: 'error', text: data.msg });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al procesar la solicitud' });
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
              className="w-full p-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
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
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
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
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5228/api/Usuario/IniciarSesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: formData.email,
          contrasenaHash: formData.contraseña,
        }),
      });

      if (!response.ok) throw new Error('Error al iniciar sesión');

      const data = await response.json();
      if (formData.rememberMe) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        submit: 'Error al iniciar sesión. Por favor verifica tus credenciales.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    if (formData.rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
    navigate('/dashboard');
  };

  return (
    <GoogleOAuthProvider clientId="765873505151-4dd80cf5m057ke0uoahifo4fa0t8fa3u.apps.googleusercontent.com">
      <div className="flex h-screen flex-col md:flex-row ">
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
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
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
                  className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>

                {errors.submit && (
                  <div className="text-red-500 text-sm mt-2">{errors.submit}</div>
                )}

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-gray-500">o</span>
                  </div>
                </div>

                <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    setErrors({
                      submit: 'Falló el inicio de sesión con Google'
                    });
                  }}
                  useOneTap
                  render={({ onClick }) => (
                    <button
                      type="button"
                      onClick={onClick}
                      className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center ml-auto"
                    >
                      <FaGoogle className="w-5 h-5 mr-2" />
                      <span>Continuar con Google</span>
                    </button>
                  )}
                
                />
                </div>

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

        {showForgotPassword && (
          <ForgotPassword onClose={() => setShowForgotPassword(false)} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
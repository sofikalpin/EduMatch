import React, { useState } from "react";

import { validateEmail, validatePassword, handleGoogleSignIn, handleLogin, saveUserSession } from "./LoginUtils";  
import logo from "../../logo/LogoInicio.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    contraseña: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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
      // Handle successful login (e.g., redirect to dashboard)
      
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
      // Handle successful Google sign-in
    } catch (error) {
      setErrors({
        submit: 'Falló el inicio de sesión con Google'
      });
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="hidden md:block w-1/2 bg-gray-100"></div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto mb-6" />
          <div className="w-full max-w-md mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-gray-900">Iniciar Sesión</h1>
              <p className="text-gray-600">¡Bienvenido! Ingrese sus datos.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700">Correo electrónico</label>
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
                <label htmlFor="contraseña" className="block text-gray-700">Contraseña</label>
                <input
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="contraseña"
                  type="password"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  required
                />
                {errors.contraseña && <span className="text-red-500 text-sm">{errors.contraseña}</span>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Recordarme
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">¿Olvidaste la contraseña?</a>
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
                <img src="/api/placeholder/18/18" alt="Icono de Google" className="w-5 h-5" />
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
    </div>
  );
};

export default Login;

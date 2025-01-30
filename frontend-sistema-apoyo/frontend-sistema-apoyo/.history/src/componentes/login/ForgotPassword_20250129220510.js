import React, { useState } from "react";
import logo from "../../logo/LogoInicio.png";
import { useNavigate, Link } from 'react-router-dom'; // Importa Link aquí
import Foto from './Mujer con Computadora.jpg';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import ForgotPassword from './ForgotPassword';

// Resto del código...

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

  // Resto del código...

  return (
    <GoogleOAuthProvider clientId="765873505151-4dd80cf5m057ke0uoahifo4fa0t8fa3u.apps.googleusercontent.com">
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

                {/* Separador */}
                <div className="my-4">
                  <span className="text-gray-500">o</span>
                </div>

                {/* Botón de Google */}
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    // Aquí puedes manejar la respuesta de Google y enviar el token a tu backend
                    saveUserSession(credentialResponse.credential, formData.rememberMe);
                    navigate('/dashboard');
                  }}
                  onError={() => {
                    console.log('Login Failed');
                    setErrors({
                      submit: 'Falló el inicio de sesión con Google'
                    });
                  }}
                  useOneTap
                />

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
    </GoogleOAuthProvider>
  );
};

export default Login;
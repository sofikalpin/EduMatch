import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo';  // Asumiendo que tienes una imagen de logo
import Imagen1 from './imagen1';  // Asumiendo que tienes una imagen para el fondo

export default function Inicio() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateEmail(loginForm.email)) newErrors.loginEmail = 'Email inválido';
    if (loginForm.password.length < 6) newErrors.loginPassword = 'La contraseña debe tener al menos 6 caracteres';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Login exitoso', loginForm);
      setShowLoginModal(false);
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Login Button at the top */}
      <div className="bg-white py-4 shadow-md">
        <div className="container mx-auto flex justify-end">
          <button onClick={() => setShowLoginModal(true)} className="px-4 py-2 bg-green-500 text-white rounded-lg">
            Iniciar Sesión
          </button>
        </div>
      </div>

      {/* Navbar */}
      <header className="flex items-center justify-between p-6 bg-blue-900 text-white">
        <img src={logo} alt="Logo" className="h-12" />
        <nav className="flex gap-6">
          <Link to="#">Profesores</Link>
          <Link to="#">Programa</Link>
          <Link to="#">Herramientas</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-cover bg-center p-12 text-center" style={{ backgroundImage: `url(${Imagen1})` }}>
        <h1 className="text-4xl font-bold text-white">Aprende Inglés de Manera Efectiva</h1>
        <p className="text-xl text-white mt-4">Clases personalizadas para todos los niveles con profesores nativos certificados</p>
        <div className="mt-6 flex justify-center gap-4">
          <button onClick={() => setShowRegisterModal(true)} className="px-6 py-3 bg-white text-blue-900 rounded-full">
            Comienza Ahora
          </button>
          <button className="px-6 py-3 border-2 border-white text-white rounded-full">
            Conoce Más
          </button>
        </div>
      </section>

      {/* Modal de Login */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium" htmlFor="loginEmail">Email</label>
                <input
                  type="email"
                  id="loginEmail"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                />
                {errors.loginEmail && <p className="text-red-500 text-xs mt-1">{errors.loginEmail}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium" htmlFor="loginPassword">Contraseña</label>
                <input
                  type="password"
                  id="loginPassword"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
                {errors.loginPassword && <p className="text-red-500 text-xs mt-1">{errors.loginPassword}</p>}
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Iniciar Sesión</button>
            </form>
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 text-red-500 hover:text-red-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Resto del contenido */}
    </div>
  );
}

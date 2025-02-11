import React, { useState } from "react";
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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
      newErrors.email = 'Correo electrónico inválido';
    }
   

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsLoading(true);
  
    try {
      const response = await fetch('http://localhost:5228/API/Usuario/IniciarSesion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: formData.email,
          contrasenaHash: formData.contraseña
        }),
      });

      const data = await response.json();
      
      if (!response.ok || !data.status) {
        throw new Error(data.msg || "Error al iniciar sesión");
      }

      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Iniciar Sesión</h1>
          <p className="text-gray-600">¡Bienvenido! Ingrese sus datos.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700">Correo electrónico</label>
              <input
                className="w-full p-3 mt-2 border rounded-lg"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>

            <div>
              <label htmlFor="contraseña" className="block text-gray-700">Contraseña</label>
              <input
                className="w-full p-3 mt-2 border rounded-lg"
                id="contraseña"
                type="password"
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
              {errors.contraseña && <span className="text-red-500">{errors.contraseña}</span>}
            </div>

            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg" disabled={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>

            {errors.submit && <div className="text-red-500">{errors.submit}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

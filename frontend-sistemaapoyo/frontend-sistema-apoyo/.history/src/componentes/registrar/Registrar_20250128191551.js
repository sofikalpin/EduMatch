import React, { useState } from "react";
import './Registrar.css';
import logo from '../../logo/LogoInicio.png';

export const Registrar = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    nivel: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    nivel: "",
  });

  const niveles = [
    { "idnivel": 1, "descripcion": "A1: Principiante" },
    { "idnivel": 2, "descripcion": "A2: Básico" },
    { "idnivel": 3, "descripcion": "B1: Pre-intermedio" },
    { "idnivel": 4, "descripcion": "B2: Intermedio" },
    { "idnivel": 5, "descripcion": "C1: Intermedio-alto" },
    { "idnivel": 6, "descripcion": "C2: Avanzado" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep = () => {
    let newErrors = { ...errors };

    if (step === 1) {
      if (!formData.userType) {
        newErrors.userType = "Debes seleccionar un tipo de usuario";
      } else {
        newErrors.userType = "";
      }
      if (!formData.nivel) {
        newErrors.nivel = "Debes seleccionar tu nivel";
      } else {
        newErrors.nivel = "";
      }
    } else {
      newErrors.userType = "";
      newErrors.nivel = "";
    }

    if (step === 2 && !formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else {
      newErrors.name = "";
    }

    if (step === 2 && !formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else {
      newErrors.email = "";
    }

    if (step === 3 && !formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else {
      newErrors.password = "";
    }

    if (step === 3 && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Datos del formulario:", formData);
      alert("Registro exitoso");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="mb-8">
        <img src={logo} alt="Logo" className="w-32" />
      </header>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <div className="relative">
          <div
            className="absolute inset-x-0 top-0 h-1 bg-blue-500"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
        <main>
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-semibold mb-6">¿Quién eres y cuál es tu nivel?</h1>
              <label className="block mb-4">
                <span className="block text-sm font-medium text-gray-700">*Elige el tipo de Usuario</span>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="profesor">Profesor</option>
                  <option value="alumno">Alumno</option>
                </select>
              </label>
              {errors.userType && <span className="text-red-500 text-sm">{errors.userType}</span>}

              <label className="block mb-4">
                <span className="block text-sm font-medium text-gray-700">*Selecciona tu nivel</span>
                <select
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecciona tu nivel</option>
                  {niveles.map((nivel) => (
                    <option key={nivel.idnivel} value={nivel.idnivel}>
                      {nivel.descripcion}
                    </option>
                  ))}
                </select>
              </label>
              {errors.nivel && <span className="text-red-500 text-sm">{errors.nivel}</span>}

              <button
                className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md"
                onClick={handleNext}
              >
                Continuar
              </button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h1 className="text-2xl font-semibold mb-6">¿Cuál es tu nombre y correo electrónico?</h1>
              <label className="block mb-4">
                <span className="block text-sm font-medium text-gray-700">Nombre:</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ingresa tu nombre"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

              <label className="block mb-4">
                <span className="block text-sm font-medium text-gray-700">Correo electrónico:</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingresa tu correo"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

              <button
                className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md"
                onClick={handleNext}
              >
                Continuar
              </button>
            </div>
          )}
          {step === 3 && (
            <div>
              <h1 className="text-2xl font-semibold mb-6">¿Cuál es tu contraseña?</h1>
              <label className="block mb-4">
                <span className="block text-sm font-medium text-gray-700">Contraseña:</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Crea una contraseña"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

              <label className="block mb-4">
                <span className="block text-sm font-medium text-gray-700">Confirmar contraseña:</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirma tu contraseña"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
              )}

              <div>
                <button
                  className="w-full py-2 bg-blue-500 text-white rounded-md"
                  onClick={handleSubmit}
                >
                  Registrarse
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

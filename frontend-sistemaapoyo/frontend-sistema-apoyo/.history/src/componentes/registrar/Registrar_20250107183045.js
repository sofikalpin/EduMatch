import React, { useState } from "react";
import './Registrar.css';
import logo from '../../logo/LogoInicio.png';

export const Registrar = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
    nivel: "", // Nuevo campo para el nivel
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
    nivel: "", // Nuevo campo de error
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
      newErrors.userType = ""; // Limpiar el error si ya no estamos en el primer paso
      newErrors.nivel = ""; // Limpiar el error del nivel
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
    <div className="container">
      <header className="header">
        <img src={logo} alt="Logo" className="header-logo" />
      </header>
      <div className="progress-container">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>
      <main className="main-content">
        {step === 1 && (
          <div>
            <h1 className="question">¿Quién eres y Cual es tu nivel?</h1>
            <label className="label">
              *Elige el tipo de Usuario
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="input"
              >
                <option value="">Selecciona una opción</option>
                <option value="profesor">Profesor</option>
                <option value="alumno">Alumno</option>
              </select>
            </label>
            {errors.userType && <span className="error">{errors.userType}</span>}
            
            <label className="label">
              *Selecciona tu nivel
              <select
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                className="input"
              >
                <option value="">Selecciona tu nivel</option>
                {niveles.map((nivel) => (
                  <option key={nivel.idnivel} value={nivel.idnivel}>
                    {nivel.descripcion}
                  </option>
                ))}
              </select>
            </label>
            {errors.nivel && <span className="error">{errors.nivel}</span>}

            <button className="button" onClick={handleNext}>
              Continuar
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h1 className="question">¿Cuál es tu nombre y correo electrónico?</h1>
            <label className="label">
              Nombre:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                className="input"
              />
            </label>
            {errors.name && <span className="error">{errors.name}</span>}
            <label className="label">
              Correo electrónico:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo"
                className="input"
              />
            </label>
            {errors.email && <span className="error">{errors.email}</span>}
            <button className="button" onClick={handleNext}>
              Continuar
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h1 className="question">¿Cuál es tu contraseña?</h1>
            <label className="label">
              Contraseña
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Crea una contraseña"
                className="input"
              />
            </label>
            {errors.password && <span className="error">{errors.password}</span>}
            <div>
              <button className="button" onClick={handleSubmit}>
                Registrarse
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

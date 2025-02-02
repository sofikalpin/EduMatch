import React, { useState } from "react";
import './Registrar.css';
import logo from '../../logo/LogoInicio.png';

export const Registrar = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep = () => {
    let newErrors = { ...errors };
    if (step === 1 && !formData.name.trim()) {
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
            <h1 className="question">¿Cuál es tu nombre?</h1>
            <label className="label">
              *Nombre
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
            <button className="button" onClick={handleNext}>
              Continuar
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h1 className="question">¿Cuál es tu correo electrónico?</h1>
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
            <div>
              <button className="button" onClick={handleNext}>
                Continuar
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h1 className="question">¿Cuál es tu contraseña?</h1>
            <label className="label">
              Contraseña:
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

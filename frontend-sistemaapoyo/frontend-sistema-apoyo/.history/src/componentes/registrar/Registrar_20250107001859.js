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
    let valid = true;
    let currentErrors = { ...errors };

    if (step === 1 && !formData.name.trim()) {
      currentErrors.name = "El nombre es obligatorio";
      valid = false;
    } else {
      currentErrors.name = "";
    }

    if (step === 2 && !formData.email.trim()) {
      currentErrors.email = "El correo electrónico es obligatorio";
      valid = false;
    } else {
      currentErrors.email = "";
    }

    if (step === 3 && !formData.password.trim()) {
      currentErrors.password = "La contraseña es obligatoria";
      valid = false;
    } else {
      currentErrors.password = "";
    }

    setErrors(currentErrors);
    return valid;
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
            aria-label={`Progreso: Paso ${step} de 3`}
          ></div>
        </div>
        <p className="progress-text">Paso {step} de 3</p>
      </div>
      <main className="main-content">
        {step === 1 && (
          <div>
            <h1 className="question">¿Cuál es tu nombre?</h1>
            <label className="label">
              Nombre:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                className="input"
                aria-describedby="name-error"
              />
              {errors.name && <span id="name-error" className="error-text">{errors.name}</span>}
            </label>
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
                aria-describedby="email-error"
              />
              {errors.email && <span id="email-error" className="error-text">{errors.email}</span>}
            </label>
            <div>
              <button className="button backButton" onClick={handleBack}>
                Atrás
              </button>
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
                aria-describedby="password-error"
              />
              {errors.password && <span id="password-error" className="error-text">{errors.password}</span>}
            </label>
            <div>
              <button className="button backButton" onClick={handleBack}>
                Atrás
              </button>
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

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep = () => {
    if (step === 1 && !formData.name.trim()) {
      alert("El nombre es obligatorio");
      return false;
    }
    if (step === 2 && !formData.email.trim()) {
      alert("El correo electrónico es obligatorio");
      return false;
    }
    if (step === 3 && !formData.password.trim()) {
      alert("La contraseña es obligatoria");
      return false;
    }
    return true;
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
        <h1 className="header-title">Registro</h1>
      </header>
      <main className="main-content">
        {step === 1 && (
          <div>
            <p className="question">¿Cuál es tu nombre?</p>
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
            <button className="button" onClick={handleNext}>
              Continuar
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
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

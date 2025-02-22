import React, { useState } from "react";

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
    { idnivel: 1, descripcion: "A1: Principiante" },
    { idnivel: 2, descripcion: "A2: Básico" },
    { idnivel: 3, descripcion: "B1: Pre-intermedio" },
    { idnivel: 4, descripcion: "B2: Intermedio" },
    { idnivel: 5, descripcion: "C1: Intermedio-alto" },
    { idnivel: 6, descripcion: "C2: Avanzado" },
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
    <div className="w-full max-w-[400px] mx-auto text-center pt-[100px] h-screen box-border">
      <header className="w-full flex items-center justify-between p-4 bg-[#688fb8] text-white box-shadow-md fixed top-0 left-0 z-10">
        <img src={logo} alt="Logo" className="h-[50px]" />
      </header>
      <div className="mt-10 text-center">
        <div className="w-full h-[12px] bg-[#e0e0e0] rounded-full overflow-hidden mt-5">
          <div
            className="h-full bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] transition-width duration-300 ease-in-out rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>
      <main className="p-4">
        {step === 1 && (
          <div>
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold text-left">
              ¿Quién eres y cuál es tu nivel?
            </h1>
            <label className="block text-left text-[20px] mt-[14%]">
              *Elige el tipo de Usuario
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="h-[60px] p-4 border border-[#e0e0e0] rounded-md text-[15px] w-full mt-[5%] box-border"
              >
                <option value="">Selecciona una opción</option>
                <option value="profesor">Profesor</option>
                <option value="alumno">Alumno</option>
              </select>
            </label>
            {errors.userType && <span className="text-red-500 text-[12px] mt-1 block">{errors.userType}</span>}

            <label className="block text-left text-[20px] mt-[14%]">
              *Selecciona tu nivel
              <select
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                className="h-[60px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] max-w-[500px] box-border"
              >
                <option value="">Selecciona tu nivel</option>
                {niveles.map((nivel) => (
                  <option key={nivel.idnivel} value={nivel.idnivel}>
                    {nivel.descripcion}
                  </option>
                ))}
              </select>
            </label>
            {errors.nivel && <span className="text-red-500 text-[12px] mt-1 block">{errors.nivel}</span>}

            <button
              className="h-[48px] mt-6 bg-[#f0f0f0] text-[#666] border-none rounded-md text-[16px] font-medium cursor-pointer transition-all duration-200 w-full max-w-[500px]"
              onClick={handleNext}
            >
              Continuar
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold text-left">
              ¿Cuál es tu nombre y correo electrónico?
            </h1>
            <label className="block text-left text-[20px] mt-[14%]">
              Nombre:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                className="h-[48px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] max-w-[500px] box-border"
              />
            </label>
            {errors.name && <span className="text-red-500 text-[12px] mt-1 block">{errors.name}</span>}
            <label className="block text-left text-[20px] mt-[14%]">
              Correo electrónico:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo"
                className="h-[48px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] max-w-[500px] box-border"
              />
            </label>
            {errors.email && <span className="text-red-500 text-[12px] mt-1 block">{errors.email}</span>}
            <button
              className="h-[48px] mt-6 bg-[#f0f0f0] text-[#666] border-none rounded-md text-[16px] font-medium cursor-pointer transition-all duration-200 w-full max-w-[500px]"
              onClick={handleNext}
            >
              Continuar
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold text-left">
              ¿Cuál es tu contraseña?
            </h1>
            <label className="block text-left text-[20px] mt-[14%]">
              Contraseña:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Crea una contraseña"
                className="h-[48px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] max-w-[500px] box-border"
              />
            </label>
            {errors.password && <span className="text-red-500 text-[12px] mt-1 block">{errors.password}</span>}

            <label className="block text-left text-[20px] mt-[14%]">
              Confirmar contraseña:
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
                className="h-[48px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] max-w-[500px] box-border"
              />
            </label>
            {errors.confirmPassword && <span className="text-red-500 text-[12px] mt-1 block">{errors.confirmPassword}</span>}

            <div>
              <button
                className="h-[48px] mt-6 bg-[#f0f0f0] text-[#666] border-none rounded-md text-[16px] font-medium cursor-pointer transition-all duration-200 w-full max-w-[500px]"
                onClick={handleSubmit}
              >
                Finalizar
              </button>
              <button
                className="h-[48px] mt-6 bg-[#f0f0f0] text-[#666] border-none rounded-md text-[16px] font-medium cursor-pointer transition-all duration-200 w-full max-w-[500px]"
                onClick={handleBack}
              >
                Regresar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import logo from "../../logo/LogoInicio.png";

export const Registrar = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    nivel: "",
    fileSelected: false,
    linkedinClicked: false,
  });
  const [errors, setErrors] = useState({
    userType: "",
    nivel: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep = () => {
    let newErrors = { ...errors };

    if (step === 1 && !formData.userType) {
      newErrors.userType = "Debes seleccionar un tipo de usuario";
    }

    if (step === 2 && !formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (step === 3) {
      if (!formData.email.trim()) {
        newErrors.email = "El correo electrónico es obligatorio";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        newErrors.email = "El correo electrónico no es válido";
      } else {
        newErrors.email = "";
      }
    }

    if (step === 4) {
      if (!formData.password.trim()) {
        newErrors.password = "La contraseña es obligatoria";
      } else {
        newErrors.password = "";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      } else {
        newErrors.confirmPassword = "";
      }
    }

    if (formData.userType === "profesor" && !formData.fileSelected && !formData.linkedinClicked) {
      newErrors.file = "Debes seleccionar un archivo o ingresar a LinkedIn";
    } else {
      newErrors.file = "";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  useEffect(() => {
    validateStep();
  }, [formData, step]);

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
      <header className="w-full flex items-center justify-between p-4 bg-[#00A89F] text-white box-shadow-md fixed top-0 left-0 z-10">
        <img
          src={logo}
          alt="Logo"
          className="h-12 cursor-pointer"
          onClick={() => (window.location.href = "/home")}
        />
      </header>

      <div className="mt-10 text-center">
        <div className="w-full h-[12px] bg-[#e0e0e0] rounded-full overflow-hidden mt-5">
          <div
            className="h-full bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] transition-width duration-300 ease-in-out rounded-full"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <main className="p-4">
        {/* Paso 1: Selección de usuario */}
        {step === 1 && (
          <div>
            <h1 className="text-[24px] font-semibold text-left mb-6">¿Quién eres?</h1>
            <label htmlFor="userType" className="block text-left text-[16px]">
              Tipo de Usuario:
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="h-[40px] p-2 border rounded w-full mt-2"
              >
                <option value="">Selecciona una opción</option>
                <option value="profesor">Profesor</option>
                <option value="alumno">Alumno</option>
              </select>
              {errors.userType && <span className="text-red-500 text-sm">{errors.userType}</span>}
            </label>

            <button onClick={handleNext} className="w-full bg-[#00A89F] text-white p-2 mt-6 rounded">
              Continuar
            </button>
          </div>
        )}

        {/* Paso 2: Nombre */}
        {step === 2 && (
          <div>
            <h1 className="text-[24px] font-semibold text-left mb-6">Ingresa tu nombre</h1>
            <label htmlFor="name" className="block text-left text-[16px]">
              Nombre:
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded p-2 mt-2"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </label>

            <button onClick={handleNext} className="w-full bg-[#00A89F] text-white p-2 mt-6 rounded">
              Continuar
            </button>
          </div>
        )}

        {/* Paso 3: Correo Electrónico */}
        {step === 3 && (
          <div>
            <h1 className="text-[24px] font-semibold text-left mb-6">Ingresa tu correo electrónico</h1>
            <label htmlFor="email" className="block text-left text-[16px]">
              Correo Electrónico:
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded p-2 mt-2"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </label>

            <button onClick={handleNext} className="w-full bg-[#00A89F] text-white p-2 mt-6 rounded">
              Continuar
            </button>
          </div>
        )}

        {/* Paso 4: Contraseña */}
        {step === 4 && (
          <div>
            <h1 className="text-[24px] font-semibold text-left mb-6">Crea una contraseña</h1>
            <label htmlFor="password" className="block text-left text-[16px]">
              Contraseña:
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded p-2 mt-2"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </label>

            <label htmlFor="confirmPassword" className="block text-left text-[16px] mt-4">
              Confirmar Contraseña:
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded p-2 mt-2"
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
            </label>

            <button onClick={handleSubmit} className="w-full bg-[#00A89F] text-white p-2 mt-6 rounded">
              Registrarme
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

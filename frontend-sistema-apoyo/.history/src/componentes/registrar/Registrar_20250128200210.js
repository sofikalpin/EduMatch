import React, { useState } from "react";
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
    cv: null,
    linkedin: "",
  });
  const [errors, setErrors] = useState({
    userType: "",
    nivel: "",
    cv: "",
    linkedin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, cv: file });
      setErrors({ ...errors, cv: "" });
    } else {
      setErrors({ ...errors, cv: "El archivo debe ser un PDF" });
    }
  };

  const validateStep = () => {
    let newErrors = { ...errors };

    if (step === 1 && !formData.userType) {
      newErrors.userType = "Selecciona un tipo de usuario";
    }
    if (step === 1 && !formData.nivel) {
      newErrors.nivel = "Selecciona tu nivel";
    }
    if (step === 3 && formData.userType === "profesor") {
      if (!formData.cv && !formData.linkedin.trim()) {
        newErrors.cv = "Debes cargar tu CV o ingresar tu perfil de LinkedIn";
        newErrors.linkedin = "Debes cargar tu CV o ingresar tu perfil de LinkedIn";
      } else {
        newErrors.cv = "";
        newErrors.linkedin = "";
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Formulario enviado:", formData);
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

      <main className="p-4">
        {step === 1 && (
          <div>
            <h1 className="text-[24px] font-semibold text-left mb-6">
              ¿Quién eres y cuál es tu nivel?
            </h1>
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
              {errors.userType && (
                <span className="text-red-500 text-sm">{errors.userType}</span>
              )}
            </label>

            <label htmlFor="nivel" className="block text-left text-[16px] mt-4">
              Nivel:
              <select
                id="nivel"
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                className="h-[40px] p-2 border rounded w-full mt-2"
              >
                <option value="">Selecciona tu nivel</option>
                <option value="1">Principiante</option>
                <option value="2">Básico</option>
                <option value="3">Intermedio</option>
                <option value="4">Avanzado</option>
              </select>
              {errors.nivel && (
                <span className="text-red-500 text-sm">{errors.nivel}</span>
              )}
            </label>

            <button
              onClick={handleNext}
              className="w-full bg-[#00A89F] text-white p-2 mt-6 rounded"
            >
              Continuar
            </button>
          </div>
        )}

        {step === 3 && formData.userType === "profesor" && (
          <div>
            <h1 className="text-[24px] font-semibold text-left mb-6">
              Sube tu CV o proporciona LinkedIn
            </h1>

            {/* Área para subir el archivo */}
            <label htmlFor="cv" className="block text-left text-[16px] mt-4">
              Cargar CV:
              <input
                id="cv"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full border rounded p-2 mt-2"
              />
              {errors.cv && (
                <span className="text-red-500 text-sm">{errors.cv}</span>
              )}
            </label>

            {/* Campo para LinkedIn */}
            <label
              htmlFor="linkedin"
              className="block text-left text-[16px] mt-4"
            >
              Enlace a LinkedIn:
              <input
                id="linkedin"
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://www.linkedin.com/in/tu-perfil"
                className="w-full border rounded p-2 mt-2"
              />
              {errors.linkedin && (
                <span className="text-red-500 text-sm">{errors.linkedin}</span>
              )}
            </label>

            {/* Botón que lleva a LinkedIn */}
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#00A89F] mt-4 text-sm underline"
            >
              Ir a LinkedIn para copiar mi perfil
            </a>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#00A89F] text-white p-2 mt-6 rounded"
            >
              Finalizar
            </button>
            <button
              onClick={handleBack}
              className="w-full bg-gray-200 text-black p-2 mt-4 rounded"
            >
              Regresar
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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

  const handleFileChange = (e) => {
    setFormData({ ...formData, fileSelected: true });
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.userType) newErrors.userType = "Debes seleccionar un tipo de usuario";
      if (formData.userType === "profesor" && !formData.fileSelected) {
        newErrors.file = "Debes seleccionar un archivo";
      }
    }

    if (step === 2) {
      if (!formData.name) newErrors.name = "El nombre es obligatorio";
      if (!formData.nivel) newErrors.nivel = "Debes seleccionar tu nivel";
    }

    if (step === 3) {
      if (!formData.email) newErrors.email = "El correo es obligatorio";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Correo inválido";
      }
    }

    if (step === 4) {
      if (!formData.password) newErrors.password = "La contraseña es obligatoria";
      else if (formData.password.length < 6) {
        newErrors.password = "Debe tener al menos 6 caracteres";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirma tu contraseña";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Datos del formulario:", formData);
      alert("Registro exitoso");
      navigate("/login");
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto text-center pt-[100px] h-screen box-border">
      <header className="w-full flex items-center justify-between p-4 bg-[#00A89F] text-white fixed top-0 left-0 z-10">
        <img
          src={logo}
          alt="Logo"
          className="h-12 cursor-pointer"
          onClick={() => navigate("/home")}
        />
      </header>

      <main className="p-4">
        {step === 1 && (
          <div>
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold">¿Quién eres?</h1>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="h-[60px] p-4 border rounded-md w-full"
            >
              <option value="">Selecciona una opción</option>
              <option value="profesor">Profesor</option>
              <option value="alumno">Alumno</option>
            </select>
            {errors.userType && <span className="text-red-500 text-sm">{errors.userType}</span>}

            {formData.userType === "profesor" && (
              <div className="mt-6">
                <button
                  className="h-[48px] bg-[#00A89F] text-white rounded-md w-full"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Ingresar archivo
                </button>
                <input id="fileInput" type="file" onChange={handleFileChange} className="hidden" />
              </div>
            )}
            {errors.file && <span className="text-red-500 text-sm">{errors.file}</span>}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            className="h-[48px] bg-[#f0f0f0] text-[#666] rounded-md w-[48%]"
            onClick={handleBack}
            disabled={step === 1}
          >
            Volver
          </button>
          {step < 4 ? (
            <button
              className={`h-[48px] w-[48%] text-white rounded-md ${
                Object.keys(errors).length > 0 ? "bg-gray-300" : "bg-[#00A89F]"
              }`}
              onClick={handleNext}
              disabled={Object.keys(errors).length > 0}
            >
              Continuar
            </button>
          ) : (
            <button className="h-[48px] bg-[#00A89F] text-white rounded-md w-[48%]" onClick={handleSubmit}>
              Registrarme
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../logo/LogoInicio.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [existingUsers, setExistingUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5228/API/Usuario/ListaUsuarios");
        const users = await response.json();
        setExistingUsers(users);
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (formData.email) {
        checkEmailAvailability(formData.email);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [formData.email]);

  const checkEmailAvailability = async (email) => {
    setIsCheckingEmail(true);
    const emailExists = existingUsers.some((user) => user.correo.toLowerCase() === email.toLowerCase());
    setIsEmailAvailable(!emailExists);

    setErrors((prev) => ({
      ...prev,
      email: emailExists ? "Este correo electrónico ya está registrado" : "",
    }));

    setTimeout(() => setIsCheckingEmail(false), 300);
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Ingresa un correo electrónico válido" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }
  }, []);

  const validateStep = () => {
    let newErrors = {};

    if (step === 1 && !formData.userType) {
      newErrors.userType = "Debes seleccionar un tipo de usuario";
    }
    if (step === 2) {
      if (!formData.name) newErrors.name = "El nombre es obligatorio";
      if (!formData.nivel) newErrors.nivel = "Debes seleccionar tu nivel";
    }
    if (step === 3) {
      if (!formData.email) {
        newErrors.email = "El correo es obligatorio";
      } else if (!isEmailAvailable) {
        newErrors.email = "Este correo electrónico ya está registrado";
      }
    }
    if (step === 4) {
      if (!formData.password) newErrors.password = "La contraseña es obligatoria";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="container mx-auto">
      {step === 3 && (
        <div>
          <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold">¿Cuál es tu correo?</h1>
          <label className="block text-left text-[20px]" htmlFor="email">
            *Correo electrónico
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ejemplo: usuario@dominio.com"
              className={`h-[48px] p-4 border ${
                errors.email ? "border-red-500" : "border-[#e0e0e0]"
              } rounded-md text-[16px] w-full mt-[5%] box-border`}
            />
          </label>
          {isCheckingEmail && <span className="text-gray-500 text-[15px] mt-1 block">Verificando disponibilidad...</span>}
          {errors.email && <span className="text-red-500 text-[15px] mt-1 block">{errors.email}</span>}

          <div className="flex justify-between mt-6">
            <button className="btn btn-secondary w-[48%]" onClick={handleBack}>
              Volver
            </button>
            <button className="btn btn-primary w-[48%]" onClick={handleNext} disabled={!isEmailAvailable}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

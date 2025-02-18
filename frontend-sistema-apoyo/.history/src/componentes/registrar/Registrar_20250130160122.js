import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
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
  const [errors, setErrors] = useState({
    userType: "",
    nivel: "",
    file: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const navigate = useNavigate(); // Inicializa useNavigate

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

  const handleLogoClick = () => {
    window.location.href = "/home";
  };

  const validateStep = () => {
    let newErrors = { ...errors };

    if (step === 1 && !formData.userType) {
      newErrors.userType = "Debes seleccionar un tipo de usuario";
    } else {
      newErrors.userType = "";
    }

    if (formData.userType === "profesor" && !formData.fileSelected) {
      newErrors.file = "Debes seleccionar un archivo";
    } else {
      newErrors.file = "";
    }

    if (step === 2) {
      if (!formData.name) {
        newErrors.name = "El nombre es obligatorio";
      } else {
        newErrors.name = "";
      }

      if (!formData.nivel) {
        newErrors.nivel = "Debes seleccionar tu nivel";
      } else {
        newErrors.nivel = "";
      }
    }

    if (step === 3 && !formData.email) {
      newErrors.email = "El correo es obligatorio";
    } else {
      newErrors.email = "";
    }

    if (step === 4) {
      if (!formData.password) {
        newErrors.password = "La contraseña es obligatoria";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      } else {
        newErrors.password = "";
        newErrors.confirmPassword = "";
      }
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
      navigate("/login"); // Redirige a la página de login
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, fileSelected: true });
    console.log("Archivo seleccionado:", e.target.files[0]);
  };

  return (
    <div className="w-full max-w-[400px] mx-auto text-center pt-[100px] h-screen box-border">
      <header className="w-full flex items-center justify-between p-4 bg-[#00A89F] text-white box-shadow-md fixed top-0 left-0 z-10">
        <img
          src={logo}
          alt="Logo"
          className="h-12 cursor-pointer"
          onClick={handleLogoClick}
        />
      </header>
    </div>
  );
};

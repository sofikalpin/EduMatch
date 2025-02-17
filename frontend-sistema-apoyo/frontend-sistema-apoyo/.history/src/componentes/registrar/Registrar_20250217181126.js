import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../logo/LogoInicio.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Define niveles array
const niveles = [
  { idnivel: 1, descripcion: "Básico" },
  { idnivel: 2, descripcion: "Intermedio" },
  { idnivel: 3, descripcion: "Avanzado" }
];

// Define roles array
const roles = [
  { idrol: 1, descripcion: "profesor" },
  { idrol: 2, descripcion: "alumno" }
];

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
  const [existingEmails, setExistingEmails] = useState([]);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const generateToken = () => crypto.randomUUID();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    fetchExistingEmails();
  }, []);

  const fetchExistingEmails = async () => {
    try {
      const response = await fetch("http://localhost:5228/API/Usuario/ListaUsuarios");
      if (response.ok) {
        const users = await response.json();
        const emails = users.map(user => user.correo.toLowerCase());
        setExistingEmails(emails);
      }
    } catch (error) {
      console.error("Error fetching existing emails:", error);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateEmail = async (email) => {
    setIsCheckingEmail(true);
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors(prev => ({
        ...prev,
        email: "Por favor ingresa un correo electrónico válido"
      }));
      setIsCheckingEmail(false);
      return false;
    }

    const emailExists = existingEmails.includes(email.toLowerCase());
    if (emailExists) {
      setErrors(prev => ({
        ...prev,
        email: "Este correo electrónico ya está registrado"
      }));
      setIsCheckingEmail(false);
      return false;
    }
    
    setErrors(prev => ({
      ...prev,
      email: ""
    }));
    setIsCheckingEmail(false);
    return true;
  };

  const validateStep = () => {
    const newErrors = { ...errors };
    let isValid = true;

    switch (step) {
      case 1:
        if (!formData.userType) {
          newErrors.userType = "Por favor selecciona un tipo de usuario";
          isValid = false;
        }
        if (formData.userType === "profesor" && !formData.fileSelected) {
          newErrors.file = "Por favor sube tu CV";
          isValid = false;
        }
        break;

      case 2:
        if (!formData.nivel) {
          newErrors.nivel = "Por favor selecciona un nivel";
          isValid = false;
        }
        if (!formData.name) {
          newErrors.name = "Por favor ingresa tu nombre completo";
          isValid = false;
        }
        break;

      case 3:
        if (!formData.email) {
          newErrors.email = "Por favor ingresa tu correo electrónico";
          isValid = false;
        }
        break;

      case 4:
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
          newErrors.password = "La contraseña debe tener al menos 8 caracteres, una letra y un número";
          isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Las contraseñas no coinciden";
          isValid = false;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    setErrors(prev => ({ ...prev, [name]: "" }));
    
    if (name === 'email' && value) {
      await validateEmail(value);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, fileSelected: true });
    console.log("Archivo seleccionado:", e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      const isEmailValid = await validateEmail(formData.email);
      if (!isEmailValid) {
        return;
      }

      const nivelSeleccionado = niveles.find(
        (nivel) => nivel.descripcion === formData.nivel
      );
      const idnivel = nivelSeleccionado ? nivelSeleccionado.idnivel : null;

      const rolSeleccionado = roles.find(
        (rol) => rol.descripcion === formData.userType
      );
      const idrol = rolSeleccionado ? rolSeleccionado.idrol : null;

      const usuarioData = {
        idusuario: 0,
        nombrecompleto: formData.name,
        correo: formData.email,
        contraseñaHash: formData.password,
        fecharegistro: new Date().toISOString().split("T")[0],
        idnivel: idnivel,
        idrol: idrol,
        autProf: formData.userType === "profesor",
        tokenRecuperacion: generateToken(),
        tokenExpiracion: new Date().toISOString(),
      };

      try {
        const response = await fetch("http://localhost:5228/API/Usuario/GuardarUsuario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuarioData),
        });

        if (response.ok) {
          alert("Registro exitoso");
          navigate("/login");
        } else {
          alert("Error en el registro");
        }
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("Error en el registro");
      }
    }
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

      <div className="mt-10 text-center">
        <div className="w-full h-[12px] bg-[#e0e0e0] rounded-full overflow-hidden mt-5">
          <div
            className="h-full bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] transition-width duration-300 ease-in-out rounded-full"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <main className="p-4">
        {step === 1 && (
          <div>
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold">
              ¿Quién eres?
            </h1>
            <label className="block text-left text-[20px]" htmlFor="userType">
              *Elige el tipo de Usuario
              <select
                id="userType"
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
            {errors.userType && (
              <span className="text-red-500 text-[15px] mt-1 block">
                {errors.userType}
              </span>
            )}

            {formData.userType === "profesor" && (
              <div className="mt-6">
                <button
                  className={`h-[48px] ${
                    formData.linkedinClicked
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#00A89F]"
                  } text-white rounded-md w-full mb-4`}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Ingresar archivo de CV
                </button>
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
            {errors.file && (
              <span className="text-red-500 text-[15px] mt-1 block">
                {errors.file}
              </span>
            )}

            <div className="flex justify-between mt-6">
              <button
                className="h-[48px] bg-[#f0f0f0] text-[#666] border-none rounded-md text-[16px] font-medium cursor-pointer transition-all duration-200 w-[48%]"
                onClick={handleBack}
                disabled={step === 1}
              >
                Volver
              </button>
              <button
                className="h-[48px] bg-[#f0f0f0] text-[#666] border-none rounded-md text-[16px] font-medium cursor-pointer transition-all duration-200 w-[48%]"
                onClick={handleNext}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold">
              ¿Cuál es tu nivel y nombre completo?
            </h1>
            <label
              className="block text-left text-[20px] mt-[14%]"
              htmlFor="nivel"
            >
              *Selecciona tu nivel
              <select
                id="nivel"
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                className="h-[60px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] max-w-[500px] box-border"
              >
                <option value="">Selecciona tu nivel</option>
                {niveles.map((nivel) => (
                  <option key={nivel.idnivel} value={nivel.descripcion}>
                    {nivel.descripcion}
                  </option>
                ))}
              </select>
            </label>
            {errors.nivel && (
              <span className="text-red-500 text-[15px] mt-1 block">
                {errors.nivel}
              </span>
            )}

            <label
              className="block text-left text-[20px] mt-[14%]"
              htmlFor="name"
            >
              *Nombre y Apellidos:
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                className="h-[48px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] max-w-[500px] box-border"
              />
            </label>
            {errors.name && (
              <span className="text-red-500 text-[15px] mt-1 block">
                {errors.name}
              </span>
            )}

            <div className="flex justify-between mt-6">
              <button
                className="h-[48px] bg-[#f0f0f0] text-[#666] border-none rounded-md text-[16px] font-medium cursor-pointer transition-all duration-200 w-[48%]"
                onClick={handleBack}
              >
                Volver
              </button>
              <button
                className="h-[48px] bg-[#f0f0f0] text-[#666] border-none rounded-md text-[16px] font-medium cursor-pointer transition-all duration-200 w-[48%]"
                onClick={handleNext}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold">
              ¿Cuál es tu correo?
            </h1>
            <label className="block text-left text-[20px]" htmlFor="email">
              *Correo electrónico
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ejemplo: usuario@dominio.com"
                className="h-[48px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] box-border"
              />
            </label>
            {errors.email && (
              <span className="text-red-500 text-[15px] mt-1 block">
                {errors.email}
              </span>
            )}

            <div className="flex justify-between mt-6">
              <button
                className="h-[48px] bg-[#f0f0f0] text-[#666] border-none rounded-md text-[16px] font-medium cursor
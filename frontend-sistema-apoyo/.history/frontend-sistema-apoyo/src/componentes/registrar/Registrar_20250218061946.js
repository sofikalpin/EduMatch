import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../logo/LogoInicio.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

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

  const [existingUsers, setExistingUsers] = useState([]);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const generateToken = () => crypto.randomUUID();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
 
  const niveles = [
    { idnivel: 1, descripcion: "A1: Principiante" },
    { idnivel: 2, descripcion: "A2: Básico" },
    { idnivel: 3, descripcion: "B1: Pre-intermedio" },
    { idnivel: 4, descripcion: "B2: Intermedio" },
    { idnivel: 5, descripcion: "C1: Intermedio-alto" },
    { idnivel: 6, descripcion: "C2: Avanzado" },
  ];

  const roles = [
    { idrol: 1, descripcion: "profesor" },
    { idrol: 2, descripcion: "alumno" },
  ];

  // Fetch existing users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5228/API/Usuario/ListaUsuarios");
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.status}`);
        }
        const data = await response.json();
      
        const usersArray = data.users ? data.users : data;
        setExistingUsers(usersArray);
        console.log(usersArray);
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
      }
    };
  
    fetchUsers();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'email') {
      setErrors({ ...errors, email: '' });
    }
  };

  const handleLogoClick = () => {
    window.location.href = "/home";
  };

  const validateEmail = async () => {
    if (!formData.email) {
      setErrors({ ...errors, email: "El correo es obligatorio" });
      return false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ ...errors, email: "Formato de correo inválido" });
      return false;
    }

    // Check if email already exists
    setIsCheckingEmail(true);
    try {
      const emailExists = existingUsers.some(user => 
        user.correo && user.correo.toLowerCase() === formData.email.toLowerCase()
      );

      if (emailExists) {
        setErrors({ ...errors, email: "Este correo ya está registrado" });
        setIsCheckingEmail(false);
        return false;
      }

      setErrors({ ...errors, email: "" });
      setIsCheckingEmail(false);
      return true;
    } catch (error) {
      console.error('Error checking email:', error);
      setErrors({ ...errors, email: "Error al verificar el correo" });
      setIsCheckingEmail(false);
      return false;
    }
  };

  const validateStep = async () => {
    let newErrors = { ...errors };
  
    if (step === 1) {
      if (!formData.userType) {
        newErrors.userType = "Debes seleccionar un tipo de usuario";
      } else {
        newErrors.userType = "";
      }
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
  
    if (step === 3) {
      // For step 3, use the validateEmail function
      const isEmailValid = await validateEmail();
      if (!isEmailValid) {
        return false;
      }
    }
  
    if (step === 4) {
      if (!formData.password) {
        newErrors.password = "La contraseña es obligatoria";
      } else if (formData.password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      } else {
        newErrors.password = "";
      }
  
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      } else {
        newErrors.confirmPassword = "";
      }
    }
  
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };
  
  useEffect(() => {
    
    if (step !== 3) {
      validateStep();
    }
  }, [formData, step]);

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateStep();
    
    if (isValid) {
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
        cvRuta: formData.cvRuta || "",
      };

      console.log("Datos del formulario:", usuarioData);

      try {
        const response = await fetch("http://localhost:5228/API/Usuario/GuardarUsuario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuarioData),
        });

        if (formData.userType === "profesor") {
          navigate("/subirCV"); // Redirigir a la pantalla de subir CV
        } else {
          navigate("/iniciarsesion");
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
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold ">
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
              Tus datos
            </h1>
            <label className="block text-left text-[20px]" htmlFor="name">
              *Nombre completo
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-[60px] p-4 border border-[#e0e0e0] rounded-md text-[15px] w-full mt-[5%] box-border"
                placeholder="Escribe tu nombre"
              />
            </label>
            {errors.name && (
              <span className="text-red-500 text-[15px] mt-1 block">
                {errors.name}
              </span>
            )}

            <label className="block text-left text-[20px] mt-4" htmlFor="nivel">
              *Nivel de inglés
              <select
                id="nivel"
                name="nivel"
                value={formData.nivel}
                onChange={handleChange}
                className="h-[60px] p-4 border border-[#e0e0e0] rounded-md text-[15px] w-full mt-[5%] box-border"
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
              Tu correo
            </h1>
            <label className="block text-left text-[20px]" htmlFor="email">
              *Correo electrónico
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={validateEmail}
                className="h-[60px] p-4 border border-[#e0e0e0] rounded-md text-[15px] w-full mt-[5%] box-border"
                placeholder="Escribe tu correo"
              />
            </label>
            {isCheckingEmail && (
              <span className="text-blue-500 text-[15px] mt-1 block">
                Verificando correo...
              </span>
            )}
            {errors.email && (
              <span className="text-red-500 text-[15px] mt-1 block">
                {errors.email}
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
                disabled={isCheckingEmail}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold">
              Tu contraseña
            </h1>
            <div className="relative">
              <label className="block text-left text-[20px]" htmlFor="password">
                *Contraseña
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-[60px] p-4 border border-[#e0e0e0] rounded-md text-[15px] w-full mt-[5%] box-border"
                    placeholder="Escribe tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </label>
            </div>
            {errors.password && (
              <span className="text-red-500 text-[15px] mt-1 block">
                {errors.password}
              </span>
            )}

            <div className="relative mt-4">
              <label className="block text-left text-[20px]" htmlFor="confirmPassword">
                *Confirmar contraseña
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="h-[60px] p-4 border border-[#e0e0e0] rounded-md text-[15px] w-full mt-[5%] box-border"
                    placeholder="Confirma tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </label>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-[15px] mt-1 block">
                {errors.confirmPassword}
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
                className="h-[48px] bg-[#00A89F] text-white border-none rounded-md text-[16px] font-medium cursor-pointer transition-all duration-200 w-[48%]"
                onClick={handleSubmit}
              >
                Registrarse
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
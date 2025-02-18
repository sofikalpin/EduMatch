import React, { useState, useEffect } from "react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const generateToken = () => crypto.randomUUID();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5228/API/Usuario/ListaUsuarios");
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        const usersArray = Array.isArray(data) ? data : data.users || [data];
        const emails = usersArray.map(user => user.correo);
        setExistingEmails(emails);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleLogoClick = () => navigate("/home");

  const validateEmail = async () => {
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: "El correo es obligatorio" }));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: "Formato de correo inválido" }));
      return false;
    }

    setIsCheckingEmail(true);
    try {
      if (existingEmails.includes(formData.email)) {
        setErrors(prev => ({ ...prev, email: "Este correo ya está registrado" }));
        setIsCheckingEmail(false);
        return false;
      }
      setErrors(prev => ({ ...prev, email: "" }));
      setIsCheckingEmail(false);
      return true;
    } catch (error) {
      console.error("Error al verificar correo:", error);
      setIsCheckingEmail(false);
      return false;
    }
  };

  const validateStep = async () => {
    let newErrors = {};
    let isValid = true;

    switch (step) {
      case 1:
        if (!formData.userType) {
          newErrors.userType = "Debes seleccionar un tipo de usuario";
          isValid = false;
        }
        break;
      case 2:
        if (!formData.name) {
          newErrors.name = "El nombre es obligatorio";
          isValid = false;
        }
        if (!formData.nivel) {
          newErrors.nivel = "Debes seleccionar tu nivel";
          isValid = false;
        }
        break;
      case 3:
        const emailValid = await validateEmail();
        if (!emailValid) isValid = false;
        break;
      case 4:
        if (!formData.password) {
          newErrors.password = "La contraseña es obligatoria";
          isValid = false;
        } else if (formData.password.length < 6) {
          newErrors.password = "La contraseña debe tener al menos 6 caracteres";
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

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleNext = async () => {
    if (await validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validateStep()) {
      setLoading(true);
      try {
        const nivelSeleccionado = niveles.find(
          nivel => nivel.descripcion === formData.nivel
        );
        const rolSeleccionado = roles.find(
          rol => rol.descripcion === formData.userType
        );
  
        const usuarioData = {
          idusuario: 0,
          nombrecompleto: formData.name,
          correo: formData.email,
          contraseñaHash: formData.password,
          fecharegistro: new Date().toISOString().split('T')[0], 
          idnivel: nivelSeleccionado?.idnivel || 0,
          idrol: rolSeleccionado?.idrol || 0,
          autProf: formData.userType === "profesor",
          tokenRecuperacion: generateToken(),
          tokenExpiracion: new Date().toISOString(), 
          cvRuta: null, 
          fotoRuta: "string" 
        };
   
        console.log('Datos a enviar:', usuarioData); 
  
        const response = await fetch("http://localhost:5228/API/Usuario/GuardarUsuario", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify(usuarioData)
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error en el registro: ${response.status}`);
        }
  
        if (formData.userType === "profesor") {
          
          localStorage.setItem('professorEmail', formData.email);
          alert("Registro exitoso. Por favor, sube tu CV para completar el registro.");
          navigate("/subirCV");
        } else {
          alert("Registro exitoso");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error en el registro: " + error.message);
      } finally {
        setLoading(false);
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
          />
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
                disabled={isCheckingEmail || !!errors.email}
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
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

  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [existingUsers, setExistingUsers] = useState([]);

  // Fetch existing users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5228/API/Usuario/ListaUsuarios');
        const users = await response.json();
        setExistingUsers(users);
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  // Check email availability
  const checkEmailAvailability = (email) => {
    if (!email) return;
    
    setIsCheckingEmail(true);
    
    // Check if email exists in the list of users
    const emailExists = existingUsers.some(user => user.correo.toLowerCase() === email.toLowerCase());
    setIsEmailAvailable(!emailExists);
    
    // Update errors state based on email availability
    setErrors(prev => ({
      ...prev,
      email: emailExists ? "Este correo electrónico ya está registrado" : ""
    }));
    
    setIsCheckingEmail(false);
  };

  // Modify handleChange for email validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Check email availability when email field changes
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        checkEmailAvailability(value);
      }
    }
  };

  // Update validateStep function
  const validateStep = () => {
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
      if (!formData.email) {
        newErrors.email = "El correo es obligatorio";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = "Ingresa un correo electrónico válido";
        } else if (!isEmailAvailable) {
          newErrors.email = "Este correo electrónico ya está registrado";
        } else {
          newErrors.email = "";
        }
      }
    }
  
    if (step === 4) {
      if (!formData.password) {
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

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // Update handleNext
  const handleNext = () => {
    if (validateStep() && (step !== 3 || isEmailAvailable)) {
      setStep(step + 1);
    }
  };

  // Update handleSubmit to include email validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep() && isEmailAvailable) {
      // ... rest of your existing submit logic ...
    }
  };

  // Rest of your component remains the same, just update the email input section in step 3:
  
  return (
    // ... existing JSX ...
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
            className={`h-[48px] p-4 border ${
              errors.email ? 'border-red-500' : 'border-[#e0e0e0]'
            } rounded-md text-[16px] w-full mt-[5%] box-border`}
          />
        </label>
        {isCheckingEmail && (
          <span className="text-gray-500 text-[15px] mt-1 block">
            Verificando disponibilidad...
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
            disabled={!isEmailAvailable}
          >
            Continuar
          </button>
        </div>
      </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold ">
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
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold ">
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


      {step === 4 && (
        <div>
          <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold ">
            Crea una contraseña
          </h1>
          
          <label className="block text-left text-[20px]" htmlFor="password">
            *Contraseña
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                className="h-[48px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] box-border pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </label>
          {errors.password && (
            <span className="text-red-500 text-[12px] mt-1 block">
              {errors.password}
            </span>
          )}

          <label className="block text-left text-[20px]" htmlFor="confirmPassword">
            *Confirmar Contraseña
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
                className="h-[48px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] box-border pr-10"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </label>
          {errors.confirmPassword && (
            <span className="text-red-500 text-[12px] mt-1 block">
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
              className="h-[48px] bg-[#f0f0f0] text-[#666] border-none rounded-md text-[16px] font-medium cursor-pointer transition-all duration-200 w-[48%]"
              onClick={handleSubmit}
            >
              Registrarme
            </button>
          </div>
        </div>
      )}

      </main>
    </div>
  );
};
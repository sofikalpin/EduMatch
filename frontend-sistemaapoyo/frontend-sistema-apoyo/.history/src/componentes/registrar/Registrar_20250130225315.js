import React, { useState, useEffect } from "react";
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
    file: "null",
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

  const navigate = useNavigate();

  // Definir niveles y roles
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

    if (formData.userType === "profesor" && !formData.file) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Mapear el nivel seleccionado al ID correspondiente
      const nivelSeleccionado = niveles.find(
        (nivel) => nivel.descripcion === formData.nivel
      );
      const idnivel = nivelSeleccionado ? nivelSeleccionado.idnivel : null;

      // Mapear el rol seleccionado al ID correspondiente
      const rolSeleccionado = roles.find(
        (rol) => rol.descripcion === formData.userType
      );
      const idrol = rolSeleccionado ? rolSeleccionado.idrol : null;

      // Crear el objeto JSON con los IDs mapeados
      const usuarioData = {
        idusuario: 25, // Esto puede ser generado por el backend
        nombrecompleto: formData.name,
        correo: formData.email,
        contraseñaHash: formData.password, // Aquí deberías hashear la contraseña antes de enviarla
        fecharegistro: new Date().toISOString().split("T")[0], // Fecha actual
        idnivel: idnivel,
        idrol: idrol,
        autProf: formData.userType === "profesor", // Si es profesor, autProf es true
        tokenRecuperacion: "", // Esto puede ser generado por el backend
        tokenExpiracion: new Date().toISOString(), // Esto puede ser generado por el backend
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
              <span className="text-red-500 text-[12px] mt-1 block">
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
                  Ingresar archivo
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
              <span className="text-red-500 text-[12px] mt-1 block">
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
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold ">
              ¿Cuál es tu nivel y nombre?
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
              <span className="text-red-500 text-[12px] mt-1 block">
                {errors.nivel}
              </span>
            )}

            <label
              className="block text-left text-[20px] mt-[14%]"
              htmlFor="name"
            >
              *Nombre:
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
              <span className="text-red-500 text-[12px] mt-1 block">
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
              <span className="text-red-500 text-[12px] mt-1 block">
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
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                className="h-[48px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] box-border"
              />
            </label>
            {errors.password && (
              <span className="text-red-500 text-[12px] mt-1 block">
                {errors.password}
              </span>
            )}

            <label
              className="block text-left text-[20px]"
              htmlFor="confirmPassword"
            >
              *Confirmar Contraseña
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
                className="h-[48px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] box-border"
              />
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
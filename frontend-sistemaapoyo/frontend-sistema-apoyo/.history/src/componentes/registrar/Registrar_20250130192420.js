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
    console.log("Archivo seleccionado:", e.target.files[0]);
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.userType) newErrors.userType = "Debes seleccionar un tipo de usuario";
      if (formData.userType === "profesor" && !formData.fileSelected)
        newErrors.file = "Debes seleccionar un archivo";
    }

    if (step === 2) {
      if (!formData.name) newErrors.name = "El nombre es obligatorio";
      if (!formData.nivel) newErrors.nivel = "Debes seleccionar tu nivel";
    }

    if (step === 3 && !formData.email) newErrors.email = "El correo es obligatorio";

    if (step === 4) {
      if (!formData.password) newErrors.password = "La contraseña es obligatoria";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep()) return;

    const idrol = formData.userType === "profesor" ? 1 : 2;
    const idnivel = parseInt(formData.nivel, 10);

    const userData = {
      nombrecompleto: formData.name,
      correo: formData.email,
      contraseñaHash: formData.password,
      idnivel: idnivel,
      idrol: idrol,
      autProf: formData.userType === "profesor",
    };

    try {
      const response = await fetch("http://localhost:5228/API/Usuario/GuardarUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registro exitoso");
        navigate("/login");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en la conexión con el servidor.");
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto text-center pt-[100px] h-screen box-border">
      <header className="w-full flex items-center justify-between p-4 bg-[#00A89F] text-white fixed top-0 left-0 z-10">
        <img src={logo} alt="Logo" className="h-12 cursor-pointer" />
      </header>

      <main className="p-4">
        {step === 1 && (
          <div>
            <h1 className="text-[36px] font-semibold">¿Quién eres?</h1>
            <select name="userType" value={formData.userType} onChange={handleChange} className="w-full p-2 border rounded-md">
              <option value="">Selecciona una opción</option>
              <option value="profesor">Profesor</option>
              <option value="alumno">Alumno</option>
            </select>
            {errors.userType && <span className="text-red-500">{errors.userType}</span>}
            {formData.userType === "profesor" && (
              <input type="file" onChange={handleFileChange} className="mt-2" />
            )}
            {errors.file && <span className="text-red-500">{errors.file}</span>}
            <button onClick={handleNext} className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md">Continuar</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-[36px] font-semibold">¿Cuál es tu nivel y nombre?</h1>
            <select name="nivel" value={formData.nivel} onChange={handleChange} className="w-full p-2 border rounded-md">
              <option value="">Selecciona tu nivel</option>
              {niveles.map((nivel) => (
                <option key={nivel.idnivel} value={nivel.idnivel}>{nivel.descripcion}</option>
              ))}
            </select>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre completo" className="w-full p-2 border rounded-md mt-2" />
            <button onClick={handleNext} className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md">Continuar</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-[36px] font-semibold">¿Cuál es tu correo?</h1>
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Correo electrónico" className="w-full p-2 border rounded-md" />
            <button onClick={handleNext} className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md">Continuar</button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h1 className="text-[36px] font-semibold">Crea una contraseña</h1>
            <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" className="w-full p-2 border rounded-md" />
            <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmar contraseña" className="w-full p-2 border rounded-md mt-2" />
            <button onClick={handleSubmit} className="mt-4 w-full bg-green-500 text-white p-2 rounded-md">Registrarme</button>
          </div>
        )}
      </main>
    </div>
  );
};

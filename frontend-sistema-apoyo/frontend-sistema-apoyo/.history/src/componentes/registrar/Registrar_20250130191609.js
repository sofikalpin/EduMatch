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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Las contraseñas no coinciden" });
      return;
    }

    const userData = {
      nombrecompleto: formData.name,
      correo: formData.email,
      contraseñaHash: formData.password, // El backend debe hashear la contraseña
      idnivel: formData.nivel,
      idrol: formData.userType === "profesor" ? 2 : 3, // 2: Profesor, 3: Alumno
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
      <header className="w-full flex items-center justify-between p-4 bg-[#00A89F] text-white box-shadow-md fixed top-0 left-0 z-10">
        <img src={logo} alt="Logo" className="h-12 cursor-pointer" />
      </header>
      
      <main className="p-4">
        {step === 4 && (
          <div>
            <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold">Crea una contraseña</h1>
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
            
            <label className="block text-left text-[20px]" htmlFor="confirmPassword">
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
              <span className="text-red-500 text-[12px] mt-1 block">{errors.confirmPassword}</span>
            )}

            <button
              className="h-[48px] bg-[#00A89F] text-white rounded-md w-full mt-6"
              onClick={handleSubmit}
            >
              Registrarme
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

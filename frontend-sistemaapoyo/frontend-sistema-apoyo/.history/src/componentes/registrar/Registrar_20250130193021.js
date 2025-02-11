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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Las contraseñas no coinciden" });
      return;
    }

    const idrol = formData.userType === "profesor" ? 1 : 2;
    const idnivel = parseInt(formData.nivel, 10);

    const userData = {
      nombrecompleto: formData.name,
      correo: formData.email,
      contraseñaHash: formData.password,
      idnivel: idnivel,
      idrol: idrol,
    };

    try {
      const response = await fetch("http://localhost:5000/api/register", {
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
        {step === 4 && (
          <div>
            <h1 className="text-[36px] font-semibold">Crea una contraseña</h1>
            <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" className="w-full p-2 border rounded-md" />
            <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmar contraseña" className="w-full p-2 border rounded-md mt-2" />
            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
            <button onClick={handleSubmit} className="mt-4 w-full bg-green-500 text-white p-2 rounded-md">Registrarme</button>
          </div>
        )}
      </main>
    </div>
  );
};

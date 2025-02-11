import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../logo/LogoInicio.png";
import { FaGoogle } from "react-icons/fa";
import Foto from "./Mujer con Computadora.jpg";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => password.length >= 8;

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = "Por favor ingresa un correo electrónico válido";
    }
    if (!validatePassword(formData.contraseña)) {
      newErrors.contraseña = "La contraseña debe tener al menos 8 caracteres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.contraseña }),
      });
      if (!response.ok) throw new Error("Correo electrónico o contraseña inválidos");
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/inicio");
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gray-100">
        <img src={Foto} alt="Imagen" className="w-full h-full object-cover" />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4">
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto mb-6" style={{ width: "380px" }} />
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl font-semibold text-gray-900">Iniciar Sesión</h1>
            <p className="text-gray-600">¡Bienvenido! Ingrese sus datos.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded" placeholder="Correo electrónico" />
              <input type={showPassword ? "text" : "password"} name="contraseña" value={formData.contraseña} onChange={handleChange} required className="w-full p-3 border rounded" placeholder="Contraseña" />
              <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded" disabled={isLoading}>{isLoading ? "Iniciando..." : "Iniciar sesión"}</button>
            </form>
            <button onClick={() => setShowForgotPassword(true)} className="text-blue-600 mt-4">¿Olvidaste la contraseña?</button>
            {showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

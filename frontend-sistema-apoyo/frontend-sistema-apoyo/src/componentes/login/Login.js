import React, { useState } from "react";
import md5 from "md5";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../logo/LogoFinal.png';

const login = async (username, passwordHash) => {
  try {
    const response = await fetch("http://localhost:5228/API/Usuario/IniciarSesion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: username,
        contrasenaHash: passwordHash,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Datos de la respuesta del servidor:", data); // Para verificar la respuesta
      if (data && data.value && data.value.token) {  // Asegúrate de acceder correctamente al token
        return data.value.token;  // Cambié esto para acceder al token dentro de `data.value`
      } else {
        throw new Error("Token no encontrado en la respuesta del servidor.");
      }
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.log(error); // Mostrar el error para depuración
    throw error;
  }
};

const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  // Declarar el estado form y errorMessage
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  // Función para manejar el inicio de sesión
  const iniciarSesion = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const token = await login(form.username, md5(form.password)); // Aquí guardamos solo el token
      console.log("Token recibido:", token);  // Ver el token en consola
      cookies.set("usuario", form.username, { path: "/" });
      cookies.set("token", token, { path: "/" });  // Usamos el token recibido
      navigate('/dashboard');
    } catch (error) {
      console.log(error);  // Mostrar error en consola para depuración
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="contenedor-principal">
      <img src={logo} alt="Logo" className="logo-img" />
      <form onSubmit={iniciarSesion} className="login-form">
        <h2>INICIAR SESIÓN</h2>
        <label htmlFor="username" className="titulo-form">Usuario</label>
        <br />
        <input 
          value={form.username} 
          onChange={handleChange} 
          className="login-input" 
          type="text" 
          id="username" 
          name="username" 
          required 
        />
        <br />
        <label htmlFor="password" className="titulo-form">Contraseña</label>
        <br />
        <input 
          value={form.password} 
          onChange={handleChange} 
          className="login-input" 
          type="password" 
          id="password" 
          name="password" 
          required 
        />
        <br />
        <button type="submit" className="btn btn-primary">Ingresar</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <br />
        <Link className="link-login" to="/registrarse">¿No tienes cuenta? Regístrate aquí</Link>
      </form>
    </div>
  );
};

export default Login;

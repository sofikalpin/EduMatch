import React, { useState } from "react";
import md5 from "md5";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../logo/LogoFinal.png';


const login = async (username, passwordHash) => {
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
    const data = await response.json();
    return data;
};

const Login = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setErrorMessage('');  

        
        if (!form.username || !form.password) {
            setErrorMessage("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await login(form.username, md5(form.password));
            if (response && response.status === 'success') {
                
                cookies.set("usuario", form.username, { path: "/" });
                cookies.set("token", response.data.token, { path: "/" }); 
                navigate('/dashboard');  
            } else {
                setErrorMessage("Credenciales incorrectas");
            }
        } catch (error) {
            setErrorMessage("Hubo un error al iniciar sesión.");
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

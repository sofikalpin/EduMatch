import React, { useState } from "react";
import md5 from "md5";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../logo/LogoFinal.png';
import AuthService from '../../service/AuthService'; 

const Login = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
    
        // Registra los datos exactos que estás enviando
        console.log('Datos de login:', {
            username: form.username,
            passwordMD5: md5(form.password)
        });
    
        if (!form.username || !form.password) {
            setErrorMessage("Por favor, completa todos los campos.");
            setLoading(false);
            return;
        }
    
        try {
            const response = await AuthService.login(form.username, md5(form.password)); 
            
            // Registro de la respuesta completa
            console.log('Respuesta completa del servidor:', response);
    
            if (response.status === true && response.value) {
                cookies.set("usuario", form.username, { path: "/", maxAge: 3600 });
                cookies.set("token", response.value.token, { path: "/", maxAge: 3600 });
                navigate('/dashboard');
            } else {
                // Muestra el mensaje de error exacto
                setErrorMessage(response.msg || "Credenciales incorrectas");
            }
        } catch (error) {
            // Registro detallado del error
            console.error('Error completo:', {
                response: error.response,
                data: error.response?.data,
                message: error.message
            });
    
            // Muestra el mensaje de error más informativo
            setErrorMessage(
                error.response?.data?.msg || 
                error.message || 
                "Hubo un error al iniciar sesión."
            );
        } finally {
            setLoading(false);
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
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Cargando...' : 'Ingresar'}
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <br />
                <Link className="link-login" to="/registrarse">¿No tienes cuenta? Regístrate aquí</Link>
            </form>
        </div>
    );
};

export default Login;
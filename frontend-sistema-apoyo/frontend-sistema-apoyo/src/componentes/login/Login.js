import React, { useState } from "react";
import './Login.css';
import { Link } from "react-router-dom";
import logo from '../../logo/LogoFinal.png';

export const Login = () => {
    const [ usuario, setUsuario ] = useState('');
    const [ clave, setClave ] = useState('');

    const handleIngresar = (e) => {
        e.preventDefault();
        console.log(usuario);
    }

    return (
        
        <div className="contenedor-principal">
            <img src={logo} alt="Logo" className="logo-img" />
            <form onSubmit={handleIngresar} className="login-form">
                <h2>INICIAR SESIÓN</h2>
                <label htmlFor="usuario"  className="titulo-form">Usuario</label>
                <br></br>
                <input value={usuario} onChange= {(e) => setUsuario(e.target.value)} className="login-input" type="text" id="usuario" name="usuario"/>
                <br></br>
                <label htmlFor="clave" className="titulo-form">Contraseña</label>
                <br></br>
                <input value={clave} onChange= {(e) => setClave(e.target.value)} className="login-input" type="password" id="clave" name="clave"/>
                <br></br>
                <Link className="link-login" to="listarpersonas">Ingresar</Link>
                <br></br>
                <Link className="link-login" to="registrarse">¿No tienes cuenta? Registrate aquí</Link>
                
            </form>           
            
        </div>
    )
}
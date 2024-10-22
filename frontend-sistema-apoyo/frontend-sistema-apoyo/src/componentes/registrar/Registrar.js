import React, { useState } from "react";
import './Registrar.css';
import logo from '../../logo/LogoFinal.png';

export const Registrar = () => {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [rol, setRol] = useState('alumno'); // Valor por defecto como 'alumno'

    const handleRegistrar = (e) => {
        e.preventDefault();
        
        // Aquí puedes agregar la lógica para manejar el registro
        console.log('Registro:', {usuario, nombre, apellido, email, clave});
    }

    return (
        <div className="contenedor-principal">
            <img src={logo} alt="Logo" className="logo-img" />
            <form onSubmit={handleRegistrar} className="register-form">
                <h3>REGISTRAR CUENTA</h3>
                
                <label htmlFor="rol" className="titulo-form">Tipo de Usuario</label>
                <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)} className="login-input">
                    <option value="alumno">Alumno</option>
                    <option value="profesor">Profesor</option>
                </select>

                <label htmlFor="usuario" className="titulo-form">Nombre de Usuario</label>
                <input value={usuario} className="login-input" onChange={(e) => setUsuario(e.target.value)} type="text" id="usuario" name="usuario" />

                <label htmlFor="nombre" className="titulo-form">Nombre</label>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" id="nombre" name="nombre" className="login-input" />

                <label htmlFor="apellido" className="titulo-form">Apellido</label>
                <input value={apellido} onChange={(e) => setApellido(e.target.value)} type="text" id="apellido" name="apellido" className="login-input" />
                
                <label htmlFor="email" className="titulo-form">Correo electrónico</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" type="email" id="email" name="email" />

                <label htmlFor="clave" className="titulo-form">Contraseña</label>
                <input value={clave} onChange={(e) => setClave(e.target.value)} className="login-input" type="password" id="clave" name="clave" />

                <button type="submit" className="link-registrar">Crear cuenta</button>
            </form>
        </div>
    );
};

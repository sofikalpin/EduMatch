import React from 'react';
import './Inicio.css'; 
import logo from '../../logo/LogoInicio.png';
import { Link } from 'react-router-dom'; 
import { Login } from './../login/Login';

export const Inicio = () => {
    return (
        <div className="inicio-container">
            <header className="header">
                <img src={logo} alt="Logo" className="logo-img" />
                <nav className="navigation">
                    <ul>
                        <li><Link to="#">Profesores</Link></li>
                        <li><Link to="#">Programa</Link></li>
                        <li><Link to="#">Herramientas</Link></li>
                    </ul>
                </nav>
                <div className="auth-buttons">
                <Link to="/login" className="login-button">Login</Link> 
                <Link to="/registrarse" className="register-button">Registrate</Link> 
                </div>
            </header>
           
            <section className="intro-top">
                <h1>Aprende Inglés Gratis</h1>
                <p>Aquí encontrarás todos los contenidos necesarios para aprender la lengua inglesa a tu ritmo.</p>
            </section>
            <div className="search-container">
                <input type="text" placeholder="Buscar..." className="search-input" />
                <button className="search-button">Buscar</button>
            </div>
            <section className="intro">
                <p>Estos son nuestros cursos de inglés listos para que empieces a aprender.</p>
            </section>

        </div>
    );
};

export default Inicio;

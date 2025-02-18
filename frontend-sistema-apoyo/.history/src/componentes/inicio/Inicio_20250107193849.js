import React, { useRef } from 'react';
import './Inicio.css'; 
import logo from '../../logo/LogoInicio.png';
import { Link } from 'react-router-dom'; 
import { Login } from './../login/Login';

export const Inicio = () => {
    // Creamos una referencia para la sección a la que se quiere hacer scroll
    const introRef = useRef(null);

    const handleScrollToIntro = () => {
        // Cuando se haga clic en el botón, desplazarse a la sección
        introRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

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
                {/* Botón para hacer scroll hacia la sección de introducción */}
                <button className="scroll-button" onClick={handleScrollToIntro}>
                    Explorar Cursos
                </button>
            </section>

            <div className="search-container">
                <input type="text" placeholder="Buscar..." className="search-input" />
                <button className="search-button">Buscar</button>
            </div>

            {/* Sección a la que se hace scroll */}
            <section className="intro" ref={introRef}>
                <p>Estos son nuestros cursos de inglés listos para que empieces a aprender.</p>
            </section>

        </div>
    );
};

export default Inicio;

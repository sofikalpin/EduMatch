import React, { useRef } from 'react';
import './Inicio.css';
import logo from '../../logo/LogoInicio.png';
import { Link } from 'react-router-dom';

export const Inicio = () => {
    // Referencias para las secciones a las que queremos hacer scroll
    const introRef = useRef(null);
    const cursosRef = useRef(null);
    const detallesRef = useRef(null);

    // Funciones para hacer scroll hacia las secciones
    const handleScrollToIntro = () => {
        introRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const handleScrollToCursos = () => {
        cursosRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const handleScrollToDetalles = () => {
        detallesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="inicio-container">
            {/* Header */}
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

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Aprende Inglés Gratis
                    </h1>
                    <p>Aquí encontrarás todos los contenidos necesarios para aprender la lengua inglesa a tu ritmo.</p>
                    <button className="scroll-button" onClick={handleScrollToIntro}>
                        Explorar Cursos
                    </button>
                </div>
                <div className="hero-image-container">
                    <img src="/api/placeholder/600/400" alt="Tutor teaching online" className="hero-image" />
                </div>
            </section>

            {/* Search Bar */}
            <div className="search-container">
                <input type="text" placeholder="Buscar..." className="search-input" />
                <button className="search-button">Buscar</button>
            </div>

            {/* Intro Section */}
            <section className="intro" ref={introRef}>
                <p>Estos son nuestros cursos de inglés listos para que empieces a aprender.</p>
                <button className="scroll-button" onClick={handleScrollToCursos}>
                    Ver Detalles de los Cursos
                </button>
            </section>

            {/* Cursos Section */}
            <section className="cursos" ref={cursosRef}>
                <h2>Nuestros Cursos</h2>
                <p>Ofrecemos una variedad de cursos diseñados para mejorar tu nivel de inglés.</p>
                <button className="scroll-button" onClick={handleScrollToDetalles}>
                    Ver Más Detalles
                </button>
            </section>

            {/* Detalles Section */}
            <section className="detalles" ref={detallesRef}>
                <h2>Detalles Adicionales</h2>
                <p>Accede a materiales extra, tutoriales y soporte personalizado para tus estudios.</p>
            </section>
        </div>
    );
};

export default Inicio;

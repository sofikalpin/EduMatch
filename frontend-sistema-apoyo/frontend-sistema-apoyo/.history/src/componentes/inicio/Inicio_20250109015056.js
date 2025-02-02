import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, User, Lock, Mail } from 'lucide-react';
import './Inicio.css';
import logo from '../../logo/LogoInicio.png'


export default function Inicio() {
  // Estado para modales
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  // Referencias de secciones
  const introRef = useRef(null);
  const cursosRef = useRef(null);
  const detallesRef = useRef(null);

  // Validación de email
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Manejadores de formularios
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(loginForm.email)) newErrors.loginEmail = 'Email inválido';
    if (loginForm.password.length < 6) newErrors.loginPassword = 'La contraseña debe tener al menos 6 caracteres';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Login exitoso', loginForm);
      setShowLoginModal(false);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (registerForm.name.length < 3) newErrors.registerName = 'El nombre debe tener al menos 3 caracteres';
    if (!validateEmail(registerForm.email)) newErrors.registerEmail = 'Email inválido';
    if (registerForm.password.length < 6) newErrors.registerPassword = 'La contraseña debe tener al menos 6 caracteres';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Registro exitoso', registerForm);
      setShowRegisterModal(false);
    }
  };

  return (
    <div className="inicio-container">
      {/* Navbar */}
      <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
        <nav className="navigation">
          <ul>
            <li><Link to="#" onClick={() => introRef.current?.scrollIntoView({ behavior: 'smooth' })}>Profesores</Link></li>
            <li><Link to="#" onClick={() => cursosRef.current?.scrollIntoView({ behavior: 'smooth' })}>Programa</Link></li>
            <li><Link to="#" onClick={() => detallesRef.current?.scrollIntoView({ behavior: 'smooth' })}>Herramientas</Link></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button onClick={() => setShowLoginModal(true)} className="login-button">Iniciar Sesión</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" ref={introRef}>
        <div className="hero-content">
          <h1>Aprende Inglés de Manera Efectiva</h1>
          <p>Clases personalizadas para todos los niveles con profesores nativos certificados</p>
          <div className="button-group">
            <button onClick={() => setShowRegisterModal(true)} className="button button-white">Comienza Ahora</button>
            <button className="button button-border">Conoce Más</button>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-background">
          <div className="modal-container">
            <button onClick={() => setShowLoginModal(false)} className="modal-close"><X size={24} /></button>
            <h2 className="modal-header">Iniciar Sesión</h2>
            <form onSubmit={handleLoginSubmit} className="modal-form">
              <div className="input-group">
                <Mail className="icon" size={20} />
                <input
                  type="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                />
                {errors.loginEmail && <p className="input-error">{errors.loginEmail}</p>}
              </div>
              <div className="input-group">
                <Lock className="icon" size={20} />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
                {errors.loginPassword && <p className="input-error">{errors.loginPassword}</p>}
              </div>
              <button type="submit" className="submit-button">Iniciar Sesión</button>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="modal-background">
          <div className="modal-container">
            <button onClick={() => setShowRegisterModal(false)} className="modal-close"><X size={24} /></button>
            <form onSubmit={handleRegisterSubmit} className="modal-form">
              <div className="input-group">
                <User className="icon" size={20} />
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                />
                {errors.registerName && <p className="input-error">{errors.registerName}</p>}
              </div>
              <div className="input-group">
                <Mail className="icon" size={20} />
                <input
                  type="email"
                  placeholder="Email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                />
                {errors.registerEmail && <p className="input-error">{errors.registerEmail}</p>}
              </div>
              <div className="input-group">
                <Lock className="icon" size={20} />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                />
                {errors.registerPassword && <p className="input-error">{errors.registerPassword}</p>}
              </div>
             
            </form>
          </div>
        </div>
      )}
    </div>
    // EnglishPlatform.jsx


  const [isLiveClassesOpen, setLiveClassesOpen] = useState(false);
  const [isLessonsOpen, setLessonsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Tres pilares de aprendizaje que garantizan tu fluidez
        </h1>
        
        <p className={styles.subtitle}>
          Con nuestro método de enseñanza y nuestra plataforma de aprendizaje, 
          avanzarás de <em>Beginner</em> a <em>Advanced</em> mucho más 
          rápido que en una escuela tradicional de inglés.
        </p>

        {/* Live Classes Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <div className={styles.iconGroup}>
                <div className={`${styles.icon} ${styles.iconGreen}`}></div>
                <div className={`${styles.icon} ${styles.iconBlue}`}></div>
              </div>
              <span>Clases de inglés en vivo 24/7</span>
            </div>
            <svg
              className={`${styles.chevron} ${isLiveClassesOpen ? styles.active : ''}`}
              onClick={() => setLiveClassesOpen(!isLiveClassesOpen)}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {isLiveClassesOpen && (
            <div className={styles.cardContent}>
              Conéctate a clases de inglés online en vivo 
              <span className={styles.highlight}> ILIMITADAS</span>, 
              con profesores nativos del idioma inglés. 
              Cuando quieras, donde quieras. Super easy!
            </div>
          )}
        </div>

        {/* Interactive Lessons Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <div className={styles.iconGroup}>
                <div className={`${styles.icon} ${styles.iconGreen}`}></div>
                <div className={`${styles.icon} ${styles.iconBlue}`}></div>
              </div>
              <span>Lecciones interactivas</span>
            </div>
            <svg
              className={`${styles.chevron} ${isLessonsOpen ? styles.active : ''}`}
              onClick={() => setLessonsOpen(!isLessonsOpen)}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {isLessonsOpen && (
            <div className={styles.cardContent}>
              Con nuestro método comprobado podrás estudiar inglés online, 
              combinando teoría y practica con ejercicios interactivos.
            </div>
          )}
        </div>
      </div>

      <div className={styles.phoneContainer}>
        <div className={styles.phone}>
          <div className={styles.statusBar}>9:41</div>
          <div className={styles.screen}>
            [Video call interface]
          </div>
        </div>
      </div>
    </div>
  );
};



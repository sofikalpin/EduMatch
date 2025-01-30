import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, User, Lock, Mail, ChevronDown } from 'lucide-react';
import './Inicio.css';
import logo from '../../logo/LogoInicio.png';

export default function Inicio() {
  // Estado para manejar los modales
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  // Referencias para scroll
  const introRef = useRef(null);
  const cursosRef = useRef(null);
  const detallesRef = useRef(null);

  // Validación de email
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Manejo del formulario de inicio de sesión
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateEmail(loginForm.email)) newErrors.loginEmail = 'Email inválido';
    if (loginForm.password.length < 6) newErrors.loginPassword = 'La contraseña debe tener al menos 6 caracteres';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Login exitoso:', loginForm);
      setShowLoginModal(false);
    }
  };

  // Manejo del formulario de registro
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (registerForm.name.length < 3) newErrors.registerName = 'El nombre debe tener al menos 3 caracteres';
    if (!validateEmail(registerForm.email)) newErrors.registerEmail = 'Email inválido';
    if (registerForm.password.length < 6) newErrors.registerPassword = 'La contraseña debe tener al menos 6 caracteres';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Registro exitoso:', registerForm);
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
            <li>
              <Link to="#" onClick={() => introRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                Profesores
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => cursosRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                Programa
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => detallesRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                Herramientas
              </Link>
            </li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button onClick={() => setShowLoginModal(true)} className="login-button">
            Iniciar Sesión
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" ref={introRef}>
        <div className="hero-content">
          <h1>Aprende Inglés de Manera Efectiva</h1>
          <p>Clases personalizadas para todos los niveles con profesores nativos certificados</p>
          <div className="button-group">
            <button onClick={() => setShowRegisterModal(true)} className="button button-white">
              Comienza Ahora
            </button>
            <button className="button button-border">Conoce Más</button>
          </div>
        </div>
      </section>

      {/* Modal de Inicio de Sesión */}
      {showLoginModal && (
        <div className="modal-background">
          <div className="modal-container">
            <button onClick={() => setShowLoginModal(false)} className="modal-close">
              <X size={24} />
            </button>
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

      {/* Modal de Registro */}
      {showRegisterModal && (
        <div className="modal-background">
          <div className="modal-container">
            <button onClick={() => setShowRegisterModal(false)} className="modal-close">
              <X size={24} />
            </button>
            <h2 className="modal-header">Registrarse</h2>
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
              <button type="submit" className="submit-button">Registrarse</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

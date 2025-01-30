import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, User, Lock, Mail } from 'lucide-react';
import './Inicio.css';
import logo from '../../logo/LogoInicio.png';

export default function Inicio() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const introRef = useRef(null);
  const cursosRef = useRef(null);
  const detallesRef = useRef(null);

  const validateForm = (form, type) => {
    const newErrors = {};
    if (type === 'login' || type === 'register') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email inválido';
      if (form.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (type === 'register' && form.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }
    return newErrors;
  };

  const handleFormSubmit = (e, form, setForm, type) => {
    e.preventDefault();
    const newErrors = validateForm(form, type);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log(`${type} exitoso`, form);
      type === 'login' ? setShowLoginModal(false) : setShowRegisterModal(false);
      setForm({ email: '', password: '', name: '' });
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

      {/* Modales */}
      {showLoginModal && (
        <Modal
          title="Iniciar Sesión"
          onClose={() => setShowLoginModal(false)}
          onSubmit={(e) => handleFormSubmit(e, loginForm, setLoginForm, 'login')}
          form={loginForm}
          setForm={setLoginForm}
          errors={errors}
        />
      )}

      {showRegisterModal && (
        <Modal
          title="Registrarse"
          onClose={() => setShowRegisterModal(false)}
          onSubmit={(e) => handleFormSubmit(e, registerForm, setRegisterForm, 'register')}
          form={registerForm}
          setForm={setRegisterForm}
          errors={errors}
        />
      )}
    </div>
  );
}

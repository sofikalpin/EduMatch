import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, User, Lock, Mail, ChevronDown } from 'lucide-react';
import './Inicio.css';
import logo from '../../logo/LogoInicio.png'
import Imagen1 from './pexels-thirdman-6502820.jpg'


export default function Inicio() {
    const [isLiveClassesOpen, setLiveClassesOpen] = useState(false);
    const [isLessonsOpen, setLessonsOpen] = useState(false);
  
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
                    <button onClick={() => setShowLoginModal(true)} className="login-button">Iniciar Sesión</button>
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

            {/* Tres pilares de aprendizaje */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Content Side */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Tres pilares de aprendizaje que garantizan tu fluidez
                                </h2>
                                <p className="text-gray-700">
                                    Con nuestro método de enseñanza y nuestra plataforma de aprendizaje, avanzarás de{' '}
                                    <em>Beginner</em> a <em>Advanced</em> mucho más rápido que en una escuela tradicional de inglés.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {/* Live Classes Card */}
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                                    <button onClick={() => setLiveClassesOpen(!isLiveClassesOpen)} className="w-full text-left">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex -space-x-1">
                                                    <div className="w-8 h-8 bg-green-400 rounded-lg"></div>
                                                    <div className="w-8 h-8 bg-cyan-400 rounded-lg"></div>
                                                </div>
                                                <h3 className="font-semibold text-gray-900">Clases de inglés en vivo 24/7</h3>
                                            </div>
                                            <ChevronDown
                                                className={`text-orange-500 transition-transform duration-200 ${
                                                    isLiveClassesOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </div>
                                    </button>
                                    {isLiveClassesOpen && (
                                        <p className="mt-4 text-gray-700">
                                            Conéctate a clases de inglés online en vivo{' '}
                                            <span className="font-bold">ILIMITADAS</span>, con profesores nativos del idioma inglés.{' '}
                                            <span className="font-semibold">Cuando quieras, donde quieras. Super easy!</span>
                                        </p>
                                    )}
                                </div>

                                {/* Interactive Lessons Card */}
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                                    <button onClick={() => setLessonsOpen(!isLessonsOpen)} className="w-full text-left">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex -space-x-1">
                                                    <div className="w-8 h-8 bg-green-400 rounded-lg"></div>
                                                    <div className="w-8 h-8 bg-cyan-400 rounded-lg"></div>
                                                </div>
                                                <h3 className="font-semibold text-gray-900">Lecciones interactivas</h3>
                                            </div>
                                            <ChevronDown
                                                className={`text-orange-500 transition-transform duration-200 ${
                                                    isLessonsOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </div>
                                    </button>
                                    {isLessonsOpen && (
                                        <div className="flex items-center gap-4 mt-4">
                                            <img src={Imagen1} alt="Imagen" className="w-1/3 h-auto rounded-lg" />
                                            <p className="text-gray-700 flex-1">
                                                Con nuestro método comprobado podrás estudiar inglés online, combinando teoría y práctica con ejercicios interactivos.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Phone Mockup Side */}
                        <div className="flex-1">
                            <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-md mx-auto">
                                <div className="relative">
                                    <div className="h-6 bg-black rounded-t-3xl flex items-center px-4">
                                        <div className="text-white text-xs">9:41</div>
                                    </div>
                                    <div className="aspect-[9/16] bg-gray-100">
                                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                            <img
                                                src="/api/placeholder/400/320"
                                                alt="Video call interface"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Login Modal */}
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
        </div>
    );
}
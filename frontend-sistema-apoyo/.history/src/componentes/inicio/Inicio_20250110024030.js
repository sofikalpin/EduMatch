import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, User, Lock, Mail, ChevronDown } from 'lucide-react';
import './Inicio.css';
import logo from '../../logo/LogoInicio.png'
import Imagen1 from './pexels-thirdman-6502820 (1) (1).jpg'


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
  .reviews-container {
    max-width: 1024px;
    margin: 0 auto;
    padding: 1.5rem;
  }
  
  .reviews-title {
    font-size: 1.875rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .reviews-summary {
    background-color: #f3f4f6;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .summary-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .rating-text {
    font-size: 1.25rem;
    font-weight: 700;
  }
  
  .total-reviews {
    color: #6b7280;
    font-size: 0.875rem;
  }
  
  .stars-container {
    display: flex;
    gap: 0.25rem;
  }
  
  .star {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .star-filled {
    color: #10b981;
    fill: #10b981;
  }
  
  .star-empty {
    color: #d1d5db;
  }
  
  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .review-card {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .review-content {
    color: #374151;
    margin: 0.75rem 0;
    line-height: 1.5;
  }
  
  .review-footer {
    display: flex;
    justify-content: space-between;
    color: #6b7280;
    font-size: 0.875rem;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .reviews-container {
      padding: 1rem;
    }
  
    .reviews-title {
      font-size: 1.5rem;
    }
  
    .review-card {
      padding: 1rem;
    }
  }

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
            <section className="seccion2">
              
                <div className="panel derecha">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Content Side */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h2 className="text-3xl font-boldtext-blue-900 mb-">
                                    Tres pilares de aprendizaje que garantizan tu fluidez
                                </h2>
                                <p className="text-gray-700">
                                    Con nuestro método de enseñanza y nuestra plataforma de aprendizaje, avanzarás de nivel rapidamente.
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
                                                <h3 className="font-semibold text-gray-900">Clases Grabadas</h3>  
                                                
                                            </div>
                                            
                                           
                                        </div>
                                    </button>
                                   
                                </div>

                                
                                
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
                                                <h3 className="font-semibold text-gray-900">Clases Personalizadas</h3>  
                                                
                                            </div>
                                            
                                           
                                        </div>
                                    </button>
                                   
                                </div>
                            
                                
                                
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
                                                <h3 className="font-semibold text-gray-900">Clases con Profesores Nativos</h3>  
                                                
                                            </div>
                                            
                                           
                                        </div>
                                    </button>
                                   
                                </div>
                            
                                
                                
                            </div>
                        </div>

                    </div>
                </div>
                <div className='panel-izquierda'>
            
                                        <div className="imagen-container">
                                            <img src={Imagen1} alt="img" className="img" />
                                           
                                        </div>
             
                </div>
                
            </section>
            <section className='seccion3'>
            <div className="reviews-container">
                <h1 className="reviews-title">
                    Conoce la opinión de nuestros estudiantes sobre nuestro curso de inglés en línea
                </h1>
                
                <div className="reviews-summary">
                    <div className="summary-header">
                    <span className="rating-text">Muy bueno</span>
                    <ReviewStars rating={4} />
                    </div>
                    <p className="total-reviews">En base a 6748 opiniones</p>
                </div>

                <div className="reviews-list">
                    {reviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                    ))}
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
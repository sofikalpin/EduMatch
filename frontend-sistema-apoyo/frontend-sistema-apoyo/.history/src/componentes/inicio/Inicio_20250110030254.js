import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, User, Lock, Mail, ChevronDown } from 'lucide-react';
import './Inicio.css';
import logo from '../../logo/LogoInicio.png'
import Imagen1 from './pexels-thirdman-6502820 (1) (1).jpg'
import { Star } from 'lucide-react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { footerSections, socialIcons } from './footerData';

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
  
    const ReviewStars = ({ rating }) => (
        <div className="stars-container">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`star ${i < rating ? 'star-filled' : 'star-empty'}`}
                />
            ))}
        </div>
    );
  
    const ReviewCard = ({ name, date, content, rating }) => (
        <div className="review-card">
            <ReviewStars rating={rating} />
            <p className="review-content">{content}</p>
            <div className="review-footer">
                <span>{name}</span>
                <span>{date}</span>
            </div>
        </div>
    );

    // Definición de reviews
    const reviews = [
        { name: 'Juan Pérez', date: '01/01/2025', content: 'Muy buen curso, aprendí mucho!', rating: 5 },
        { name: 'Ana Gómez', date: '12/12/2024', content: 'Excelente contenido, muy recomendable.', rating: 4 },
        { name: 'Carlos López', date: '11/11/2024', content: 'Me ayudó a mejorar mi inglés rápidamente.', rating: 4 },
        // Añade más opiniones según sea necesario
    ];
    const SocialIcon = (name) => {
        switch (name) {
          case 'Facebook': return Facebook;
          case 'Instagram': return Instagram;
          case 'Twitter': return Twitter;
          case 'Youtube': return Youtube;
          case 'Linkedin': return Linkedin;
          default: return null;
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
            <section className="seccion2">
                <div className="panel derecha">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Content Side */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-blue-900 mb-">
                                    Tres pilares de aprendizaje que garantizan tu fluidez
                                </h2>
                                <p className="text-gray-700">
                                    Con nuestro método de enseñanza y nuestra plataforma de aprendizaje, avanzarás de nivel rápidamente.
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
                <div className="panel-izquierda">
                    <div className="imagen-container">
                        <img src={Imagen1} alt="img" className="img" />
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="seccion3">
                <div className="reviews-container">
                    <h1 className="reviews-title">
                        Conoce la opinión de nuestros estudiantes sobre nuestro cursos de ingles
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
            <footer className="footer">
      <div className="footer-container">
        {/* Social Media Section */}
        <div className="social-section">
          <h2 className="social-title">¡Síguenos!</h2>
          <div className="social-icons">
            {socialIcons.map(({ name, color }) => {
              const Icon = SocialIcon(name);
              return Icon && (
                <Icon 
                  key={name} 
                  className={`social-icon ${color}`}
                />
              );
            })}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Footer Sections */}
          {Object.values(footerSections).map((section, index) => (
            <div key={index} className="footer-section">
              <h3 className="footer-title">{section.title}</h3>
              <ul className="footer-links">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App Download Section */}
          <div className="footer-section">
            <h3 className="footer-title">Descarga nuestra app</h3>
            <div className="app-buttons">
              <button className="app-button">
                <img src="/api/placeholder/24/24" alt="Play Store" className="app-icon" />
                Play Store
              </button>
              <button className="app-button">
                <img src="/api/placeholder/24/24" alt="Apple Store" className="app-icon" />
                Apple Store
              </button>
            </div>
            <div className="phone-number">
              <p>📞 0810-810-6736</p>
            </div>
          </div>
        </div>
      </div>
    </footer>

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

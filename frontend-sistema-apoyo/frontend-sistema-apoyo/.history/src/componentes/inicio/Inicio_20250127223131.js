import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star } from 'lucide-react';
import logo from '../../logo/LogoInicio.png';
import Imagen1 from './pexels-thirdman-6502820 (1) (1).jpg';
import Imagen2 from './pexels-katerina-holmes-5905709.jpg';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { footerSections, socialIcons } from './footerData';

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-20">
    <div className="bg-white p-8 rounded-xl w-96">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button onClick={onClose} aria-label="Cerrar modal">
          <X className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default function Inicio() {
  const [isLiveClassesOpen, setLiveClassesOpen] = useState(false);
  const [isLessonsOpen, setLessonsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const introRef = useRef(null);
  const cursosRef = useRef(null);
  const detallesRef = useRef(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-400'}`} />
      ))}
    </div>
  );

  const ReviewCard = ({ name, date, content, rating }) => (
    <div className="p-4 bg-white shadow-md rounded-xl border border-gray-200">
      <ReviewStars rating={rating} />
      <p className="text-gray-700 mt-2">{content}</p>
      <div className="flex justify-between mt-3 text-sm text-gray-500">
        <span>{name}</span>
        <span>{date}</span>
      </div>
    </div>
  );

  const reviews = [
    { name: 'Juan Pérez', date: '01/01/2025', content: 'Muy buen curso, aprendí mucho!', rating: 5 },
    { name: 'Ana Gómez', date: '12/12/2024', content: 'Excelente contenido, muy recomendable.', rating: 4 },
    { name: 'Carlos López', date: '11/11/2024', content: 'Me ayudó a mejorar mi inglés rápidamente.', rating: 4 },
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
    <div className="bg-gray-100">
      {/* Franja blanca con los botones de iniciar sesión y registrarse */}
      <div className="bg-white py-2 flex justify-end items-center px-6">
        <button
          onClick={() => { setShowLoginModal(true); setShowRegisterModal(false); }}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg mr-4"
          aria-label="Iniciar sesión"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => { setShowRegisterModal(true); setShowLoginModal(false); }}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg"
          aria-label="Registrarse"
        >
          Registrarse
        </button>
      </div>

      <header className="flex items-center justify-between p-6" style={{ backgroundColor: '#00A89F' }}>
        <img src={logo} alt="Logo" className="h-12" />
        <nav className="flex gap-6 justify-end flex-1">
          <Link 
            to="#" 
            onClick={() => introRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl"
            aria-label="Ir a Profesores"
          >
            Profesores
          </Link>
          <Link 
            to="#" 
            onClick={() => cursosRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl"
            aria-label="Ir a Programa"
          >
            Programa
          </Link>
          <Link 
            to="#" 
            onClick={() => detallesRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl"
            aria-label="Ir a Herramientas"
          >
            Herramientas
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-cover bg-center p-12 text-center" style={{ backgroundImage: `url(${Imagen2})` }} ref={introRef}>
        <h1 className="text-4xl font-bold text-white">Aprende Inglés de Manera Efectiva</h1>
        <p className="text-xl text-white mt-4">Clases personalizadas para todos los niveles con profesores nativos certificados</p>
        <div className="mt-6 flex justify-center gap-4">
          <button onClick={() => setShowRegisterModal(true)} className="px-6 py-3 bg-white text-blue-900 rounded-full" aria-label="Comienza Ahora">
            Comienza Ahora
          </button>
          <button className="px-6 py-3 border-2 border-white text-white rounded-full" aria-label="Conoce más">
            Conoce Más
          </button>
        </div>
      </section>

      {/* Tres pilares de aprendizaje */}
      <section className="p-12 bg-gray-50" ref={cursosRef}>
        <h2 className="text-3xl font-semibold text-blue-900 mb-8 text-center">
          Tres pilares de aprendizaje que garantizan tu fluidez
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-1 space-y-6">
            {['Clases Grabadas', 'Clases Personalizadas', 'Clases con Profesores Nativos'].map((title, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                <button onClick={() => setLiveClassesOpen(!isLiveClassesOpen)} className="w-full text-left" aria-label={`Ver ${title}`}>
                  <div className="flex justify-between items-center">
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  </div>
                </button>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3 flex justify-center">
            <img src={Imagen1} alt="Image" className="w-full h-auto rounded-xl shadow-md" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white py-12" ref={detallesRef}>
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-semibold text-blue-900 mb-6">Conoce la opinión de nuestros estudiantes</h1>
          <div className="flex justify-center items-center mb-8">
            <span className="text-lg text-gray-700 mr-4">Muy bueno</span>
            <ReviewStars rating={5} />
          </div>
          <div className="space-y-8">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            {socialIcons.map((iconName) => {
              const Icon = SocialIcon(iconName);
              return (
                <a key={iconName} href="#" className="hover:text-yellow-400">
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
          <div className="text-center">
            <p className="text-sm">&copy; 2025 Todos los derechos reservados</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <Modal title="Iniciar Sesión" onClose={() => setShowLoginModal(false)}>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Ingrese su correo electrónico"
              />
              {errors.loginEmail && <p className="text-red-500 text-sm">{errors.loginEmail}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                id="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Ingrese su contraseña"
              />
              {errors.loginPassword && <p className="text-red-500 text-sm">{errors.loginPassword}</p>}
            </div>
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded mt-4">Iniciar sesión</button>
          </form>
        </Modal>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <Modal title="Registrarse" onClose={() => setShowRegisterModal(false)}>
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Nombre Completo</label>
              <input
                type="text"
                id="name"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Ingrese su nombre completo"
              />
              {errors.registerName && <p className="text-red-500 text-sm">{errors.registerName}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Ingrese su correo electrónico"
              />
              {errors.registerEmail && <p className="text-red-500 text-sm">{errors.registerEmail}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                id="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                className="w-full p-2 border rounded mt-1"
                placeholder="Ingrese su contraseña"
              />
              {errors.registerPassword && <p className="text-red-500 text-sm">{errors.registerPassword}</p>}
            </div>
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded mt-4">Registrarse</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, User, Lock, Mail, ChevronDown } from 'lucide-react';
import logo from '../../logo/LogoInicio.png';
import Imagen1 from './pexels-thirdman-6502820 (1) (1).jpg';
import { Star } from 'lucide-react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { footerSections, socialIcons } from './footerData';

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
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-400'}`}
        />
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
      {/* Login Button */}
      <div className="absolute top-6 right-6 z-10">
        <button onClick={() => setShowLoginModal(true)} className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Iniciar Sesión
        </button>
      </div>

      {/* Navbar */}
      <header className="flex items-center justify-between p-6 bg-green-400 text-white">
        <img src={logo} alt="Logo" className="h-12" />
        <nav className="flex gap-6">
          <Link to="#" onClick={() => introRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            Profesores
          </Link>
          <Link to="#" onClick={() => cursosRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            Programa
          </Link>
          <Link to="#" onClick={() => detallesRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            Herramientas
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-cover bg-center p-12 text-center" style={{ backgroundImage: `url(${Imagen1})` }} ref={introRef}>
        <h1 className="text-4xl font-bold text-white">Aprende Inglés de Manera Efectiva</h1>
        <p className="text-xl text-white mt-4">Clases personalizadas para todos los niveles con profesores nativos certificados</p>
        <div className="mt-6 flex justify-center gap-4">
          <button onClick={() => setShowRegisterModal(true)} className="px-6 py-3 bg-white text-blue-900 rounded-full">
            Comienza Ahora
          </button>
          <button className="px-6 py-3 border-2 border-white text-white rounded-full">
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
            {/* Pilares Content */}
            {['Clases Grabadas', 'Clases Personalizadas', 'Clases con Profesores Nativos'].map((title, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                <button onClick={() => setLiveClassesOpen(!isLiveClassesOpen)} className="w-full text-left">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                      <div className="w-8 h-8 bg-cyan-400 rounded-full"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  </div>
                </button>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3 flex justify-center">
            <img src={Imagen1} alt="Image" className="w-full h-auto rounded-xl shadow-md" />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white py-12" ref={detallesRef}>
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-semibold text-blue-900 mb-6">Conoce la opinión de nuestros estudiantes</h1>
          <div className="flex justify-center items-center mb-8">
            <span className="text-lg text-gray-700 mr-4">Muy bueno</span>
            <ReviewStars rating={4} />
          </div>
          <p className="text-sm text-gray-500 mb-12">En base a 6748 opiniones</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-semibold mb-4">¡Síguenos!</h2>
              <div className="flex space-x-4">
                {socialIcons.map(({ name, color }) => {
                  const Icon = SocialIcon(name);
                  return Icon && <Icon key={name} className={`text-2xl ${color}`} />;
                })}
              </div>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {Object.values(footerSections).map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-lg">{section.title}</h3>
                  <ul>
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href="#" className="text-gray-300 hover:text-white">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <p>📞 0810-810-6736</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

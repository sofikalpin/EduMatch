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
        <button onClick={onClose}>
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
      {/* Franja blanca con el botón de iniciar sesión */}
     {/* Franja blanca con los botones de iniciar sesión y registrarse */}
<div className="bg-white py-2 flex justify-end items-center px-6">
  <button
    onClick={() => setShowLoginModal(true)}
    className="px-6 py-2 bg-blue-500 text-white rounded-lg mr-4"
  >
    Iniciar Sesión
  </button>
  <button
    onClick={() => setShowRegisterModal(true)}
    className="px-6 py-2 bg-yellow-500 text-white rounded-lg"
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
    >
      Profesores
    </Link>
    <Link 
      to="#" 
      onClick={() => cursosRef.current?.scrollIntoView({ behavior: 'smooth' })}
      className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl"
    >
      Programa
    </Link>
    <Link 
      to="#" 
      onClick={() => detallesRef.current?.scrollIntoView({ behavior: 'smooth' })}
      className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl"
    >
     Conocenos
    </Link>
  </nav>
</header>

      {/* Hero Section */}
      <section
  className="bg-cover bg-center p-16 text-center min-h-[80vh]"
  style={{ backgroundImage: `url(${Imagen2})` }}
  ref={introRef}
>
  <div className="mt-20"> {/* Aumenté el margen superior aquí */}
    <h1 className="text-4xl font-bold text-white">Aprende Inglés de Manera Efectiva</h1>
    <p className="text-xl text-white mt-4">Clases personalizadas para todos los niveles con profesores nativos certificados</p>
  </div>
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
  <h2 className="text-3xl font-semibold text-blue-900 mb-8 text-center mgt-20">
    Tres pilares de aprendizaje que garantizan tu fluidez
  </h2>
  <div className=" flex flex-col lg:flex-row gap-8">
    <div className="lg:flex-1 space-y-8">
      {['Clases Grabadas', 'Clases Personalizadas', 'Clases con Profesores Nativos'].map((title, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow-md">
          <button onClick={() => setLiveClassesOpen(!isLiveClassesOpen)} className="w-full text-left">
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
          </button>
        </div>
      ))}
    </div>
    <div className="lg:w-1/3 flex justify-end">
      <img
        src={Imagen1}
        alt="Image"
        className="w-80 h-80 object-cover rounded-full shadow-md"
      />
    </div>
  </div>
</section>



   {/* Sección de Opiniones */}
   <section className="bg-white py-12 px-4 md:px-8 lg:px-16" ref={detallesRef}>
  <h1 className="text-3xl font-semibold text-blue-900 mb-6">Conoce la opinión de nuestros estudiantes</h1>
  
  {/* Rating general */}
  <div className="flex justify-center items-center mb-8">
    <span className="text-lg text-gray-700 mr-4">Muy bueno</span>
    <ReviewStars rating={4} />
  </div>
  
  <p className="text-sm text-gray-500 mb-12">En base a 6748 opiniones</p>
  
  {/* Tarjetas de reseñas */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {reviews.length > 0 ? (
      reviews.map((review, index) => (
        <div className="mb-6" key={index}> {/* Margen inferior entre las tarjetas */}
          <ReviewCard {...review} />
        </div>
      ))
    ) : (
      <p className="text-gray-500">No hay opiniones disponibles en este momento.</p>
    )}
  </div>
</section>


<footer className="bg-blue-900 text-white py-12">
  <div className="container mx-auto">
    <div className="flex flex-col lg:flex-row justify-between gap-8">
      {/* Síguenos Section */}
      <div className="lg:w-1/3 flex flex-col justify-end">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold">¡Síguenos!</h2>
          <div className="flex space-x-4">
            {socialIcons.map(({ name, color }) => {
              const Icon = SocialIcon(name);
              return Icon && <Icon key={name} className={`text-2xl ${color}`} />;
            })}
          </div>
        </div>
      </div>
      
      {/* Footer Sections */}
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
  </div>
</footer>


      {/* Login Modal */}
      {showLoginModal && (
        <Modal title="Iniciar Sesión" onClose={() => setShowLoginModal(false)}>
          <form onSubmit={handleLoginSubmit}>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              placeholder="Correo electrónico"
            />
            {errors.loginEmail && <p className="text-red-500">{errors.loginEmail}</p>}
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              placeholder="Contraseña"
            />
            {errors.loginPassword && <p className="text-red-500">{errors.loginPassword}</p>}
            <button type="submit" className="w-full bg-green-500 text-white py-3 rounded">
              Iniciar Sesión
            </button>
          </form>
        </Modal>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <Modal title="Crear Cuenta" onClose={() => setShowRegisterModal(false)}>
          <form onSubmit={handleRegisterSubmit}>
            <input
              type="text"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              placeholder="Nombre"
            />
            {errors.registerName && <p className="text-red-500">{errors.registerName}</p>}
            <input
              type="email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              placeholder="Correo electrónico"
            />
            {errors.registerEmail && <p className="text-red-500">{errors.registerEmail}</p>}
            <input
              type="password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
              placeholder="Contraseña"
            />
            {errors.registerPassword && <p className="text-red-500">{errors.registerPassword}</p>}
            <button type="submit" className="w-full bg-green-500 text-white py-3 rounded">
              Crear Cuenta
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

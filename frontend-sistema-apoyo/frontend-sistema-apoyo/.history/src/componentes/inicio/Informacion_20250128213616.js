import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Book, Shield, MessageSquare } from 'lucide-react';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';
import logo from '../../logo/LogoInicio.png';

// Constants
const FOOTER_SECTIONS = {
  section1: {
    title: "Información",
    links: ["Sobre Nosotros", "Términos y Condiciones", "Contacto"]
  },
  section2: {
    title: "Programas",
    links: ["Nivel Inicial", "Nivel Medio", "Nivel Superior"]
  }
};

const SOCIAL_ICONS = [
  { name: 'Facebook', color: 'hover:text-blue-500' },
  { name: 'Instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', color: 'hover:text-blue-400' },
  { name: 'Youtube', color: 'hover:text-red-500' },
  { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const NAV_ITEMS = [
  { id: "sobre-nosotros", Icon: Home, text: "Sobre Nosotros" },
  { id: "terminos", Icon: Book, text: "Términos y Condiciones" },
  { id: "contacto", Icon: MessageSquare, text: "Contacto" }
];

// NavItem component
const NavItem = ({ id, Icon, text, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${isActive ? 'bg-blue-600 text-black' : 'text-gray-300'}`}
  >
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </div>
);

// SobreNosotros component
const SobreNosotros = () => (
  <div className="p-8 max-w-3xl mx-auto space-y-6">
     <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">Sobre EduMatch</h1>
    <div className="p-8 bg-white rounded-lg shadow-xl space-y-6">
      <p className="text-lg text-gray-700 text-justify">
        <strong>EduMatch</strong> es una aplicación web de apoyo escolar enfocada en enseñar inglés, diseñada para estudiantes de todos los niveles. Con cursos que van desde lo inicial hasta lo avanzado, cada uno se adapta a las necesidades del estudiante, garantizando un aprendizaje progresivo y efectivo.
      </p>
      <p className="text-lg text-gray-700 text-justify">
        El nivel <strong>inicial</strong> cubre lo básico: gramática, vocabulario y pronunciación, estableciendo una base sólida. El nivel <strong>intermedio</strong> permite mejorar la comprensión y la confianza en conversaciones cotidianas. Y el nivel <strong>avanzado</strong> lleva el inglés a un nivel más profundo, ayudando a perfeccionar habilidades en áreas complejas del idioma.
      </p>
      <p className="text-lg text-gray-700 text-justify">
        Lo mejor de <strong>EduMatch</strong> es que no solo cuenta con contenidos interactivos como ejercicios, videos y cuestionarios, sino que cada profesor está capacitado para guiar a los estudiantes en su camino hacia la certificación de Cambridge. Los docentes están preparados para asegurar que los estudiantes alcancen el nivel necesario para obtener una certificación internacional, dándoles las herramientas necesarias para hacerlo con éxito.
      </p>
      <p className="text-lg text-gray-700 text-justify">
        <strong>EduMatch</strong> es una excelente opción para quienes buscan un aprendizaje serio y efectivo, con el respaldo de profesores calificados y la posibilidad de certificarse oficialmente en inglés.
      </p>
    </div>
    <div className="mt-8 text-center">
      <a href="/registrarse" className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors">
        ¡Únete ahora!
      </a>
    </div>
  </div>
);
// Contacto component
const Contacto = () => (
  <div className="p-8 max-w-3xl mx-auto space-y-6">
    <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">Contacto</h1>
    <div className="p-8 bg-white rounded-lg shadow-xl space-y-6">
      <p className="text-lg text-gray-700 text-justify">
        ¿Tienes preguntas o comentarios? Nos encantaría saber de ti. Rellena el siguiente formulario para ponerte en contacto con nosotros.
      </p>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-gray-800">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Tu nombre"
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-gray-800">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Tu correo electrónico"
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-lg font-semibold text-gray-800">Mensaje</label>
          <textarea
            id="message"
            name="message"
            placeholder="Escribe tu mensaje aquí"
            rows="4"
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors"
          >
            Enviar Mensaje
          </button>
        </div>
      </form>
    </div>
  </div>
);

// TerminosYCondiciones component
const TerminosYCondiciones = () => (
  <div className="p-8 max-w-5xl mx-auto space-y-6">
    <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">Términos y Condiciones</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">1. Aceptación de los Términos</h2>
        <p className="text-lg text-gray-700 mt-4">
          Al registrarte y usar EduMatch, aceptas cumplir con estos términos. Si no estás de acuerdo, no puedes usar la plataforma.
        </p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">2. Responsabilidades del Usuario</h2>
        <p className="text-lg text-gray-700 mt-4">
          El usuario es responsable de mantener la confidencialidad de su cuenta y de usar la plataforma de manera ética, sin infringir derechos de otros usuarios o de terceros.
        </p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">3. Modificaciones a los Términos</h2>
        <p className="text-lg text-gray-700 mt-4">
          EduMatch puede modificar estos términos en cualquier momento. Las modificaciones serán publicadas en esta página y serán efectivas inmediatamente después de su publicación.
        </p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">4. Terminación de los Servicios</h2>
        <p className="text-lg text-gray-700 mt-4">
          Podemos suspender o terminar tu acceso a la plataforma si incumples estos términos, sin previo aviso ni responsabilidad por daños ocasionados.
        </p>
      </div>
    </div>

    <div className="mt-8 text-center">
      <a href="/registrarse" className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors">
        ¡Únete ahora!
      </a>
    </div>
  </div>
);

const Navigation = ({ currentPage, setCurrentPage }) => (
  <nav className="w-64 bg-gradient-to-b from-gray-200 to-gray-100 p-6">
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-black text-center">Información</h2>
      <p className="text-black-400 text-sm mt-2">Centro de información</p>
    </div>
    <div className="space-y-3">
      {NAV_ITEMS.map(({ id, Icon, text }) => (
        <NavItem
          key={id}
          id={id}
          Icon={Icon}
          text={text}
          isActive={currentPage === id}
          onClick={() => setCurrentPage(id)}
        />
      ))}
    </div>
  </nav>
);

const InfoPages = () => {
  const [currentPage, setCurrentPage] = useState('sobre-nosotros');
  const navigate = useNavigate();

  const pageComponents = {
    'sobre-nosotros': <SobreNosotros />,
    'contacto': <Contacto />,
    'terminos': <TerminosYCondiciones />
  };

  return (
    <div className="min-h-screen flex flex-col">
       <TopBar 
        onLogin={() => navigate('/iniciarsesion')} 
        onRegister={() => navigate('/registrarse')} 
      />
      <Header 
        onNavigate={navigate}
        logo={logo}
      />

      <div className="flex flex-2">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 p-6">{pageComponents[currentPage]}</main>
      </div>

      <Footer 
        socialIcons={SOCIAL_ICONS}
        footerSections={FOOTER_SECTIONS}
        onNavigation={navigate}
      />
    </div>
  );
};

export default InfoPages;

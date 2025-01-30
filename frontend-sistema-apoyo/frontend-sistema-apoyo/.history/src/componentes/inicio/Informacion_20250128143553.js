import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Book, Shield, MessageSquare } from 'lucide-react';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';
import logo from '../../logo/LogoInicio.png';

// Constants remain the same
const FOOTER_SECTIONS = {
  section1: {
    title: "Información",
    links: ["Sobre Nosotros", "Términos y Condiciones", "Política de Privacidad", "Contacto"]
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
  { id: "terminos", Icon: Book, text: "Términos" },
  { id: "privacidad", Icon: Shield, text: "Privacidad" },
  { id: "contacto", Icon: MessageSquare, text: "Contacto" }
];

// NavItem component
const NavItem = ({ id, Icon, text, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${isActive ? 'bg-yellow-400 text-black' : 'text-white-300'}`}
  >
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </div>
);

// SobreNosotros component
const SobreNosotros = () => (
  <div className="p-8 max-w-3xl mx-auto space-y-6">
    <h1 className="text-5xl font-bold text-black-600 mb-6 text-center">Sobre EduMatch</h1>
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

const TerminosYCondiciones = () => (
  <div className="p-8 max-w-3xl mx-auto space-y-6">
    <h1 className="text-5xl font-bold text-blue-600 mb-6 text-center">Términos y Condiciones de Uso de EduMatch</h1>
    <div className="p-8 bg-white rounded-lg shadow-xl space-y-6">

      {/* Table of Contents */}
      <nav className="mb-6">
        <ul className="space-y-3">
          <li><a href="#aceptacion" className="text-lg text-blue-600 hover:underline">1. Aceptación de los Términos</a></li>
          <li><a href="#servicios" className="text-lg text-blue-600 hover:underline">2. Servicios Proporcionados</a></li>
          <li><a href="#responsabilidades" className="text-lg text-blue-600 hover:underline">3. Responsabilidades del Usuario</a></li>
          <li><a href="#modificaciones" className="text-lg text-blue-600 hover:underline">4. Modificaciones a los Términos</a></li>
          <li><a href="#terminacion" className="text-lg text-blue-600 hover:underline">5. Terminación de los Servicios</a></li>
        </ul>
      </nav>

      {/* Terms Section */}
      <p className="text-lg text-gray-700 text-justify">
        Bienvenido a <strong>EduMatch</strong>, una plataforma de apoyo escolar en inglés. Al acceder y utilizar nuestro servicio, usted acepta cumplir con los siguientes <strong>Términos y Condiciones</strong>. Por favor, lea detenidamente los siguientes puntos.
      </p>

      <h2 id="aceptacion" className="text-xl font-semibold text-gray-800">1. Aceptación de los Términos</h2>
      <p className="text-lg text-gray-700 text-justify">
        Al registrarse y utilizar los servicios de EduMatch, el usuario acepta estos Términos y Condiciones, así como nuestra <strong>Política de Privacidad</strong>. Si no está de acuerdo con algún término, le pedimos que se abstenga de usar la plataforma.
      </p>

      <h2 id="servicios" className="text-xl font-semibold text-gray-800">2. Servicios Proporcionados</h2>
      <p className="text-lg text-gray-700 text-justify">
        EduMatch ofrece una plataforma educativa en línea que incluye cursos de inglés en tres niveles: <strong>Inicial</strong>, <strong>Intermedio</strong> y <strong>Avanzado</strong>. Los usuarios tienen acceso a materiales educativos, ejercicios interactivos, videos y cuestionarios diseñados para mejorar su comprensión del idioma inglés. También contamos con la posibilidad de obtener la <strong>certificación Cambridge</strong>, apoyada por profesores capacitados para guiar a los estudiantes en su preparación.
      </p>

      <h2 id="responsabilidades" className="text-xl font-semibold text-gray-800">3. Responsabilidades del Usuario</h2>
      <p className="text-lg text-gray-700 text-justify">
        El usuario es responsable de la información que proporcione durante el registro y de mantener la confidencialidad de su cuenta. Además, debe usar los servicios de EduMatch de manera ética, no divulgando contenido que infrinja leyes o derechos de terceros.
      </p>

      <h2 id="modificaciones" className="text-xl font-semibold text-gray-800">4. Modificaciones a los Términos</h2>
      <p className="text-lg text-gray-700 text-justify">
        EduMatch se reserva el derecho de modificar estos términos en cualquier momento. Cualquier cambio será publicado en este documento, y se notificará a los usuarios si es necesario. El uso continuado de la plataforma implica la aceptación de las modificaciones.
      </p>

      <h2 id="terminacion" className="text-xl font-semibold text-gray-800">5. Terminación de los Servicios</h2>
      <p className="text-lg text-gray-700 text-justify">
        EduMatch se reserva el derecho de suspender o terminar los servicios de cualquier usuario que infrinja estos términos, sin previo aviso, y sin responsabilidad alguna por los daños ocasionados.
      </p>

      <div className="mt-8 text-center">
        <a href="/registrarse" className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors">
          ¡Únete ahora!
        </a>
      </div>
    </div>
  </div>
);

// Contacto component
const Contacto = () => (
  <div>
    <h1 className="text-3xl font-bold text-black">Contacto</h1>
  </div>
);

const Navigation = ({ currentPage, setCurrentPage }) => (
  <nav className="w-72 bg-gradient-to-b from-gray-200 to-gray-100 p-6">
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
        Info
      </h2>
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
      {/* Header */}
      <TopBar 
        onLogin={() => navigate('/iniciarsesion')} 
        onRegister={() => navigate('/registrarse')} 
      />
      <Header 
        onNavigate={navigate}
        logo={logo}
      />

      {/* Info Content */}
      <div className="flex flex-1 bg-gradient-to-br from-gray-300 to-gray-200">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 p-6">{pageComponents[currentPage]}</main>
      </div>

      {/* Footer */}
      <Footer sections={FOOTER_SECTIONS} socialIcons={SOCIAL_ICONS} />
    </div>
  );
};

export default InfoPages;

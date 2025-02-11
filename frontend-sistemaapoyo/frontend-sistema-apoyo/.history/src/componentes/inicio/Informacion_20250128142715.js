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
// SobreNosotros component
// SobreNosotros component
// SobreNosotros component
const SobreNosotros = () => (
  <div className="p-8 bg-white rounded-lg shadow-xl max-w-3xl mx-auto space-y-6">
    <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">Sobre EduMatch</h1>
    <div className="text-lg text-gray-700 space-y-6">
      <p>
        <strong>EduMatch</strong> es una aplicación web de apoyo escolar enfocada en enseñar inglés, diseñada para estudiantes de todos los niveles. Con cursos que van desde lo inicial hasta lo avanzado, cada uno se adapta a las necesidades del estudiante, garantizando un aprendizaje progresivo y efectivo.
      </p>
      <p>
        El nivel <strong>inicial</strong> cubre lo básico: gramática, vocabulario y pronunciación, estableciendo una base sólida. El nivel <strong>intermedio</strong> permite mejorar la comprensión y la confianza en conversaciones cotidianas. Y el nivel <strong>avanzado</strong> lleva el inglés a un nivel más profundo, ayudando a perfeccionar habilidades en áreas complejas del idioma.
      </p>
      <p>
        Lo mejor de <strong>EduMatch</strong> es que no solo cuenta con contenidos interactivos como ejercicios, videos y cuestionarios, sino que cada profesor está capacitado para guiar a los estudiantes en su camino hacia la certificación de Cambridge. Los docentes están preparados para asegurar que los estudiantes alcancen el nivel necesario para obtener una certificación internacional, dándoles las herramientas necesarias para hacerlo con éxito.
      </p>
      <p>
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
  <div>
    <h1 className="text-3xl font-bold text-black">Contacto</h1>
   
  </div>
);

const Navigation = ({ currentPage, setCurrentPage }) => (
  <nav className="w-72 bg-gradient-to-b from-gray-200 to-gray-100 p-6
">
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
    'contacto': <Contacto />
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
      <div className="flex flex-1 bg-gradient-to-br from-gray-300  to-gray-200">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 p-8">
          {pageComponents[currentPage] || <SobreNosotros />}
        </main>
      </div>

      {/* Footer */}
      <Footer 
        socialIcons={SOCIAL_ICONS}
        footerSections={FOOTER_SECTIONS}
        onNavigation={navigate}
      />
    </div>
  );
};

export default InfoPages;

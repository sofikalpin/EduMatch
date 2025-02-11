import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Book, Shield, MessageSquare, ChevronRight, ExternalLink } from 'lucide-react';
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

// Components remain the same...
// [Previous component definitions for PageContainer, Card, PageHeader, FormInput, etc. remain unchanged]

const Navigation = ({ currentPage, setCurrentPage }) => (
  <nav className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 p-6">
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
        Info
      </h2>
      <p className="text-gray-400 text-sm mt-2">Centro de información</p>
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
      <div className="flex flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
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
import { useState } from 'react';
import { Home, Book, Shield, MessageSquare, ChevronRight, ExternalLink } from 'lucide-react';

const InfoPages = () => {
  const [currentPage, setCurrentPage] = useState('sobre-nosotros');

  const Navigation = () => {
    const NavItem = ({ id, icon: Icon, text }) => (
      <button 
        onClick={() => setCurrentPage(id)}
        className={`w-full flex items-center space-x-3 p-4 rounded-2xl backdrop-blur-md transition-all duration-300 
          ${currentPage === id 
            ? 'bg-gradient-to-r from-blue-600/90 to-blue-400/90 text-white shadow-lg translate-x-2' 
            : 'hover:bg-white/10 text-gray-300'}`}
      >
        <Icon size={20} className="shrink-0" />
        <span className="font-medium">{text}</span>
        <ChevronRight 
          size={16} 
          className={`ml-auto transition-transform duration-300 
            ${currentPage === id ? 'rotate-90' : ''}`}
        />
      </button>
    );

    return (
      <nav className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-800 p-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Info
          </h2>
          <p className="text-gray-400 text-sm mt-2">Centro de información</p>
        </div>
        <div className="space-y-3">
          <NavItem id="sobre-nosotros" icon={Home} text="Sobre Nosotros" />
          <NavItem id="terminos" icon={Book} text="Términos" />
          <NavItem id="privacidad" icon={Shield} text="Privacidad" />
          <NavItem id="contacto" icon={MessageSquare} text="Contacto" />
        </div>
      </nav>
    );
  };

  const PageContainer = ({ children }) => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 p-8">
      <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/10">
        {children}
      </div>
    </div>
  );

  const Card = ({ children, className = "" }) => (
    <div className={`p-6 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );

  const SobreNosotros = () => (
    <PageContainer>
      <div className="space-y-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Sobre Nosotros
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Innovando el futuro, hoy.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <div className="flex flex-col h-full">
              <div className="rounded-xl bg-blue-500/10 p-3 w-fit mb-4">
                <Home className="text-blue-400" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-white mb-4">Nuestra Historia</h2>
              <p className="text-gray-300">
                Pioneros en innovación digital desde 2010, transformando ideas en realidades.
              </p>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col h-full">
              <div className="rounded-xl bg-blue-500/10 p-3 w-fit mb-4">
                <ExternalLink className="text-blue-400" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-white mb-4">Nuestra Misión</h2>
              <p className="text-gray-300">
                Impulsar la transformación digital con soluciones vanguardistas.
              </p>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col h-full">
              <div className="rounded-xl bg-blue-500/10 p-3 w-fit mb-4">
                <Shield className="text-blue-400" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-white mb-4">Valores</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <ChevronRight size={16} className="text-blue-400 mr-2" />
                  Innovación Continua
                </li>
                <li className="flex items-center">
                  <ChevronRight size={16} className="text-blue-400 mr-2" />
                  Excelencia Digital
                </li>
                <li className="flex items-center">
                  <ChevronRight size={16} className="text-blue-400 mr-2" />
                  Compromiso Total
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );

  const Contacto = () => (
    <PageContainer>
      <div className="space-y-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Contacto
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Conecta con nosotros
          </p>
        </header>

        <form className="max-w-2xl mx-auto space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="nombre">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Tu nombre"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="tu@email.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="mensaje">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              rows="5"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="¿En qué podemos ayudarte?"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 px-6 rounded-xl
                     hover:from-blue-700 hover:to-blue-500 transition-all duration-300 font-medium
                     shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </PageContainer>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'sobre-nosotros':
        return <SobreNosotros />;
      case 'contacto':
        return <Contacto />;
      default:
        return <SobreNosotros />;
    }
  };

  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 ml-72">
        {renderPage()}
      </main>
    </div>
  );
};

export default InfoPages;
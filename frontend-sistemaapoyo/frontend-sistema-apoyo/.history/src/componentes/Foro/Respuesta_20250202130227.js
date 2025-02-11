import React from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import HeaderForo from '../Profesor/HeaderProfesor';
import logo from '../../logo/LogoInicio.png';
import Footer from './FooterForo';
import { useNavigate } from 'react-router-dom';  // Importa el hook de navegación

const socialIcons = [
  { name: 'Facebook', color: 'hover:text-blue-500' },
  { name: 'Instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', color: 'hover:text-blue-400' },
  { name: 'Youtube', color: 'hover:text-red-500' },
  { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Respuesta = ({ question }) => {
  const navigate = useNavigate();  // Usar el hook de navegación
  
  const onBack = () => {
    navigate('/foro');  // Ruta a la que se navega al hacer clic en "Volver al foro"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* HeaderForo ocupa todo el ancho de la pantalla */}
      <HeaderForo logo={logo} className="w-full" />
      
      {/* Contenido principal adaptado a toda la pantalla */}
      <div className="flex-1 container mx-auto p-6 mb-16">
        <button
          onClick={onBack}  // Llama a la función onBack
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver al foro</span>
        </button>

        {/* Contenedor blanco para la pregunta y la respuesta */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-16">
          {/* Pregunta */}
          <Card className="mb-6">
            <CardContent className="text-gray-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {question?.author?.[0] || 'U'}
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-gray-900">{question?.author || 'Usuario'}</h3>
                  <p className="text-sm text-gray-500">{question?.date || 'Fecha'}</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed">{question?.content || 'Contenido de la pregunta'}</p>
            </CardContent>
          </Card>

          {/* Formulario de respuesta */}
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-left">Tu Respuesta</h2>

              <textarea
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent min-h-[150px] mb-4 text-lg leading-relaxed"
                placeholder="Escribe tu respuesta aquí..."
              />

              <button className="inline-flex items-center gap-3 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg">
                <Send className="w-5 h-5" />
                <span>Enviar Respuesta</span>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer 
        socialIcons={socialIcons}
        onNavigation={navigate}  // Asegúrate de pasar el hook de navegación al Footer
      />
    </div>
  );
};

export default Respuesta;

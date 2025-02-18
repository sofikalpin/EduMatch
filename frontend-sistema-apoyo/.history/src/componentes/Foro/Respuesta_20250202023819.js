import React from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import HeaderForo from './HeaderForo';
import logo from '../../logo/LogoInicio.png';

// Componente Card básico
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

const Respuesta = ({ onBack, question }) => {
  return (
    <div className="min-h-screen flex flex-col  from-grey-900 ">
      {/* HeaderForo ocupa todo el ancho de la pantalla */}
      <HeaderForo logo={logo} className="w-full" />

      {/* Contenido principal adaptado a toda la pantalla */}
      

        <div className="container mx-auto relative">
            <div className="flex-1 p-6"> 
            <button
  onClick={onBack}
  className="absolute top-10 left-6 inline-flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium text-xl z-10"
>
  <ArrowLeft className="w-8 h-5" />
  <span>Volver al foro</span>
</button>

          {/* Botón de volver, más arriba dentro de la parte verde agua */}
         
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
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tu Respuesta</h2>

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
      </div>
    </div>
  );
};

export default Respuesta;

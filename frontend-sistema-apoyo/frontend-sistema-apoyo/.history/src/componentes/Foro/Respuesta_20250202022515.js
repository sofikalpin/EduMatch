import React from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import HeaderForo from './HeaderForo';
import logo from '../../logo/LogoInicio.png';

// Componente Card básico
const Card = ({ children, className }) => (
  <div className={`border rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

const Respuesta = ({ onBack, question }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HeaderForo ocupa todo el ancho de la pantalla */}
      <HeaderForo logo={logo} className="w-full" />

      {/* Contenido centrado */}
      <div className="max-w-2xl mx-auto flex-1 p-6">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al foro</span>
        </button>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                {question?.author?.[0] || 'U'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{question?.author || 'Usuario'}</h3>
                <p className="text-sm text-gray-500">{question?.date || 'Fecha'}</p>
              </div>
            </div>
            <p className="text-gray-700">{question?.content || 'Contenido de la pregunta'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tu Respuesta</h2>

            <textarea
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent min-h-[150px] mb-4"
              placeholder="Escribe tu respuesta aquí..."
            />

            <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              <Send className="w-4 h-4" />
              <span>Enviar Respuesta</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Respuesta;
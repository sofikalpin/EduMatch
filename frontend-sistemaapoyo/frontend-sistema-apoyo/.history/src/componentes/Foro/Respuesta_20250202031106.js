import React, { useState } from 'react';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
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
  const [showResponses, setShowResponses] = useState(false); // Estado para controlar la visibilidad de las respuestas

  const responses = [
    {
      author: "María González",
      date: "19 de Octubre",
      content: "El past simple se usa para acciones completadas en el pasado. Por ejemplo: 'I watched a movie yesterday.'",
      likes: 5
    },
    {
      author: "Juan Silva",
      date: "19 de Octubre",
      content: "También se usa para una serie de acciones consecutivas en el pasado: 'I woke up, had breakfast, and went to work.'",
      likes: 3
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* HeaderForo ocupa todo el ancho de la pantalla */}
      <HeaderForo logo={logo} className="w-full" />

      {/* Contenido principal adaptado a toda la pantalla */}
      <div className="container mx-auto relative">
        <div className="flex-1 p-6">
          {/* Botón de volver */}
          <button 
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Volver al foro</span>
          </button>

          {/* Contenedor blanco para la pregunta y las respuestas */}
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

            {/* Botón para mostrar/ocultar respuestas */}
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <MessageSquare className="w-4 h-4" />
              <span>{responses.length} respuestas</span>
              <button 
                onClick={() => setShowResponses(!showResponses)} // Alternar visibilidad de respuestas
                className="ml-4 text-blue-600 hover:text-blue-800"
              >
                {showResponses ? 'Ocultar respuestas' : 'Ver respuestas'}
              </button>
            </div>

            {/* Mostrar respuestas si está habilitado */}
            {showResponses && (
              <div className="space-y-4">
                {responses.map((response, index) => (
                  <Card key={index}>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {response.author[0]}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{response.author}</h3>
                          <p className="text-sm text-gray-500">{response.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{response.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

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
    </div>
  );
};

export default Respuesta;

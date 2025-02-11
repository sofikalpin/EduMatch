import React, { useState } from 'react';
import { ArrowLeft, MessageSquare } from 'lucide-react';

const VerRespuestas = ({ onBack, question }) => {
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
    <div className="max-w-2xl mx-auto">
      {/* Foro */}
      <button 
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al foro</span>
      </button>
      
      {/* Mostrar la pregunta */}
      <div className="bg-white shadow-md rounded-lg mb-6">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
              {question?.author?.[0] || 'U'}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{question?.author || 'Usuario'}</h3>
              <p className="text-sm text-gray-500">{question?.date || 'Fecha'}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{question?.content || 'Contenido de la pregunta'}</p>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MessageSquare className="w-4 h-4" />
            <span>{responses.length} respuestas</span>
            {/* Botón para mostrar respuestas */}
            <button 
              onClick={() => setShowResponses(!showResponses)} // Alternar visibilidad de respuestas
              className="ml-4 text-blue-600 hover:text-blue-800"
            >
              {showResponses ? 'Ocultar respuestas' : 'Ver respuestas'}
            </button>
          </div>
        </div>
      </div>

      {/* Mostrar las respuestas si showResponses es true */}
      {showResponses && (
        <div className="space-y-4">
          {responses.map((response, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg">
              <div className="p-6">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerRespuestas;

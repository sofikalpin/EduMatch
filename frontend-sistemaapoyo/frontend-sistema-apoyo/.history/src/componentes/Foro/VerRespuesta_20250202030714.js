import React from 'react';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@mui/material'; // Si usas Material-UI
// O, si creas tus propios componentes, asegúrate de importarlos como corresponde
// import { Card } from './Card';
// import { CardContent } from './CardContent';

const VerRespuestas = ({ onBack, question }) => {
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
            <p className="text-gray-700 mb-4">{question?.content || 'Contenido de la pregunta'}</p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MessageSquare className="w-4 h-4" />
              <span>{responses.length} respuestas</span>
            </div>
          </CardContent>
        </Card>
  
        <div className="space-y-4">
          {responses.map((response, index) => (
            <Card key={index}>
              <CardContent className="p-6">
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
      </div>
    );
};

export default VerRespuestas;

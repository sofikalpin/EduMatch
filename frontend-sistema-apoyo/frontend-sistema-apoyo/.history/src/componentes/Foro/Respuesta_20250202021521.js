import React from 'react';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const NuevaConsulta = ({ onBack }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al foro</span>
      </button>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nueva Consulta</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input 
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Escribe un título descriptivo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select 
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="grammar">Gramática</option>
                <option value="vocabulary">Vocabulario</option>
                <option value="pronunciation">Pronunciación</option>
                <option value="other">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consulta
              </label>
              <textarea 
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent min-h-[150px]"
                placeholder="Describe tu consulta en detalle"
              />
            </div>

            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Publicar Consulta
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
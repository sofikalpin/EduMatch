import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';

const NuevaConsulta = ({ onBack }) => {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('grammar');
  const [consulta, setConsulta] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !consulta.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    console.log({ titulo, categoria, consulta });
    // Aquí podrías enviar los datos a tu backend o manejarlos como necesites
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Volver al foro</span>
      </button>

      <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Nueva Consulta</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
            Título
          </label>
          <input 
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-sm"
            placeholder="Escribe un título descriptivo"
          />
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select 
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-sm"
          >
            <option value="grammar">Gramática</option>
            <option value="vocabulary">Vocabulario</option>
            <option value="pronunciation">Pronunciación</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="consulta" className="block text-sm font-medium text-gray-700 mb-2">
            Consulta
          </label>
          <textarea 
            id="consulta"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-sm min-h-[150px]"
            placeholder="Describe tu consulta en detalle"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg transition-all duration-200"
        >
          <Send className="w-5 h-5" />
          Publicar Consulta
        </button>
      </form>
    </div>
  );
};

export default NuevaConsulta;
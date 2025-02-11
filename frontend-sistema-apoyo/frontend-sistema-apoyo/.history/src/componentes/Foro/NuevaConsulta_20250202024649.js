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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button 
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al foro</span>
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Nueva Consulta</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input 
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Escribe un título descriptivo"
          />
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select 
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="grammar">Gramática</option>
            <option value="vocabulary">Vocabulario</option>
            <option value="pronunciation">Pronunciación</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="consulta" className="block text-sm font-medium text-gray-700 mb-1">
            Consulta
          </label>
          <textarea 
            id="consulta"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent min-h-[150px]"
            placeholder="Describe tu consulta en detalle"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <Send className="w-5 h-5" />
          Publicar Consulta
        </button>
      </form>
    </div>
  );
};

export default NuevaConsulta;

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
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-2xl rounded-3xl border border-gray-200 flex flex-col gap-6">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
      >
        <ArrowLeft className="w-6 h-6" />
        <span>Volver al foro</span>
      </button>

      <h2 className="text-4xl font-bold text-gray-900 text-center">Nueva Consulta</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" className="text-lg font-semibold text-gray-800">
            Título
          </label>
          <input 
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-md bg-gray-50"
            placeholder="Escribe un título descriptivo"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="categoria" className="text-lg font-semibold text-gray-800">
            Categoría
          </label>
          <select 
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-md bg-gray-50"
          >
            <option value="grammar">Gramática</option>
            <option value="vocabulary">Vocabulario</option>
            <option value="pronunciation">Pronunciación</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="consulta" className="text-lg font-semibold text-gray-800">
            Consulta
          </label>
          <textarea 
            id="consulta"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-md bg-gray-50 min-h-[150px]"
            placeholder="Describe tu consulta en detalle"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-teal-500 to-teal-700 hover:opacity-90 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-xl transition-all duration-300"
        >
          <Send className="w-6 h-6" />
          Publicar Consulta
        </button>
      </form>
    </div>
  );
};

export default NuevaConsulta;

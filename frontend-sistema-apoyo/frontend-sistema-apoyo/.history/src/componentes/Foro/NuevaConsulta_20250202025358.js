import React, { useState } from 'react';
import { ArrowLeft, Send, X } from 'lucide-react';
import HeaderForo from './HeaderForo';
import logo from '../../logo/LogoInicio.png';

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
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <HeaderForo logo={logo} className="w-full" />
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium self-start"
      >
        <ArrowLeft className="w-6 h-6" />
        <span>Volver al foro</span>
      </button>

      <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-8">Nueva Consulta</h2>
      
      <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Título <span className="text-gray-500 dark:text-gray-400">({titulo.length}/100)</span>
          </label>
          <input 
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value.slice(0, 100))}
            className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm"
            placeholder="Escribe un título descriptivo"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="categoria" className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Categoría
          </label>
          <select 
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm"
          >
            <option value="grammar">Gramática</option>
            <option value="vocabulary">Vocabulario</option>
            <option value="pronunciation">Pronunciación</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="consulta" className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Consulta <span className="text-gray-500 dark:text-gray-400">({consulta.length}/500)</span>
          </label>
          <textarea 
            id="consulta"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value.slice(0, 500))}
            className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm min-h-[150px]"
            placeholder="Describe tu consulta en detalle"
          />
        </div>

        <div className="flex gap-4">
          <button 
            type="button"
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 shadow-md transition-all duration-300"
          >
            <X className="w-6 h-6" />
            Cancelar
          </button>
          
          <button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 shadow-md transition-all duration-300"
          >
            <Send className="w-6 h-6" />
            Publicar Consulta
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevaConsulta;

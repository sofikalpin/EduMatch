import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import HeaderForo from '../HeaderAlumno';
import logo from '../../logo/LogoInicio.png';
import Footer from '../FooterAlumno';

const socialIcons = [
  { name: 'Facebook', color: 'hover:text-blue-500' },
  { name: 'Instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', color: 'hover:text-blue-400' },
  { name: 'Youtube', color: 'hover:text-red-500' },
  { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const NuevaConsulta = () => {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('grammar');
  const [consulta, setConsulta] = useState('');
  
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !consulta.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    console.log({ titulo, categoria, consulta });
    // Aquí podrías enviar los datos a tu backend o manejarlos como necesites
  };

  const onBack = () => {
    navigate('/foro'); // Cambia '/foro' por la ruta que desees
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <HeaderForo logo={logo} />

      <div className="flex-grow flex flex-col items-center justify-center p-6 mb-16">
        <button 
          onClick={onBack} // Ahora usas la función onBack que navega a la ruta
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver al foro</span>
        </button>

        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Nueva Consulta</h2>
        
        <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo" className="text-lg font-semibold text-gray-800">
              Título
            </label>
            <input 
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-sm bg-white"
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
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-sm bg-white"
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
              className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-sm bg-white min-h-[150px]"
              placeholder="Describe tu consulta en detalle"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 shadow-md transition-all duration-300"
          >
            <Send className="w-6 h-6" />
            Publicar Consulta
          </button>
        </form>
      </div>

      <Footer socialIcons={socialIcons} />
    </div>
  );
};

export default NuevaConsulta;

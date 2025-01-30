import React, { useState } from 'react';

// Navigation Component
const Informacion = ({ currentPage, setCurrentPage }) => (
  <nav className="bg-blue-800 text-white p-6 fixed left-0 top-0 h-full w-64">
    <h2 className="text-xl font-bold mb-6">Información</h2>
    <ul className="space-y-3">
      <li>
        <button 
          onClick={() => setCurrentPage('sobre-nosotros')} 
          className={`block w-full text-left hover:bg-blue-700 p-2 rounded ${currentPage === 'sobre-nosotros' ? 'bg-blue-700' : ''}`}
        >
          Sobre Nosotros
        </button>
      </li>
      <li>
        <button 
          onClick={() => setCurrentPage('terminos')} 
          className={`block w-full text-left hover:bg-blue-700 p-2 rounded ${currentPage === 'terminos' ? 'bg-blue-700' : ''}`}
        >
          Términos y Condiciones
        </button>
      </li>
      <li>
        <button 
          onClick={() => setCurrentPage('privacidad')} 
          className={`block w-full text-left hover:bg-blue-700 p-2 rounded ${currentPage === 'privacidad' ? 'bg-blue-700' : ''}`}
        >
          Política de Privacidad
        </button>
      </li>
      <li>
        <button 
          onClick={() => setCurrentPage('contacto')} 
          className={`block w-full text-left hover:bg-blue-700 p-2 rounded ${currentPage === 'contacto' ? 'bg-blue-700' : ''}`}
        >
          Contacto
        </button>
      </li>
    </ul>
  </nav>
);

// About Us Page
const SobreNosotros = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Sobre Nosotros</h1>
      <div className="space-y-6">
        <section className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="text-gray-700 leading-relaxed">
            Desde nuestros inicios, nos hemos dedicado a proporcionar servicios 
            excepcionales a nuestros clientes. Con más de una década de experiencia, 
            hemos crecido hasta convertirnos en líderes del sector.
          </p>
        </section>
        <section className="py-6">
          <h2 className="text-xl font-semibold mb-4">Nuestra Misión</h2>
          <p className="text-gray-700 leading-relaxed">
            Nos comprometemos a ofrecer soluciones innovadoras y servicios de 
            alta calidad, siempre poniendo las necesidades de nuestros clientes 
            en primer lugar.
          </p>
        </section>
        <section className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Nuestros Valores</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Excelencia en el servicio</li>
            <li>Innovación continua</li>
            <li>Integridad y transparencia</li>
            <li>Compromiso con el cliente</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
);

// Terms and Conditions Page
const Terminos = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Términos y Condiciones</h1>
      <div className="space-y-6">
        <section className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">1. Aceptación de Términos</h2>
          <p className="text-gray-700 leading-relaxed">
            Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos 
            términos y condiciones de uso. Si no está de acuerdo con alguno de estos 
            términos, le rogamos que no utilice nuestro sitio.
          </p>
        </section>
        <section className="border-b py-6">
          <h2 className="text-xl font-semibold mb-4">2. Uso del Servicio</h2>
          <p className="text-gray-700 leading-relaxed">
            Nuestros servicios están destinados únicamente para uso legal. El usuario 
            se compromete a no utilizar el servicio para fines ilícitos o prohibidos 
            por estos términos.
          </p>
        </section>
        <section className="pt-6">
          <h2 className="text-xl font-semibold mb-4">3. Modificaciones</h2>
          <p className="text-gray-700 leading-relaxed">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. 
            Los cambios entrarán en vigor inmediatamente después de su publicación.
          </p>
        </section>
      </div>
    </div>
  </div>
);

// Privacy Policy Page
const Privacidad = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Política de Privacidad</h1>
      <div className="space-y-6">
        <section className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Recopilación de Datos</h2>
          <p className="text-gray-700 leading-relaxed">
            Recopilamos información personal únicamente cuando es necesario para 
            proporcionar nuestros servicios. Esta información puede incluir su 
            nombre, dirección de correo electrónico y datos de contacto.
          </p>
        </section>
        <section className="border-b py-6">
          <h2 className="text-xl font-semibold mb-4">Uso de la Información</h2>
          <p className="text-gray-700 leading-relaxed">
            La información recopilada se utiliza exclusivamente para mejorar 
            nuestros servicios y proporcionar una mejor experiencia al usuario. 
            No compartimos sus datos con terceros sin su consentimiento.
          </p>
        </section>
        <section className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Sus Derechos</h2>
          <p className="text-gray-700 leading-relaxed">
            Usted tiene derecho a acceder, corregir o eliminar su información 
            personal en cualquier momento. Para ejercer estos derechos, póngase 
            en contacto con nuestro equipo de soporte.
          </p>
        </section>
      </div>
    </div>
  </div>
);

// Contact Page
const Contacto = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Contacto</h1>
      <form className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Su nombre"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="su@email.com"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="mensaje">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            rows="5"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Escriba su mensaje aquí..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enviar Mensaje
        </button>
      </form>
    </div>
  </div>
);

export default Informacion;


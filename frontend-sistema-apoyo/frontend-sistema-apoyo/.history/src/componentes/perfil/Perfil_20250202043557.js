import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import logo from '../../logo/LogoInicio.png';
import HeaderForo from '../Foro/HeaderForo';
import Footer from '../Foro/FooterForo';

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal
  const navigate = useNavigate(); // Hook para redirigir

  const socialIcons = [
    { name: 'Facebook', color: 'hover:text-blue-500' },
    { name: 'Instagram', color: 'hover:text-pink-500' },
    { name: 'Twitter', color: 'hover:text-blue-400' },
    { name: 'Youtube', color: 'hover:text-red-500' },
    { name: 'Linkedin', color: 'hover:text-blue-700' }
  ];

  // Función para abrir el modal
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar sesión (redirigir al inicio)
  const handleLogoutConfirm = () => {
    // Aquí puedes agregar lógica de cierre de sesión si lo necesitas
    // Después de cerrar sesión, redirigimos a la página de inicio
    navigate('/');
  };

  // Función para cerrar el modal sin hacer nada
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-full lg:max-w-4xl mx-auto">
      <HeaderForo logo={logo} />
      <h2 className="text-[#1B1B1B] text-lg font-bold mb-6">Datos personales</h2>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-20">
        <div className="flex justify-center lg:w-[250px] lg:h-[250px] bg-[#F6F6F6] rounded-full items-center mb-8 lg:mb-0">
          <p className="text-[32px] font-medium text-[#AEAEAE]">No photo</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <p className="font-medium">Nombre</p>
            <p className="text-[#606060]">Sofia</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Apellido</p>
            <p className="text-[#606060]">Kalpin</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Correo electrónico</p>
            <p className="text-[#606060]">sofikalpin@hotmail.com</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Contraseña</p>
            <p className="text-[#606060]">*******</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Rol</p>
            <p className="text-[#606060]">Profesor</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Nivel</p>
            <p className="text-[#606060]">B1- Intermedio</p>
          </div>
        </div>
      </div>

      {/* Botón de Cerrar sesión */}
      <div className="mt-6 flex justify-end">
        <button 
          className="bg-red-600 text-white px-6 py-3 rounded-full text-lg hover:bg-red-700 transition-colors"
          onClick={handleLogoutClick} 
        >
          Cerrar sesión
        </button>
      </div>

      {/* Modal de Confirmación */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-center text-lg font-semibold mb-4">
              ¿Estás seguro que quieres cerrar sesión?
            </h3>
            <div className="flex justify-between">
              <button 
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400" 
                onClick={handleModalClose}
              >
                Cancelar
              </button>
              <button 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={handleLogoutConfirm}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer socialIcons={socialIcons} />
    </div>
  );
};

export default ProfilePage;

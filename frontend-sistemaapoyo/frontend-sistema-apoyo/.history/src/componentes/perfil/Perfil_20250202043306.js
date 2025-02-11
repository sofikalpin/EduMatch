import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Para la redirección

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal
  const navigate = useNavigate(); // Hook para redirigir

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
        {/* Aquí va el resto del contenido de la página de perfil */}
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

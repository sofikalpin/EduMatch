import React, { useState } from "react";
import logo from "../../logo/LogoInicio.png";
import { AiOutlineMessage } from "react-icons/ai"; // Ícono de chat
import Modal from "react-modal";
import { useNavigate } from "react-router-dom"; // Usamos useNavigate en lugar de useHistory

// Establece el elemento raíz para el modal
Modal.setAppElement("#root");

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú de usuario
    const navigate = useNavigate(); // Usamos useNavigate para navegar

    // Función para abrir el modal de chats
    const openModal = () => setIsModalOpen(true);

    // Función para cerrar el modal de chats
    const closeModal = () => setIsModalOpen(false);

    // Función para alternar la visibilidad del menú de usuario
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Función para ir al perfil
    const goToProfile = () => {
        navigate("/perfil"); // Asegúrate de que "/perfil" es la ruta correcta
    };

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        const confirmLogout = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
        if (confirmLogout) {
            navigate("/"); // Redirige al inicio después de confirmar
        }
    };

    return (
        <div className="flex flex-col w-full">
            {/* Logo Section */}
            <div className="bg-white py-2 flex justify-end items-center px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-center">
                    <img 
                        src={logo} 
                        alt="EDU-MATCH" 
                        className="h-11" 
                    />
                </div>
            </div>
            
            {/* Navigation Bar */}
            <div className="flex items-center justify-between p-6" style={{ backgroundColor: '#00A89F' }}>
                <div className="max-w-7xl mx-auto px-4 w-full">
                    <div className="flex items-center justify-between h-14">
                        {/* Left Navigation */}
                        <nav className="flex items-center space-x-8">
                            <a
                                href="#"
                                className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors flex items-center gap-1"
                            >
                                Mis Cursos
                            </a>
                            <a
                                href="#"
                                className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors flex items-center gap-1"
                            >
                                Alumnos
                            </a>
                        </nav>

                        {/* User Profile */}
                        <div className="flex items-center space-x-3 relative">
                            {/* Message Icon on the left with onClick to open modal */}
                            <button onClick={openModal} className="text-white text-2xl">
                                <AiOutlineMessage />
                            </button>
                            <span 
                                className="text-white font-bold text-xl cursor-pointer" 
                                onClick={toggleMenu}
                            >
                                Maria A
                            </span>
                            <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center text-white font-medium text-xl">
                                M
                            </div>

                            {/* User Menu (Dropdown below the user's name) */}
                            {isMenuOpen && (
                                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-48 p-4 mt-2">
                                    <ul className="space-y-3">
                                        <li
                                            className="text-gray-800 hover:text-blue-500 cursor-pointer"
                                            onClick={goToProfile} // Redirige al perfil
                                        >
                                            Ver Perfil
                                        </li>
                                        <li
                                            className="text-gray-800 hover:text-blue-500 cursor-pointer"
                                            onClick={handleLogout} // Confirma y cierra sesión
                                        >
                                            Cerrar Sesión
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for chats */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Chat Modal"
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div className="bg-white p-6 rounded-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Chats</h2>
                    {/* Aquí puedes agregar la lista de chats o el contenido que necesites */}
                    <p>Contenido de los chats...</p>
                    <button onClick={closeModal} className="bg-red-500 text-white p-2 rounded mt-4">
                        Cerrar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Header;

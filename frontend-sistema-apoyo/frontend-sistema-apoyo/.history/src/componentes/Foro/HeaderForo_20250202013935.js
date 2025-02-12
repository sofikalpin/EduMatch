import React, { useState } from "react";
import logo from "../../logo/LogoInicio.png";
import { AiOutlineMessage } from "react-icons/ai"; // Usamos el ícono AiOutlineMessage
import Modal from "react-modal";

// Establece el elemento raíz para el modal
Modal.setAppElement("#root");

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para abrir el modal
    const openModal = () => setIsModalOpen(true);

    // Función para cerrar el modal
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex flex-col w-full">
            {/* Logo Section */}
            <div className="bg-white py-2 flex justify-end items-center px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-center">
                    <img 
                        src={logo} 
                        alt="EDU-MATCH" 
                        className="h-8" 
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
                        <div className="flex items-center space-x-3">
                            {/* Message Icon on the left with onClick to open modal */}
                            <button onClick={openModal} className="text-white text-2xl">
                                <AiOutlineMessage />
                            </button>
                            <span className="text-white font-bold text-xl">Maria A</span>
                            <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center text-white font-medium text-xl">
                                M
                            </div>
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

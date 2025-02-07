import React, { useState } from "react";
import logo from "../../logo/LogoInicio.png";
import { AiOutlineMessage } from "react-icons/ai";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const goToProfile = () => navigate("/perfil");
    const handleLogoutClick = () => setIsLogoutModalOpen(true);
    const handleLogout = () => navigate("/");
    const closeLogoutModal = () => setIsLogoutModalOpen(false);
    const goToAlumno = () => navigate("/alumno");

    return (
        <div className="flex flex-col w-full">
            <div className="bg-white py-2 flex justify-end items-center px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-center">
                    <img 
                        src={logo} 
                        alt="EDU-MATCH" 
                        className="h-11 cursor-pointer" 
                        onClick={goToAlumno} 
                    />
                </div>
            </div>
            
            <div className="flex items-center justify-between p-6" style={{ backgroundColor: '#00A89F' }}>
                <div className="max-w-7xl mx-auto px-4 w-full">
                    <div className="flex items-center justify-between h-14">
                        <nav className="flex items-center space-x-8">
                            <a
                                href="#"
                                onClick={goToAlumno}
                                className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors flex items-center gap-1"
                            >
                                Mis Cursos
                            </a>
                        </nav>

                        <div className="flex items-center space-x-3 relative">
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

                            {isMenuOpen && (
                                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-48 p-4 mt-2">
                                    <ul className="space-y-3">
                                        <li className="text-gray-800 hover:text-blue-500 cursor-pointer" onClick={goToProfile}>
                                            Ver Perfil
                                        </li>
                                        <li className="text-gray-800 hover:text-blue-500 cursor-pointer" onClick={handleLogoutClick}>
                                            Cerrar Sesión
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">¿Estás seguro de que quieres cerrar sesión?</h3>
                        <div className="flex justify-between">
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
                                Aceptar
                            </button>
                            <button onClick={closeLogoutModal} className="bg-gray-300 text-black px-4 py-2 rounded-md">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Chat Modal"
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div className="bg-white p-6 rounded-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Chats</h2>
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

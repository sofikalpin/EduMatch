import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { AiOutlineMessage } from "react-icons/ai";
import logo from "../../logo/LogoInicio.png";

Modal.setAppElement("#root");

const Header = () => {
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);
    
    const goToProfile = () => {
        navigate("/perfil");
        closeMenu();
    };

    const handleLogoutClick = () => setIsLogoutModalOpen(true);

    const handleLogout = () => {
        setIsLogoutModalOpen(false);
        setIsMenuOpen(false);
        navigate("/");
    };

    return (
        <header className="flex flex-col w-full">
            {/* Logo */}
            <div className="bg-white py-2 flex justify-center items-center px-6">
                <img src={logo} alt="EDU-MATCH" className="h-11" />
            </div>

            {/* Navbar */}
            <nav className="flex items-center justify-between p-6 bg-teal-600 text-white">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                    {/* Enlaces de navegación */}
                    <div className="flex items-center space-x-8">
                        <Link to="/profesor" className="font-bold hover:text-yellow-400 text-xl">
                            Inicio
                        </Link>
                        <Link to="/profesor/cursos" className="font-bold hover:text-yellow-400 text-xl">
                            Mis Cursos
                        </Link>
                        <Link to="/profesor/alumnos" className="font-bold hover:text-yellow-400 text-xl">
                            Mis Alumnos
                        </Link>
                    </div>

                    {/* Icono de mensajes y perfil */}
                    <div className="flex items-center space-x-3 relative">
                        <button onClick={() => setIsChatModalOpen(true)} className="text-2xl">
                            <AiOutlineMessage />
                        </button>
                        <span className="font-bold text-xl cursor-pointer" onClick={toggleMenu}>
                            Maria A
                        </span>
                        <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center text-white text-xl">
                            M
                        </div>

                        {/* Menú desplegable de usuario */}
                        {isMenuOpen && (
                            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-48 p-4 mt-2 z-10">
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
            </nav>

            {/* Modal de cierre de sesión */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">¿Cerrar sesión?</h3>
                        <div className="flex justify-between">
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md">
                                Aceptar
                            </button>
                            <button onClick={() => setIsLogoutModalOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded-md">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de chats */}
            <Modal isOpen={isChatModalOpen} onRequestClose={() => setIsChatModalOpen(false)} className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Chats</h2>
                    <p>Contenido de los chats...</p>
                    <button onClick={() => setIsChatModalOpen(false)} className="bg-red-500 text-white p-2 rounded mt-4">
                        Cerrar
                    </button>
                </div>
            </Modal>
        </header>
    );
};

export default Header;

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
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Modal para confirmar cierre de sesión
    const navigate = useNavigate(); // Usamos useNavigate para navegar

    // Funciones para manejar la navegación
    const goToProfesores = () => navigate("/profesores");
    const goToAlumnos = () => navigate("/alumnos");

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
                            <button
                                onClick={goToProfesores}
                                className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors flex items-center gap-1"
                            >
                                Profesores
                            </button>
                            <button
                                onClick={goToAlumnos}
                                className="text-white font-bold hover:text-yellow-400 active:text-yellow-400 text-xl transition-colors flex items-center gap-1"
                            >
                                Alumnos
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

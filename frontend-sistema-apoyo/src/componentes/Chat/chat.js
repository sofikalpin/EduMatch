import React, { useState } from "react";
import ListaChat from "./listaChats/listaChats.js";
import Mensajes from "./mensajes/mensajes.js";
import logo from "../../logo/LogoInicio.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext.js";

const Chat = () => {
    const { user } = useUser();
    const [chatSeleccionado, setChatSeleccionado] = useState(null);
    const navigate = useNavigate();

    const iniciales = (name) => {
        if (!name) return "";
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();
    };

    const handleLogoClick = () => {
        navigate(-1); // Regresar a la página anterior
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 to-gray-300">
            <header className="flex items-center justify-between p-4 bg-[#00A89F] text-white shadow-lg">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="h-12 cursor-pointer hover:opacity-80 transition" 
                    onClick={handleLogoClick} 
                />
                <h1 className="text-2xl font-semibold tracking-wide">Chats</h1>
                <button 
                    className="bg-white text-[#00A89F] font-bold px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition"
                    onClick={() => navigate("/perfil")}
                >
                    {iniciales(user.nombreCompleto)}
                </button>
            </header>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/3 bg-white shadow-md overflow-y-auto p-4 border-r border-gray-200">
                    <ListaChat onSelectChat={setChatSeleccionado} activeChat={chatSeleccionado} />
                </div>
                <div className="w-2/3 bg-gray-50 flex items-center justify-center p-4">
                    {chatSeleccionado ? (
                        <Mensajes idusuario={chatSeleccionado.idusuario1} chatId={chatSeleccionado.idchat} />
                    ) : (
                        <p className="text-gray-500 text-lg font-medium">Seleccione un chat para visualizar</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;

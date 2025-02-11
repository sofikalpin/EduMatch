import React, { useState } from "react";
import ListaChat from "./listaChats/ListaChat.js";
import VentanaChat from "./ventanaChat/ventanaChat.js";
import logo from "../../../logo/LogoInicio.png";
import { useNavigate } from "react-router-dom";

const ChatAdmin = () => {
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

    return (
        <div className="flex flex-col h-screen bg-gray-100">
           <header className="flex items-center justify-between p-4 bg-[#00A89F] text-white shadow-md">

                <img src={logo} alt="Logo" className="h-10" />
                <h1 className="text-xl font-bold">Chats</h1>
                <button 
                    className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-200"
                    onClick={() => navigate("/administrador/perfilAdministrador")}
                >
                    {iniciales("Administrador 1")}
                </button>
            </header>
            <div className="flex flex-1">
                <div className="w-1/3 bg-white border-r border-gray-300 overflow-y-auto">
                    <ListaChat onSelectChat={setChatSeleccionado} />
                </div>
                <div className="w-2/3 flex items-center justify-center p-4">
                    {chatSeleccionado ? (
                        <VentanaChat idusuario={chatSeleccionado.idusuario1} chatId={chatSeleccionado.idchat} />
                    ) : (
                        <p className="text-gray-500 text-lg">Seleccione un chat para visualizar</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatAdmin;

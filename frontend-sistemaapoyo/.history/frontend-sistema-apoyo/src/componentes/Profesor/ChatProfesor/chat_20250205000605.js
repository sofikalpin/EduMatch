import React, { useState } from "react";
import ListaChat from "./listaChats/listaChats.js";
import Mensajes from "./mensajes/mensajes.js";
import logo from "../../../logo/LogoInicio.png";
import { useNavigate } from "react-router-dom";

const Chat = () => {
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
            <header className="flex items-center justify-between bg-blue-600 text-white p-4 shadow-md">
                <img src={logo} alt="Logo" className="h-10" />
                <h1 className="text-xl font-semibold">Chats</h1>
                <button 
                    className="bg-white text-blue-600 font-bold px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition"
                    onClick={() => navigate("/perfil")}
                >
                    {iniciales("Administrador 1")}
                </button>
            </header>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/3 bg-white shadow-lg overflow-y-auto p-4">
                    <ListaChat onSelectChat={setChatSeleccionado} />
                </div>
                <div className="w-2/3 bg-gray-50 flex items-center justify-center p-4">
                    {chatSeleccionado ? (
                        <Mensajes idusuario={chatSeleccionado.idusuario1} chatId={chatSeleccionado.idchat} />
                    ) : (
                        <p className="text-gray-500">Seleccione un chat para visualizar</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;

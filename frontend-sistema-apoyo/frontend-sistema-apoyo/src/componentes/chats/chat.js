import React, {useState} from "react";
import "./chat.css";
import ListaChat from "./listaChats/listaChats.js";
import Mensajes from "./mensajes/mensajes.js";
import logo from "../../logo/LogoInicio.png";
import {useNavigate} from "react-router-dom";

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

        <div>
            <div className="chat-app">
                <header className="listachats-titulo">
                    <img src={logo} alt="Logo" className="logo-img" />
                    <h1 className="titulo-nombre">Chats</h1>
                    <button className="avatar-perfil" onClick={() => navigate("/perfil")}>{iniciales("Administrador 1")}</button>
                </header>
                <div className="chat-list">
                    <ListaChat onSelectChat={setChatSeleccionado} />
                </div>
                <div className="chat-window">
                    {chatSeleccionado ? (
                        <Mensajes idusuario={chatSeleccionado.idusuario1} chatId={chatSeleccionado.idchat} />
                    ) : (
                        <p>Seleccione un chat para visualizar</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
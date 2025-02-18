import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import CrearChat from "../CrearChat/CrearChat.js";
import nuevoChatIcon from "../ChatIcons/newChatIcon.png";
import { useUser } from "../../../Context/UserContext.js";
import { useNavigate } from "react-router-dom"; 
import { ArrowLeft } from 'lucide-react';

const ListaChats = ({ onSelectChat, activeChat }) => {
    const { user } = useUser();
    const [chats, setChats] = useState([]);
    const [receptor, setReceptor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [rolseleccionado, setRolseleccionado] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const idusuario = user?.idusuario;
    const navigate = useNavigate(); 

    useEffect(() => {
        const cargarChats = async () => {
            setLoading(true);
            try {
                const respuesta = await axios.get(
                    `http://localhost:5228/API/Chat/ChatporUsuarioID?userId=${idusuario}`
                );
                setChats(Array.isArray(respuesta.data.value) ? respuesta.data.value : []);

                const idsUsuarios = new Set();
                respuesta.data.value.forEach(chat => {
                    idsUsuarios.add(chat.idusuario1);
                    idsUsuarios.add(chat.idusuario2);
                });

                const datosUsuarios = await Promise.all(
                    [...idsUsuarios].map(async (id) => {
                        const usuarioResp = await axios.get(
                            `http://localhost:5228/API/Usuario/BuscarUsuario?idUsuario=${id}`
                        );
                        return { id, ...usuarioResp.data.value };
                    })
                );

                const usuarioMap = {};
                datosUsuarios.forEach(receptor => {
                    usuarioMap[receptor.id] = receptor;
                });
                setReceptor(usuarioMap);
            } catch (error) {
                console.error("Error al obtener los datos del chat: ", error);
                setError("No se pudo cargar la lista de chats.");
            } finally {
                setLoading(false);
            }
        };

        cargarChats();
    }, [idusuario]);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const agregarChat = (nuevoChat) => {
        setChats(prev => [...prev, nuevoChat]);
        closeModal();
    };

    const chatsFiltrados = chats.filter(chat => {
        const nombreCoincide = receptor[chat.idusuario2]?.nombrecompleto?.toLowerCase().includes(busqueda.toLowerCase());
        const rolCoincide = rolseleccionado === "" || receptor[chat.idusuario2]?.idrol === parseInt(rolseleccionado, 10);
        return nombreCoincide && rolCoincide;
    });

    const handleRolSeleccionado = (e) => {
        setRolseleccionado(e.target.value);
    };

    if (loading) {
        return <p className="text-center text-gray-500">Cargando chats...</p>;
    }
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
            <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Volver</span>
          </button>

                <h2 className="text-xl font-bold text-gray-800">Mis Chats</h2>
                <button onClick={openModal} className="bg-blue-500 p-2 rounded-full shadow-md hover:bg-blue-600 transition">
                    <img src={nuevoChatIcon} alt="Nuevo Chat" className="w-6 h-6" />
                </button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Crear Nuevo Chat"
                className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto"
                overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
                ariaHideApp={false}
            >
                <CrearChat 
                    idusuario={idusuario} 
                    onChatCreado={agregarChat} 
                    onClose={closeModal}
                    chatsExistentes={chats}
                />
            </Modal>

            <label htmlFor="rol-select" className="block text-sm font-medium text-gray-700">Filtro por rol:</label>
            <select
                id="rol-select"
                value={rolseleccionado}
                onChange={handleRolSeleccionado}
                className="block w-full p-2 border rounded mt-1 mb-4 bg-gray-100"
            >
                <option value="">Todos</option>
                <option value="1">Profesores</option>
                <option value="2">Alumnos</option>
                <option value="3">Administrador</option>
            </select>

            <input 
                type="text"
                placeholder="Buscar nombre del chat..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full p-2 border rounded mb-4 bg-gray-100"
                autoComplete="off"
            />

            {chatsFiltrados.length === 0 ? (
                <p className="text-center text-gray-500">No se encontraron chats activos.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {chatsFiltrados.map(chat => {
                        let nombreChat = receptor[chat.idusuario2]?.nombrecompleto || "Usuario";

                        if (nombreChat === user.nombrecompleto){
                            nombreChat = receptor[chat.idusuario1]?.nombrecompleto || "Usuario";
                        }

                        const iniciales = nombreChat
                            .split(" ")
                            .map(palabra => palabra[0])
                            .join("")
                            .toUpperCase();

                        const isActive = activeChat?.idchat === chat.idchat;

                        return (
                            <li 
                                key={chat.idchat} 
                                onClick={() => onSelectChat(chat)}
                                className={`p-3 flex items-center gap-3 cursor-pointer rounded-lg
                                    ${isActive 
                                        ? 'bg-blue-500 text-white' 
                                        : 'hover:bg-blue-100'
                                    }`}
                            >
                                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold
                                    ${isActive 
                                        ? 'bg-white text-blue-500' 
                                        : 'bg-blue-500 text-white'
                                    }`}>
                                    {iniciales}
                                </div>
                                <span className={isActive ? 'text-white font-medium' : 'text-gray-800 font-medium'}>
                                    {nombreChat}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default ListaChats;

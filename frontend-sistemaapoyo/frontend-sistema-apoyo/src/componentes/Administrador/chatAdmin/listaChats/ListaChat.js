import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import CrearChat from "../crearChat/CrearChat";
import nuevoChatIcon from "../chatIcons/newChatIcon.png";

const ListaChat = ({ onSelectChat }) => {
    const [chats, setChats] = useState([]);
    const [receptor, setReceptor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [rolseleccionado, setRolseleccionado] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const idusuario = 5;

    useEffect(() => {
        const cargarChats = async () => {
            setLoading(true);
            try {
                const respuesta = await axios.get(
                    `http://localhost:5228/API/AdministradorChat/ListaChats?idUsuario=${idusuario}`
                );
                setChats(respuesta.data.value);
                
                const idsUsuarios = respuesta.data.value.map((chat) => chat.idusuario2);
                const datosUsuarios = await Promise.all(
                    idsUsuarios.map(async (id) => {
                        const usuarioResp = await axios.get(
                            `http://localhost:5228/API/Usuario/BuscarUsuario?idUsuario=${id}`
                        );
                        return { id, ...usuarioResp.data.value };
                    })
                );
                
                const usuarioMap = {};
                datosUsuarios.forEach((receptor) => {
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
    }, []);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const agregarChat = (nuevoChat) => {
        setChats((prev) => [...prev, nuevoChat]);
        closeModal();
    };

    const chatsFiltrados = chats.filter((chat) => {
        const nombreCoincide = receptor[chat.idusuario2]?.nombrecompleto?.toLowerCase().includes(busqueda.toLowerCase());
        const rolCoincide = rolseleccionado === "" || receptor[chat.idusuario2]?.idrol === parseInt(rolseleccionado, 10);
        return nombreCoincide && rolCoincide;
    });

    const handleRolSeleccionado = (e) => {
        setRolseleccionado(e.target.value);
    };

    if (loading) return <p className="text-center text-gray-500">Cargando chats...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-lg mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Mis Chats</h2>
                <button onClick={openModal} className="p-2 bg-blue-500 rounded-full hover:bg-blue-600">
                    <img src={nuevoChatIcon} className="w-6 h-6" alt="Nuevo Chat" />
                </button>
            </div>
            
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Crear Nuevo Chat"
                className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                ariaHideApp={false}
            >
                <CrearChat idusuario={idusuario} onChatCreado={agregarChat} onClose={closeModal} />
            </Modal>

            <div className="mb-4 flex gap-2">
                <label htmlFor="rol-select" className="font-medium">Filtro por rol:</label>
                <select
                    id="rol-select"
                    value={rolseleccionado}
                    onChange={handleRolSeleccionado}
                    className="border rounded p-1"
                >
                    <option value="">Todos</option>
                    <option value="1">Profesores</option>
                    <option value="2">Alumnos</option>
                    <option value="3">Administrador</option>
                </select>
            </div>

            <input 
                type="text"
                placeholder="Buscar nombre del chat..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full border rounded p-2 mb-4"
                autoComplete="off"
            />
            
            {chatsFiltrados.length === 0 ? (
                <p className="text-center text-gray-500">No se encontraron chats activos.</p>
            ) : (
                <ul className="border rounded divide-y">
                    {chatsFiltrados.map((chat) => (
                        <li 
                            key={chat.idchat} 
                            onClick={() => onSelectChat(chat)}
                            className="p-3 cursor-pointer hover:bg-gray-100"
                        >
                            {receptor[chat.idusuario2]?.nombrecompleto || "Usuario"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListaChat;
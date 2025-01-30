import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import CrearChat from "../crearChat/crearChat.js";
import "./listaChats.css";
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
        const cargarChats = async() => {
            setLoading(true);
            try {
                const respuesta = await axios.get(
                    `http://localhost:5228/API/AdministradorChat/ListaChats?idUsuario=${idusuario}`
                );
                setChats(respuesta.data.value);

                //Datos de los receptores
                const idsUsuarios = respuesta.data.value.map((chat) => chat.idusuario2);
                const datosUsuarios = await Promise.all(
                    idsUsuarios.map(async (id) =>{
                        const usuarioResp = await axios.get(
                            `http://localhost:5228/API/Usuario/BuscarUsuario?idUsuario=${id}`
                        );
                        return { id, ...usuarioResp.data.value};
                    })
                );

                const usuarioMap = {};
                datosUsuarios.forEach((receptor) => {
                    usuarioMap[receptor.id] = receptor;
                });
                setReceptor(usuarioMap);
            } catch (error) {
                console.error("Error al obtener los datos del chat: ", error)
                setError("No se pudo cargar la lista de chats.")
            } finally {
                setLoading(false);
            }
        };
    
        cargarChats();
    }, []);

    const openModal = () => {
        console.log("Abriendo modal...");
        setModalIsOpen(true)};
    const closeModal = () => setModalIsOpen(false);

    const agregarChat = (nuevoChat) => {
        setChats((prev) => [...prev, nuevoChat]);
        closeModal();
    }

    const chatsFiltrados = chats.filter((chat) => {
        const nombreCoincide = receptor[chat.idusuario2]?.nombrecompleto?.toLowerCase().includes(busqueda.toLowerCase());
        const rolCoincide =  rolseleccionado === "" || receptor[chat.idusuario2]?.idrol === parseInt(rolseleccionado, 10);
        return nombreCoincide && rolCoincide;
    });

    const hadleRolSeleccionado = (e) => {
        setRolseleccionado(e.target.value);
    }


    if (loading) {
        return <p>Cargando chats...</p>; // Mensaje mientras los chats se cargan
    }
    if (error) {
        return <p className="mensaje-error">{error}</p>; // Mensaje de error si algo sale mal
    }


    return (
        <div>
            <div className="titulo-nuevoChat">
                <h2>Mis Chats</h2>
                <button onClick={openModal} className="nuevochat-boton" alt="Nuevo Chat">
                    <img src={nuevoChatIcon} className="nuevochat-imagen"/>
                </button>
            </div>

            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Crear Nuevo Chat"
                    className="modal-contenido"
                    overlayClassName="modal-overlay"
                    ariaHideApp={false}
                >
                    <CrearChat idusuario={idusuario} onChatCreado={agregarChat} onClose={closeModal} />
                </Modal>
            </div>
                
            
            <label htmlFor="rol-select">Filtro por rol :</label>
            <select
                id="rol-select"
                value={rolseleccionado}
                onChange={hadleRolSeleccionado}
                className="select-rol"
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
                className="vinput-busqueda"
                autoComplete="off"
            />
            { chatsFiltrados.length === 0 ? (
                <p> No se encontraron chats activos. </p>
            ) : (
                <ul>
                    {chatsFiltrados.map((chat) => (
                        <li key={chat.idchat} onClick={() => onSelectChat(chat)}>
                            {receptor[chat.idusuario2]?.nombrecompleto || "Usuario"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ListaChat;
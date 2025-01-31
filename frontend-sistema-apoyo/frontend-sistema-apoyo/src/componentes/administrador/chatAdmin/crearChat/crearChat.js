import React, {useState, useEffect} from "react";
import "./crearChat.css";
import axios from "axios";

const CrearChat = ({ idusuario, onChatCreado, onClose}) => {
    const [contactoSeleccionado, setContactoSeleccionado] = useState(null)

    const [contactos, setContactos] = useState([]);
    const [contactoFiltrado, setContactoFiltrado] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const [mensajeExito, setmensajeExito] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleCrearChat = async() => {
        if (!contactoSeleccionado) {
            setError("Por favor, selecciona un usuario para el chat.");
            return;
        }

        const datosChat = {
            idusuario1: idusuario,
            idusuario2: contactoSeleccionado.idusuario,
            fechahoraInicio: new Date().toISOString(),
            mensajes: [
                {
                    fechaEnvio: new Date().toISOString().split('T')[0],
                    contenido: `Chat iniciado.`,
                    idusuario: idusuario,
                }
            ]
        }

        try {
            const respuesta = await axios.post(
                `http://localhost:5228/API/AdministradorChat/CrearChat`,
                datosChat
            );

            setmensajeExito("Chat creado con éxito.");
            console.log("Chat creado con exito.");

            if (respuesta.status === 201 || respuesta.status === 200) {
                onChatCreado(respuesta.data); // Notifica a ListaChat sobre el nuevo chat
            }
        } catch (error) {
            console.error("Error al crear el chat: ", error);
            if (error.response) {
                setError(error.response.data.msg || "No se pudo crear el chat.");
            } else if (error.request) {
                setError("No se pudo conectar con el servidor.");
            } else {
                setError("Error inesperado al crear el chat.");
            }
        }
    }

    const handleContactoSeleccionado = (contacto) => {
        setContactoSeleccionado(contacto); // Guarda el contacto seleccionado
    };

    useEffect(() => {
        const cargarContactos = async () => {
            setLoading(true);
            try {
                const respuesta = await axios.get("http://localhost:5228/API/AdministradorChat/Contactos");
                if (respuesta.data.status) {
                    setContactos(respuesta.data.value);
                    setContactoFiltrado(respuesta.data.value); // Mostrar inicialmente todos los contactos
                } else {
                    setError(respuesta.data.msg);
                }
            } catch (error) {
                console.error("Error al cargar contactos: ", error);
                setError("No se pudieron cargar los contactos.");
            } finally {
                setLoading(false);
            }
        };
        cargarContactos();
    }, []);

    const handleBusqueda = (e) => {
        const texto = e.target.value;
        setBusqueda(texto);

        const filtrados = contactos.filter((contacto) =>
            contacto.nombrecompleto.toLowerCase().includes(texto.toLowerCase())
        );

        setContactoFiltrado(filtrados);
    };

    if (loading) {
        return <p>Cargando contactos...</p>;
    }

    if (error) {
        return <p className="mensaje-error">{error}</p>;
    }

    const nivel = (idNivel) => {
        const niveles = { 1: "A1", 2: "A2", 3: "B1", 4: "B2", 5: "C1", 6: "C2" };
        return niveles[idNivel] || "No posee nivel";
    }


    return (
        <div className="crearChat-contenedor">
            <h1> Crear nuevo chat </h1>
            <h3>Seleccione un contacto: </h3>
            <div className="contenedor-busqueda">
                <input
                    type="text"
                    placeholder="Escribe un nombre..."
                    value={busqueda}
                    onChange={handleBusqueda}
                    className="input-busqueda"
                />
                {contactoFiltrado.length === 0 ? (
                    <p>No se encontraron contactos.</p>
                ) : (
                    <ul className="lista-contactos">
                        {contactoFiltrado.map((contacto) => (
                            <li
                                key={contacto.idusuario}
                                onClick={() => handleContactoSeleccionado(contacto)}
                                className={`contacto-item ${
                                    contactoSeleccionado?.idusuario === contacto.idusuario
                                        ? "seleccionado"
                                        : ""
                                }`}
                            >
                                {contacto.nombrecompleto} (
                                    {contacto.idrol === 1 
                                    ? "Profesor" 
                                    : contacto.idrol === 3 
                                    ? "Administrador" 
                                    : "Alumno" 
                                    }
                                ) - Nivel : {nivel(contacto.idnivel)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {error && <div className="error-mensaje">{error}</div>}
            {mensajeExito && <div className="exito-mensaje">{mensajeExito}</div>} 
            <button 
                onClick={handleCrearChat} 
                className="boton-crear-chat"
                disabled={!contactoSeleccionado}
            >
                {contactoSeleccionado ? "Crear Chat" : "Selecciona un contacto"}
            </button>
            <button onClick={onClose} className="boton-cancelar-chat">
                Cancelar
            </button>
        </div>
    );
}

export default CrearChat;
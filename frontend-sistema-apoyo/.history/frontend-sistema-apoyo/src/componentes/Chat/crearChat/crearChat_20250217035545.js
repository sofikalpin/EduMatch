import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../context/userContext";

const CrearChat = ({ idusuario, onChatCreado, onClose }) => {
    const { user } = useUser();
    const [contactoSeleccionado, setContactoSeleccionado] = useState(null);
    const [contactos, setContactos] = useState([]);
    const [contactoFiltrado, setContactoFiltrado] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarContactos = async () => {
            setLoading(true);
            try {
                const respuesta = await axios.get("http://localhost:5228/API/Chat/ListaContactos");
                if (respuesta.data.status) {
                    setContactos(respuesta.data.value);
                    setContactoFiltrado(respuesta.data.value);
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
        setContactoFiltrado(contactos.filter(contacto => contacto.nombrecompleto.toLowerCase().includes(texto.toLowerCase())));
    };

    const handleCrearChat = async () => {
        if (!contactoSeleccionado) {
            setError("Por favor, selecciona un usuario para el chat.");
            return;
        }

        const datosChat = {
            idusuario1: user.idUsuario,
            idusuario2: contactoSeleccionado.idusuario,
            fechahoraInicio: new Date().toISOString(),
            mensajes: [{
                fechaEnvio: new Date().toISOString().split('T')[0],
                contenido: `Chat iniciado.`,
                idusuario: user.idUsuario,
            }]
        };

        try {
            const respuesta = await axios.post("http://localhost:5228/API/Chat/CrearChat", datosChat);
            setMensajeExito("Chat creado con éxito.");
            if (respuesta.status === 201 || respuesta.status === 200) {
                onChatCreado(respuesta.data);
            }
        } catch (error) {
            console.error("Error al crear el chat: ", error);
            setError(error.response?.data?.msg || "No se pudo crear el chat.");
        }
    };

    const nivel = (idNivel) => {
        const niveles = { 1: "A1", 2: "A2", 3: "B1", 4: "B2", 5: "C1", 6: "C2" };
        return niveles[idNivel] || "No posee nivel";
    };

    if (loading) return <p className="text-center text-gray-500">Cargando contactos...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Crear nuevo chat</h1>
            <h4 className="text-lg mb-2">Seleccione un contacto:</h4>
            <input
                type="text"
                placeholder="Escribe un nombre..."
                value={busqueda}
                onChange={handleBusqueda}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <ul className="space-y-2 mb-4">
                {contactoFiltrado.length === 0 ? (
                    <p className="text-gray-500">No se encontraron contactos.</p>
                ) : (
                    contactoFiltrado.map(contacto => (
                        <li
                            key={contacto.idusuario}
                            onClick={() => setContactoSeleccionado(contacto)}
                            className={`p-2 cursor-pointer border rounded-lg ${contactoSeleccionado?.idusuario === contacto.idusuario ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"}`}
                        >
                            {contacto.nombrecompleto} ({contacto.idrol === 1 ? "Profesor" : contacto.idrol === 3 ? "Administrador" : "Alumno"}) - Nivel: {nivel(contacto.idnivel)}
                        </li>
                    ))
                )}
            </ul>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            {mensajeExito && <div className="text-green-500 text-sm mb-2">{mensajeExito}</div>}
            <button
                onClick={handleCrearChat}
                className={`w-full py-2 rounded-lg text-white ${contactoSeleccionado ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"}`}
                disabled={!contactoSeleccionado}
            >
                {contactoSeleccionado ? "Crear Chat" : "Selecciona un contacto"}
            </button>
            <button onClick={onClose} className="w-full py-2 mt-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
                Cancelar
            </button>
        </div>
    );
};

export default CrearChat;

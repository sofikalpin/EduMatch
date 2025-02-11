import React, { useState, useEffect } from "react";
import axios from "axios";

const CrearChat = ({ idusuario, onChatCreado, onClose }) => {
    const [contactoSeleccionado, setContactoSeleccionado] = useState(null);
    const [contactos, setContactos] = useState([]);
    const [contactoFiltrado, setContactoFiltrado] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleCrearChat = async () => {
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
        };

        try {
            const respuesta = await axios.post(
                "http://localhost:5228/API/AdministradorChat/CrearChat",
                datosChat
            );

            setMensajeExito("Chat creado con éxito.");
            if (respuesta.status === 201 || respuesta.status === 200) {
                onChatCreado(respuesta.data);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.msg || "No se pudo crear el chat.");
            } else if (error.request) {
                setError("No se pudo conectar con el servidor.");
            } else {
                setError("Error inesperado al crear el chat.");
            }
        }
    };

    useEffect(() => {
        const cargarContactos = async () => {
            setLoading(true);
            try {
                const respuesta = await axios.get("http://localhost:5228/API/AdministradorChat/Contactos");
                if (respuesta.data.status) {
                    setContactos(respuesta.data.value);
                    setContactoFiltrado(respuesta.data.value);
                } else {
                    setError(respuesta.data.msg);
                }
            } catch {
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
        setContactoFiltrado(contactos.filter((contacto) =>
            contacto.nombrecompleto.toLowerCase().includes(texto.toLowerCase())
        ));
    };

    const nivel = (idNivel) => {
        const niveles = { 1: "A1", 2: "A2", 3: "B1", 4: "B2", 5: "C1", 6: "C2" };
        return niveles[idNivel] || "No posee nivel";
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
            <h1 className="text-xl font-bold mb-4">Crear nuevo chat</h1>
            <h3 className="text-lg mb-2">Seleccione un contacto:</h3>
            <input
                type="text"
                placeholder="Escribe un nombre..."
                value={busqueda}
                onChange={handleBusqueda}
                className="w-full p-2 border border-gray-300 rounded mb-3"
            />
            {loading ? (
                <p>Cargando contactos...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ul className="max-h-60 overflow-y-auto border border-gray-300 rounded">
                    {contactoFiltrado.length === 0 ? (
                        <p className="p-2 text-gray-500">No se encontraron contactos.</p>
                    ) : (
                        contactoFiltrado.map((contacto) => (
                            <li
                                key={contacto.idusuario}
                                onClick={() => setContactoSeleccionado(contacto)}
                                className={`p-2 cursor-pointer ${contactoSeleccionado?.idusuario === contacto.idusuario ? "bg-blue-200" : "hover:bg-gray-100"}`}
                            >
                                {contacto.nombrecompleto} ({
                                    contacto.idrol === 1 ? "Profesor" : contacto.idrol === 3 ? "Administrador" : "Alumno"
                                }) - Nivel: {nivel(contacto.idnivel)}
                            </li>
                        ))
                    )}
                </ul>
            )}
            {mensajeExito && <p className="text-green-500 mt-2">{mensajeExito}</p>}
            <div className="flex justify-end gap-2 mt-4">
                <button
                    onClick={handleCrearChat}
                    className={`px-4 py-2 rounded text-white ${contactoSeleccionado ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
                    disabled={!contactoSeleccionado}
                >
                    Crear Chat
                </button>
                <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancelar</button>
            </div>
        </div>
    );
};

export default CrearChat;

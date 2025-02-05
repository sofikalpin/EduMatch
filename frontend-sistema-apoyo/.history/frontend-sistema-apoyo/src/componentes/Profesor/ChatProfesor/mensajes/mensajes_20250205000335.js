import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import hubConnection from "../../../signalRConnection.js";

const Mensajes = ({ usuarioId, chatId }) => {
    const [mensajes, setMensajes] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const inputRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const usuarioid = usuarioId || 5;

    useEffect(() => {
        const cargarMensaje = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5228/API/Mensaje/MensajeporChatID", {
                    params: { chatId, pageNumber: 1, pageSize: 20 },
                });
                const ordenMensajes = response.data.value.sort((a, b) => a.idmensaje - b.idmensaje);
                setMensajes(ordenMensajes);
            } catch (error) {
                console.error("Error al cargar los mensajes: ", error);
                setError("No se pudieron cargar los mensajes.");
            } finally {
                setLoading(false);
            }
        };

        cargarMensaje();

        if (hubConnection.state === "Disconnected") {
            hubConnection
                .start()
                .then(() => {
                    console.log("Conexión establecida con SignalR.");
                    hubConnection.on("RecibirMensaje", (mensaje) => {
                        setMensajes((prevMensajes) => {
                            const nuevosMensajes = [...prevMensajes, mensaje];
                            return nuevosMensajes.sort((a, b) => a.idmensaje - b.idmensaje);
                        });
                    });
                })
                .catch((error) => console.error("Error al conectar a SignalR:", error));
        }

        return () => {
            if (hubConnection.state === "Connected") {
                hubConnection.stop()
                    .then(() => console.log("Conexión detenida con SignalR."))
                    .catch((error) => console.error("Error al detener la conexión:", error));
            }
        };
    }, [chatId]);

    const handleEnviarMensaje = async () => {
        if (!nuevoMensaje.trim()) return;
        setEnviando(true);

        const fechaActual = new Date();
        
        const datosMensaje = {
            idmensaje: 0,
            contenido: nuevoMensaje,
            fechaEnvio: fechaActual.toISOString().split("T")[0],
            idchat: chatId,
            idusuario: usuarioid,
        };

        try {
            const response = await axios.post("http://localhost:5228/API/Mensaje/EnviarMensaje", datosMensaje);
            setMensajes((prevMensajes) => {
                const nuevoMensaje = response.data.value;
                const nuevosMensajes = [...prevMensajes, nuevoMensaje];
                return nuevosMensajes.sort((a, b) => a.idmensaje - b.idmensaje);
            });
            setNuevoMensaje("");
            if (inputRef.current) inputRef.current.focus();
        } catch (error) {
            console.error("Error al enviar el mensaje:", error.response?.data || error.message);
            setError(error.response?.data?.message || "No se pudo enviar el mensaje.");
        } finally {
            setEnviando(false);
        }
    };

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [mensajes]);
    
    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timeout);
        }
    }, [error]);
    
    return (
        <div className="flex flex-col h-full w-full p-4 bg-gray-100 rounded-lg shadow-md">
            {loading && <p className="text-center text-gray-500">Cargando mensajes...</p>}
            
            <div className="flex-1 overflow-y-auto p-2 space-y-2" ref={messagesContainerRef}>
                {mensajes.map((mensaje) => (
                    <div 
                        key={mensaje.idmensaje} 
                        className={`p-2 rounded-lg max-w-xs ${mensaje.idusuario === usuarioid ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"}`}
                    >
                        <span>{mensaje.contenido}</span>
                    </div>
                ))}
            </div>
            
            <div className="flex items-center gap-2 mt-4">
                <input
                    ref={inputRef}
                    type="text"
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    maxLength={500}
                    className={`flex-1 p-2 border rounded-lg ${error ? "border-red-500" : "border-gray-300"}`}
                />
                <button 
                    onClick={handleEnviarMensaje} 
                    disabled={enviando} 
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {enviando ? "Enviando..." : "Enviar"}
                </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}

export default Mensajes;

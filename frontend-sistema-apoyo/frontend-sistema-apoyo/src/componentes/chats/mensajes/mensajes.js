import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./mensajes.css"
import hubConnection from "../../../signalRConnection.js";

const Mensajes = ({ usuarioId, chatId}) => {
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
            try{
                const response = await axios.get("http://localhost:5228/API/Mensaje/MensajeporChatID", {
                    params: {chatId, pageNumber: 1, pageSize: 20},
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

        // Limpiar la conexión al desmontar
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
            fechaEnvio: fechaActual.toISOString().split("T")[0], // Formato YYYY-MM-DD
            idchat: chatId,
            idusuario: usuarioid,
        }

        //console.log("Datos del mensaje a enviar:", datosMensaje);

        try{
            console.log(nuevoMensaje);
            const response = await axios.post("http://localhost:5228/API/Mensaje/EnviarMensaje", 
                datosMensaje
            );
            console.log("Resultado final: ", response.data.value)
            
            setMensajes((prevMensajes) =>{
                const nuevoMensaje = response.data.value;
                const nuevosMensajes = [...prevMensajes, nuevoMensaje];
                return nuevosMensajes.sort((a, b) => a.idmensaje - b.idmensaje);
            });
            
            setNuevoMensaje("");

            if (inputRef.current) {
                inputRef.current.focus();
            }
            
        }catch (error) {
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
            const timeout = setTimeout(() => setError(null), 5000); // Limpia el error después de 5 segundos
            return () => clearTimeout(timeout);
        }
    }, [error]);
    
    

    return (
        <div className="vchat-container">

            {loading && <p>Cargando mensajes...</p>}
            
            <div className="vchat-messages" ref={messagesContainerRef}>
                {mensajes.map((mensaje) => (
                    <div 
                        key={`${mensaje.idmensaje}`} 
                        className={`message ${
                            mensaje.idusuario === usuarioid ? "message-right" : "message-left"
                        }`}
                    >
                        <span>{mensaje.contenido}</span>
                    </div>
                ))}
            </div>
            <div className="vchat-input">
                <input
                    ref={inputRef}
                    type="text"
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    maxLength={500} // Límite de caracteres
                    className={error ? "input-error" : ""} // Clase condicional para errores
                />
                <button onClick={handleEnviarMensaje} disabled={enviando}>
                    {enviando ? "Enviando..." : "Enviar"}
                </button>
            </div>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Mensajes;
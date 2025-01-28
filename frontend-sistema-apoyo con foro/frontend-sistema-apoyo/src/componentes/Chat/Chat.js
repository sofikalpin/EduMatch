import React, { useState, useEffect, useRef } from "react"
import { HubConnectionBuilder } from "@microsoft/signalr"
import { Send, Search } from "lucide-react"
import "./Chat.css"
import { Link } from 'react-router-dom';
import logo from '../../logo/LogoInicio.png';

const Chat = () => {
  const [connection, setConnection] = useState(null)
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [userId, setUserId] = useState(1) // Este ID debería venir de tu sistema de autenticación
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const connectToHub = async () => {
      try {
        const newConnection = new HubConnectionBuilder()
          .withUrl("https://tu-api/chatHub")
          .withAutomaticReconnect()
          .build()

        // Configurar los manejadores de mensajes
        newConnection.on("RecibirMensaje", (mensaje) => {
          if (selectedChat && mensaje.idchat === selectedChat.idchat) {
            setMessages((prev) => [...prev, mensaje])
            scrollToBottom()
          }
        })

        newConnection.on("NuevoChat", (chat) => {
          setChats((prev) => [...prev, chat])
        })

        await newConnection.start()
        console.log("Conectado a SignalR Hub")

        // Unirse al grupo del usuario
        await newConnection.invoke("UnirseAlGrupo", userId.toString())

        setConnection(newConnection)
      } catch (err) {
        console.error("Error al conectar:", err)
      }
    }

    connectToHub()
    fetchChats()

    return () => {
      if (connection) {
        connection.stop()
      }
    }
  }, [connection]) // Added connection to the dependency array

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.idchat)
    }
  }, [selectedChat])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchChats = async () => {
    try {
      const response = await fetch(`/api/Chat/ChatporUsuarioID?userId=${userId}`)
      const data = await response.json()
      if (data.status) {
        setChats(data.value)
      }
    } catch (error) {
      console.error("Error al obtener chats:", error)
    }
  }

  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`/api/Chat/ChatporID?chatId=${chatId}`)
      const data = await response.json()
      if (data.status && data.value.mensajes) {
        setMessages(data.value.mensajes)
      }
    } catch (error) {
      console.error("Error al obtener mensajes:", error)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (message.trim() && selectedChat && connection) {
      try {
        const newMessage = {
          contenido: message,
          fechaEnvio: new Date().toISOString(),
          idchat: selectedChat.idchat,
          idusuario: userId,
        }

        // Enviar mensaje a través de SignalR
        await connection.invoke("EnviarMensaje", selectedChat.idchat.toString(), newMessage)

        setMessage("")
      } catch (error) {
        console.error("Error al enviar mensaje:", error)
      }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
      <img src={logo} alt="Logo" className="logo-img" />
        <nav className="navigation">
          <ul>
            <li><Link to="#">Profesores</Link></li>
            <li><Link to="#">Programa</Link></li>
            <li><Link to="#">Herramientas</Link></li>
          </ul>
        </nav>
      </div>

      <div className="chat-content">
        <div className="chat-sidebar">
          <div className="search-bar">
            <Search className="search-icon" />
            <input type="text" placeholder="Buscar chat..." />
          </div>

          <div className="chat-list">
            {chats.map((chat) => (
              <div
                key={chat.idchat}
                className={`chat-item ${selectedChat?.idchat === chat.idchat ? "active" : ""}`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="chat-avatar">{chat.idusuario1 === userId ? "U2" : "U1"}</div>
                <div className="chat-info">
                  <h3>Usuario {chat.idusuario1 === userId ? chat.idusuario2 : chat.idusuario1}</h3>
                  <p>{formatDate(chat.fechahoraInicio)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-main">
          {selectedChat ? (
            <>
              <div className="chat-main-header">
                <div className="selected-user">
                  <div className="user-avatar">{selectedChat.idusuario1 === userId ? "U2" : "U1"}</div>
                  <div className="user-info">
                    <h2>
                      Usuario {selectedChat.idusuario1 === userId ? selectedChat.idusuario2 : selectedChat.idusuario1}
                    </h2>
                    <span className="status">En línea</span>
                  </div>
                </div>
              </div>

              <div className="messages-container">
                {messages.map((msg, index) => (
                  <div
                    key={msg.idmensaje || index}
                    className={`message ${msg.idusuario === userId ? "sent" : "received"}`}
                  >
                    <p>{msg.contenido}</p>
                    <span className="message-time">{formatDate(msg.fechaEnvio)}</span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form className="message-input" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                />
                <button type="submit">
                  <Send className="send-icon" />
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Selecciona un chat para comenzar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat


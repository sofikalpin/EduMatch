import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../context/userContext";

const CrearChat = ({ idusuario, onChatCreado, onClose, chatsExistentes = [] }) => {
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
    setContactoFiltrado(contactos.filter(contacto =>
      contacto.nombrecompleto.toLowerCase().includes(texto.toLowerCase())
    ));
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
       
        window.location.reload();
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

  const getRoleName = (idrol) => {
    const roles = {
      1: "Profesor",
      2: "Alumno",
      3: "Administrador"
    };
    return roles[idrol] || "Usuario";
  };

  const contactosDisponibles = contactoFiltrado.filter(contacto => 
    !chatsExistentes.some(chat => 
      (chat.idusuario1 === contacto.idusuario && chat.idusuario2 === user.idUsuario) ||
      (chat.idusuario2 === contacto.idusuario && chat.idusuario1 === user.idUsuario)
    ) && contacto.idusuario !== user.idUsuario
  );

  if (loading) {
    return (
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">Cargando contactos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg w-full mx-auto bg-white rounded-xl shadow-lg">
      <div className="p-10">
        <h1 className="text-3xl font-extrabold mb-6">Crear nuevo chat</h1>
        
        <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar contacto..."
              value={busqueda}
              onChange={handleBusqueda}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="border rounded-lg bg-gray-50 overflow-hidden">
            <div className="h-64 overflow-y-auto">
              {contactosDisponibles.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No se encontraron contactos disponibles.
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {contactosDisponibles.map(contacto => (
                    <li
                      key={contacto.idusuario}
                      onClick={() => setContactoSeleccionado(contacto)}
                      className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gray-100
                        ${contactoSeleccionado?.idusuario === contacto.idusuario
                          ? "bg-blue-50 border-l-4 border-l-blue-500"
                          : "border-l-4 border-l-transparent"}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {contacto.nombrecompleto}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {getRoleName(contacto.idrol)} • Nivel {nivel(contacto.idnivel)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}
          {mensajeExito && (
            <div className="p-3 bg-green-50 text-green-500 rounded-lg text-sm">
              {mensajeExito}
            </div>
          )}

          <div className="space-y-2 pt-2">
            <button
              onClick={handleCrearChat}
              className={`w-full py-2.5 rounded-lg text-white font-medium transition-colors duration-200
                ${contactoSeleccionado
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"}`}
              disabled={!contactoSeleccionado}
            >
              {contactoSeleccionado ? "Crear Chat" : "Selecciona un contacto"}
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
  );
};

export default CrearChat;

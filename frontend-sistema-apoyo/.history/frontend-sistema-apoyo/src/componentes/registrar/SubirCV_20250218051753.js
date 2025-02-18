import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SubirCV = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [idUsuario, setIdUsuario] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [cvDisponible, setCvDisponible] = useState(false);


  const buscarUsuario = async (correo) => {
    try {
      const response = await axios.get("http://localhost:5228/API/Usuario/ListaUsuarios");
  
      console.log("Respuesta de la API:", response.data); 
  
      
      const listaUsuarios = response.data.value;
  
      if (!Array.isArray(listaUsuarios)) {
        console.error("Error: La respuesta no contiene una lista de usuarios válida.", response.data);
        setMensaje("Error en la respuesta del servidor.");
        return;
      }
  
      const usuarioEncontrado = listaUsuarios.find((usuario) => usuario.correo === correo);
  
      if (usuarioEncontrado && !usuarioEncontrado.cvRuta){
        setIdUsuario(usuarioEncontrado.idusuario);
        setMensaje("");
      } else {
        setMensaje("No se encontró un usuario con este correo o el correo ingresado ya posee un CV cargado.");
        setIdUsuario(null);
      }
    } catch (error) {
      console.error("Error en la carga de lista:", error);
      setMensaje("Error al buscar el usuario.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type !== "application/pdf") {
      setMensaje("Solo se permiten archivos PDF.");
      return;
    }

    setArchivo(file);
    setMensaje("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivo || !idUsuario) {
      setMensaje("Debes seleccionar un archivo y confirmar tu correo.");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", archivo);

    try {
      const response = await axios.post(
        `http://localhost:5228/API/Usuario/SubirCV?idUsuario=${idUsuario}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.status) {
        setMensaje("CV subido exitosamente.");
        setCvDisponible(true);
        console.log("CV cargado correctamente");
        setTimeout(() => {
          alert("Datos de Profesor cargados correctamente. Dirigiendo a Iniciar Sesion.");
          navigate("/iniciarsesion"); 
        }, 1500);
      } else {
        setMensaje(response.data.msg);
      }
    } catch (error) {
      console.error("Error al subir el CV:", error);
      setMensaje("Hubo un problema al subir el CV.");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <label className="block text-left text-[20px]" htmlFor="email">
        Confirmar correo electrónico
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ejemplo: usuario@dominio.com"
          className="h-[48px] p-4 border border-[#e0e0e0] rounded-md text-[16px] w-full mt-[5%] box-border"
        />
      </label>
      <button
        onClick={() => buscarUsuario(email)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
      >
        Buscar Usuario
      </button>

      {idUsuario && (
        <>
          <h2 className="text-xl font-bold mt-4">Subir CV</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="file" accept=".pdf" onChange={handleFileChange} className="block w-full" />

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Subir CV
              </button>
            </form>
        </>
      )}

      {mensaje && <p className="text-red-500 mt-2">{mensaje}</p>}
    </div>
  );
};

export default SubirCV;
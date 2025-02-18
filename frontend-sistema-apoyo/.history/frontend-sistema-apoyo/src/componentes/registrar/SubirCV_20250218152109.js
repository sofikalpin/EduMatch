import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../logo/LogoInicio.png";
import axios from "axios";

const SubirCV = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [idUsuario, setIdUsuario] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [cvDisponible, setCvDisponible] = useState(false);

  useEffect(() => {
   
    const savedEmail = localStorage.getItem('professorEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      buscarUsuario(savedEmail);
    }
  }, []);

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
    <div className="w-full max-w-[400px] mx-auto text-center pt-[100px] h-screen box-border">
      <header className="w-full flex items-center justify-between p-4 bg-[#00A89F] text-white box-shadow-md fixed top-0 left-0 z-10">
        <img
          src={logo}
          alt="Logo"
          className="h-12 cursor-pointer"
        />
      </header>

      <div className="mt-10 text-center">
        <div className="w-full h-[12px] bg-[#e0e0e0] rounded-full overflow-hidden mt-5">
          <div
            className="h-full bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] transition-width duration-300 ease-in-out rounded-full"
          ></div>
        </div>
      </div>

      <main className="p-4">
        <div>
          <h1 className="text-[36px] text-[#1a2b4b] mb-10 font-semibold">
            Tu correo
          </h1>
          <label className="block text-left text-[20px]" htmlFor="email">
          *Ingrese correo electrónico que utilizo para registrarse
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
            Confirmar Usuario
          </button>

          {idUsuario && (
            <>
              <h2 className="text-xl font-bold mt-4">Subir CV</h2>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <span className="text-gray-600">Haz clic para seleccionar tu CV (PDF)</span>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                </label>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
                >
                  Subir CV
                </button>
              </form>
            </>
          )}

          {mensaje && <p className="text-green-500 mt-2">{mensaje}</p>}
        </div>
      </main>
    </div>
  );
};

export default SubirCV;
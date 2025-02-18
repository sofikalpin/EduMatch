import React, { useState } from "react"; 
import logo from "../../../../logo/LogoInicio.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SubirCV = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [idUsuario, setIdUsuario] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [archivoURL, setArchivoURL] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const buscarUsuario = async (correo) => {
    try {
      const response = await axios.get("http://localhost:5228/API/Usuario/ListaUsuarios");
      const listaUsuarios = response.data.value;

      if (!Array.isArray(listaUsuarios)) {
        setMensaje("Error en la respuesta del servidor.");
        return;
      }

      const usuarioEncontrado = listaUsuarios.find((usuario) => usuario.correo === correo);

      if (usuarioEncontrado && !usuarioEncontrado.cvRuta) {
        setIdUsuario(usuarioEncontrado.idusuario);
        setMensaje("");
      } else {
        setMensaje("No se encontró un usuario con este correo o ya tiene un CV cargado.");
        setIdUsuario(null);
      }
    } catch (error) {
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
    setArchivoURL(URL.createObjectURL(file)); 
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
        setTimeout(() => {
          alert("CV cargado correctamente. Redirigiendo a lista profesores. Recuerde autorizar profesor.");
          navigate("/administrador/listaProfesores");
        }, 1500);
      } else {
        setMensaje(response.data.msg);
      }
    } catch (error) {
      setMensaje("Hubo un problema al subir el CV.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl overflow-hidden p-6">
    
        <div className="bg-[#00A89F] p-6 text-center flex flex-col items-center">
          <img src={logo} alt="Logo" className="w-28 h-auto object-contain mb-3" />
          <h3 className="text-2xl font-bold text-white">Registro de Profesor</h3>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Confirmar correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ejemplo: usuario@dominio.com"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A89F]"
          />
          <button
            onClick={() => buscarUsuario(email)}
            className="w-full bg-blue-600 text-white py-2 mt-3 rounded-lg hover:bg-blue-700 transition"
          >
            Buscar Usuario
          </button>
        </div>

        {idUsuario && (
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-700">Subir CV</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                <span className="text-gray-600">Haz clic para seleccionar tu CV (PDF)</span>
                <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
              </label>

              {archivo && (
                <p className="text-sm text-gray-700 mt-2">
                  Archivo seleccionado: <strong>{archivo.name}</strong>
                </p>
              )}

              {archivoURL && (
                <iframe
                  src={archivoURL}
                  className="w-full h-64 border border-gray-300 mt-4 rounded-lg"
                  title="Vista previa del CV"
                ></iframe>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold shadow-md"
              >
                Subir CV
              </button>
              <p className="text-sm text-gray-500">Máximo 5MB. Solo archivos PDF.</p>
            </form>
          </div>
        )}

        {mensaje && (
          <p className="text-center mt-4 text-sm font-medium text-red-600">{mensaje}</p>
        )}
      </div>
    </div>
  );
};

export default SubirCV;

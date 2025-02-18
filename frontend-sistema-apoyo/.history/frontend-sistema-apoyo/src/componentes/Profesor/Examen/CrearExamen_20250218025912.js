import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, X } from 'lucide-react';
import Header from "../HeaderProfesor";
import drive from "../Imagenes/google-drive.png";
import youtube from "../Imagenes/youtube.png";
import googleform from "../Imagenes/google-forms.png";
import axios from "axios";
import { useUser } from "../../../context/userContext";

const CrearExamen = () => {
  const location = useLocation();
  const { nivel } = location.state || {};

  // Estados para manejar los datos del examen
  const { user } = useUser();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [examenUrl, setExamenUrl] = useState([]); 
  const [nuevaUrl, setNuevaUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  
  
  // Validar si una URL tiene un formato correcto
  const validarURL = (url) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  };

  // Agregar una nueva URL a la lista
  const handleAgregarUrl = () => {
    if (nuevaUrl.trim() !== "") {
      if (validarURL(nuevaUrl)) {
        setExamenUrl([...examenUrl, nuevaUrl]);
        setNuevaUrl("");  
      } else {
        alert("URL no válida. Por favor ingrese una URL válida.");
      }
    } else {
      alert("Ingrese un URL antes de agregar");
    }
  };

  // Eliminar la URL
  const handleEliminarUrl = (indexToDelete) => {
    setExamenUrl(examenUrl.filter((_, index) => index !== indexToDelete));
  }

  // Confirmar las URLs cargadas
  const handleConfirmarUrl = () => {
    if (examenUrl.length > 0) {
      alert("URLs cargadas correctamente: " + examenUrl.join(";"));
    } else {
      alert("No se han cargado URLs.");
    }
  };  

  // Crear un nuevo examen
  const handleCrearExamen = async (e) => {
    e.preventDefault();

    setLoading(true);
    
    try {
      const nuevoExamen = {
        idexamen: 0,
        idusuario: user?.idUsuario,
        titulo: nombre.trim(),
        calificacion: descripcion.trim(),
        idnivel: nivel,
        fechaCreacion: new Date().toISOString().split("T")[0],
        url: examenUrl.length > 0 ? examenUrl[0] : "",
      };
      console.log(nuevoExamen);
      const response = await axios.post(
        "http://localhost:5228/api/ProfeExamen/CrearExamen",
        nuevoExamen
      );

      if (response.data.status) {
        alert("Examen creado exitosamente");
        navigate(-1);

        setNombre("");
        setExamenUrl([]);

        console.log("Examen creado exitosamente");
        console.log({nuevoExamen});
      }
    } catch (error) {
      console.error("Error al crear el examen:", error);
    } finally {
      setLoading(false);
    }
  };

  // Agregar un enlace ingresado por el usuario
  const handleAgregarEnlace = () => {
    const enlace = prompt("Ingrese el enlace:");
    
    if (enlace && validarURL(enlace)) {
      setExamenUrl((prev) => [...prev, enlace]);
    } else {
      alert("Por favor, ingrese un enlace valido.");
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />

      {/* Boton para volver */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
      >
        <ArrowLeft className="w-6 h-6" />
        <span>Volver</span>
      </button>

      {/* Formulario para crear examen */}
      <div className="curso-detalles-container px-5 py-10 bg-[#f0faf7] -mt-10">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-5xl font-bold text-center text-[#2c7a7b] mb-8">
            Nuevo Examen
          </h1>
          
          <form onSubmit={handleCrearExamen} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">

                {/* Nombre del examen */}
                <div className="group">
                  <label className="block text-lg font-semibold text-[#2c7a7b] mb-3">
                    Nombre del Examen
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 bg-white"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    placeholder="Ingrese el nombre del examen..."
                  />
                </div>
              </div>

              {/* Calificación máxima del examen */}
              <div className="group">
                <label className="block text-lg font-semibold text-[#2c7a7b] mb-3">
                  Calificación máxima del examen 
                </label>
                <input
                  className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 bg-white"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Ingrese el valor numerico de la calificación máxima del examen..."
                />
              </div>

              {/* Adjuntar enlaces */}
              <div>
                <label className="block text-lg font-semibold text-[#2c7a7b] mb-4">
                  Adjuntar
                </label>

                {/* Input y botón para agregar URL */}
                <div className="flex items-center gap-5 w-full">
                  <input
                    type="text"
                    placeholder="Ingrese URL..."
                    value={nuevaUrl}
                    onChange={(e) => setNuevaUrl(e.target.value)}
                    className="flex-grow p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 bg-white"
                  />
                  <button 
                    type="button" 
                    className="bg-teal-500 text-white text-ls px-6 py-4 rounded-xl shadow-lg w-auto"
                    onClick={handleAgregarUrl}
                  >
                    Agregar URL
                  </button>
                </div>

                {/* Botones para agregar enlaces desde Drive y Youtube  */}
                <div className="flex gap-5 mt-4 items-center">
                  <button
                    type="button"
                    className="p-6 bg-white rounded-xl hover:bg-gray-50 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    onClick={handleAgregarEnlace}
                  >
                    <img src={drive} alt="Google Drive" className="h-8 w-8" />
                  </button>
                  <button
                    type="button"
                    className="p-6 bg-white rounded-xl hover:bg-gray-50 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    onClick={handleAgregarEnlace}
                  >
                    <img src={youtube} alt="YouTube" className="h-8 w-8" />
                  </button>
                  <button
                    type="button"
                    className="p-6 bg-white rounded-xl hover:bg-gray-50 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    onClick={handleAgregarEnlace}
                  >
                    <img src={googleform} alt="Google Forms" className="h-8 w-8" />
                  </button>

                  {/* Botón para confirmar URLs */}
                  <button 
                    type="button" 
                    onClick={handleConfirmarUrl} 
                    className="bg-teal-500 text-white text-ls px-6 py-4 rounded-xl shadow-lg flex items-center gap-2"
                  >
                    Confirmar URLs
                  </button>
                </div>

                {/* Mostrar URLs cargadas */}
                {examenUrl.length > 0 && (
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-teal-500">URLs cargadas:</p>
                    <ul className="mt-4 space-y-2">
                      {examenUrl.map((url, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-sm hover:text-blue-800"
                          >
                            {url}
                          </a>
                          <button
                            onClick={() => handleEliminarUrl(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Eliminar URL"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Botón para enviar el formulario */}
            <div className="flex justify-end pt-8">
              <button 
                type="submit"
                className={`bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all transform hover:-translate-y-1 hover:shadow-xl ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:from-green-600 hover:to-green-700"
                }`}
                disabled={loading}
              >
                {loading ? "Creando..." : "Crear Examen"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearExamen;
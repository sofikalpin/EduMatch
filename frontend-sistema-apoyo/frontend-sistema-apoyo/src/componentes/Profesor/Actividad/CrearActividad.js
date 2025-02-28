import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, X } from 'lucide-react';
import Header from "../HeaderProfesor";
import drive from "../Imagenes/google-drive.png";
import youtube from "../Imagenes/youtube.png";
import axios from "axios";
import { useUser } from "../../../Context/UserContext";

const CrearActividad = () => {
  const location = useLocation();
  const { nivel } = location.state;
  const { user } = useUser();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [actividadUrl, setActividadUrl] = useState([]); 
  const [nuevaUrl, setNuevaUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  
  
  const validarURL = (url) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  };

  const handleAgregarUrl = () => {
    if (nuevaUrl.trim() !== "") {
      if (validarURL(nuevaUrl)) {
        setActividadUrl([...actividadUrl, nuevaUrl]);
        setNuevaUrl("");  
      } else {
        alert("URL no válida. Por favor ingrese una URL válida.");
      }
    } else {
      alert("Ingrese un URL antes de agregar");
    }
  };

  const handleEliminarUrl = (indexToDelete) => {
    setActividadUrl(actividadUrl.filter((_, index) => index !== indexToDelete));
  }

  const handleConfirmarUrl = () => {
    if (actividadUrl.length > 0) {
      alert("URLs cargadas correctamente: " + actividadUrl.join(";"));
    } else {
      alert("No se han cargado URLs.");
    }
  }

  const handleCrearActividad = async (e) => {
    e.preventDefault();

    setLoading(true);
    
    try {
      const nuevaActividad = {
        idactividad: 0,
        idusuario: user?.idusuario,
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        idnivel: nivel,
        fechaCreacion: new Date().toISOString().split("T")[0],
        url: actividadUrl.length > 0 ? actividadUrl[0] : "",
      };
      console.log(nuevaActividad);
      const response = await axios.post(
        "http://localhost:5228/API/ProfesorActividad/CrearActividad",
        nuevaActividad
      );
      if (response.data.status) {
        alert("Actividad creada exitosamente");
        navigate(-1);

        setNombre("");
        setDescripcion("");
        setActividadUrl([]);

        console.log("Actividad creada exitosamente");
        console.log({nuevaActividad});
      }
    } catch (error) {
      console.error("Error al crear la actividad:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarEnlace = () => {
    const enlace = prompt("Ingrese el enlace:");
    
    if (enlace && validarURL(enlace)) {
      setActividadUrl((prev) => [...prev, enlace]);
    }else{
      alert("Por favor, ingrese un enlace valido.");
    }
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
      >
      <ArrowLeft className="w-6 h-6" />
      <span>Volver</span>
      </button>

      <div className="curso-detalles-container px-5 py-10 bg-[#f0faf7] -mt-10">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-5xl font-bold text-center text-[#2c7a7b] mb-8">
            Nueva Actividad
          </h1>
          
          <form onSubmit={handleCrearActividad} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">

                <div className="group">
                  <label className="block text-lg font-semibold text-[#2c7a7b] mb-3">
                    Nombre de la Actividad
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 bg-white"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    placeholder="Ingrese el nombre de la actividad..."
                  />
                </div>
              </div>

              <div className="group">
                  <label className="block text-lg font-semibold text-[#2c7a7b] mb-3">
                    Descripción
                  </label>
                  <textarea
                    className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 min-h-[200px] bg-white"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Describe la actividad..."
                  />
                </div>

                <div>
                <label className="block text-lg font-semibold text-[#2c7a7b] mb-4">
                  Adjuntar
                </label>
                
                <div className="flex items-center gap-4 w-full">
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

                <div className="flex gap-4 mt-4 items-center">
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
                    onClick={handleConfirmarUrl} 
                    className="bg-teal-500 text-white text-ls px-6 py-4 rounded-xl shadow-lg flex items-center gap-2"
                  >
                    Confirmar URLs
                  </button>
                </div>

                  {actividadUrl.length > 0 && (
                    <div className="mt-4">
                      <p className="text-lg font-semibold text-teal-500">URLs cargadas:</p>
                      <ul className="mt-4 space-y-2">
                        {actividadUrl.map((url, index) => (
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

              <div className="flex justify-end pt-8">
              <button 
                type="submit"
                className={`bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all transform hover:-translate-y-1 hover:shadow-xl ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:from-green-600 hover:to-green-700"
                }`}
                disabled={loading}
              >
                {loading ? "Creando..." : "Crear Actividad"}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default CrearActividad;
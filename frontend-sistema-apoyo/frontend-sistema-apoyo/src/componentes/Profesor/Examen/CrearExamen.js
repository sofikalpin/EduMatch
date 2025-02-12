import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../HeaderProfesor";
import { ArrowLeft } from 'lucide-react';
import drive from "../Imagenes/google-drive.png";
import youtube from "../Imagenes/youtube.png";
import subir from "../Imagenes/subir.png";
import url from "../Imagenes/url.png";
import { useUser } from "../../../context/userContext";
import axios from "axios";

const CrearExamen = () => {
  const location = useLocation();
  const { id } = location.state;

  const { user } = useUser();
  const [titulo, setTitulo] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [examenurl, setExamenUrl] = useState([]); 
  const [nuevaUrl, setNuevaUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  

  const validarURL = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;  // Regex para validar URL
    return regex.test(url);  // Retorna true si la URL es válida
  }

  const handleAgregarUrl = () => {
    if (nuevaUrl.trim() !== ""){
      setExamenUrl([...examenurl, nuevaUrl]);
      setNuevaUrl("");
    } else {
      alert("Ingrese un URL antes de agregar");
    }
  }

  const handleConfirmarUrl = async(e) => {

    e.preventDefault();

    setLoading(true);
    
    if (examenurl.length > 0 && examenurl[0].trim() !== "") {
      alert("URLs cargadas correctamente: " + examenurl.join(";"));
    } else {
      alert("No se han cargado URLs.");
    }
  }

  const handleCrearExamen = async (e) => {
    e.preventDefault();
    const nuevoExamen = {
      idexamen: 0,
      titulo: titulo.trim(),
      calificacion: calificacion.trim(),
      idusuario: user?.idUsuario,
      idnivel: id,
      fechaCreacion: new Date().toISOString().split("T")[0],
      url: examenurl.length > 0 ? examenurl.join(";") : "",
    };

    try {
      const response = await axios.post(
        "http://localhost:5228/api/ProfeExamen/CrearExamen",
        nuevoExamen
      );
      if (response.data.status) {
        alert("Examen creado exitosamente");
        navigate(-1);

        setTitulo("");
        setCalificacion("");
        setExamenUrl([]);

        console.log("Examen creado exitosamente");
        console.log({nuevoExamen});
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarEnlace = () => {
    const enlace = prompt("Ingrese el enlace:");
    
    if (enlace && validarURL(enlace)) {
      setExamenUrl((prev) => [...prev, enlace]);
    }else{
      alert("Por favor, ingrese un enlace valido.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Agrega el Header aquí */}
      <Header />

      {/* Botón "Volver" en la esquina superior izquierda */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
      >
        <ArrowLeft className="w-6 h-6" />
        <span>Volver</span>
      </button>

      {/*Contenedor con los detalles*/}
      <div className="curso-detalles-container px-5 py-8 bg-[#f0faf7] -mt-10">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-5xl font-bold text-center text-[#2c7a7b] mb-8">
            Nuevo Examen
          </h1>
          
          <form onSubmit={handleCrearExamen} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="group">
                  <label className="block text-lg font-semibold text-[#2c7a7b] mb-3">
                    Nombre del Examen
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 bg-white"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    placeholder="Ingrese el nombre del examen"
                  />
                </div>

                <div className="group">
                  <label className="block text-lg font-semibold text-[#2c7a7b] mb-3">
                    Calificacion maxima del examen
                  </label>
                  <input
                    type="integer"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 bg-white"
                    value={calificacion}
                    onChange={(e) => setCalificacion(e.target.value)}
                    required
                    placeholder="Ingrese la calificacion del examen"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-[#2c7a7b] mb-4">
                    Adjuntar
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese URL..."
                    value={nuevaUrl}
                    onChange={(e) => setNuevaUrl(e.target.value)}
                  />
                  <button type="button" className="flex gap-4 mt-4 bg-teal-500 text-white p-4 rounded-xl" onClick={handleAgregarUrl}>Agregar url</button>
                
                  <div className="flex gap-4 mt-4">
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
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button type="button" onClick={handleConfirmarUrl} className="bg-teal-500 text-white p-4 rounded-xl">
                      Confirmar URLs
                    </button>
                  </div>
                
                  {/* Mostrar URLs cargadas */}
                  {examenurl.length > 0 && (
                    <div className="mt-4">
                      <p className="text-gray-700">URLs cargadas:</p>
                        <ul className="mt-4 space-y-2">
                          {examenurl.map((url, index) => (
                            <li key={index} className="text-blue-600 underline flex justify-between">
                              <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                                <button
                                  onClick={() => setExamenUrl(examenurl.filter((_, i) => i !== index))}
                                  className="text-red-500 ml-4"
                                >
                                  X
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default CrearExamen;
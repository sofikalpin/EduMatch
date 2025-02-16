import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LogoInicio from "../../../logo/LogoInicio.png";
import fileIcon from "../Imagenes/file-icon.png";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";
import axios from "axios";

const ExamenDetalle = () => {
  const { idexamen } = useParams();
  console.log("ID del examen:", idexamen);

  const [loading, setLoading] = useState(false);
  const [examen, setExamen] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const encontrarExamen = async () => {
      try {
        setLoading(true);
        const respuesta = await axios.get(`http://localhost:5228/api/examenes/ExamenID?id=${idexamen}`);
        if (respuesta.data.status) {
          console.log("Respuesta completa de la API:", respuesta.data);
          setExamen(respuesta.data.value);
        } else {
          setError(respuesta.data.message);
        }
      } catch (error) {
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setExamen("");
      } finally {
        setLoading(false);
      }
    } 
    encontrarExamen();
  }, [idexamen]);

  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="lg:w-2/3">
        
        <h1 className="text-3xl font-bold text-gray-900">{examen?.titulo}</h1>
        <div className="mt-6 flex justify-center">
          <img src={fileIcon} alt="Actividad" className="w-32 h-auto rounded-lg shadow-md mx-auto" />
        </div>
          <p className="text-lg mt-6 font-semibold text-gray-800">Calificacion:</p>
          <p className="mt-2 text-gray-600">Nota maxima del examen: {examen?.calificacion}</p>
        <div className="mt-6">
          <p className="text-gray-800">Archivo de la actividad:</p>
          <a href={examen.url || "#"} className="text-blue-500 hover:underline">
            {examen.url ? examen.url : "La actividad no posee ningún link"}
          </a>
        </div>
      </div>
      <div className="lg:w-1/3">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <span className="text-gray-600">Fecha de Publicacion: {examen.fechaCreacion}</span>
        </div>
      </div>
    
      </div>
    </div> 
       <Footer />
    </div>
  );
};

export default ExamenDetalle;
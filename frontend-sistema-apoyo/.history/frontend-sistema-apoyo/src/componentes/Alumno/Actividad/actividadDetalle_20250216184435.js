import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoactividad from "../Imagenes/actividades.png";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActividadDetalle = () => {
  const { idactividad } = useParams();
  console.log("ID de la actividad:", idactividad);

  const [loading, setLoading] = useState(false);
  const [actividad, setActividad] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const encontrarActividad = async () => {
      try {
        setLoading(true);
        const respuesta = await axios.get(`http://localhost:5228/API/Actividad/ActividadID?id=${idactividad}`);
        if (respuesta.data.status) {
          console.log("Respuesta completa de la API:", respuesta.data);
          setActividad(respuesta.data.value);
        } else {
          setError(respuesta.data.message);
        }
      } catch (error) {
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setActividad("");
      } finally {
        setLoading(false);
      }
    } 
    encontrarActividad();
  }, [idactividad]);

  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="lg:w-2/3">
        
        <h1 className="text-3xl font-bold text-gray-900">{actividad?.nombre}</h1>
        <div className="mt-6 flex justify-center">
          <img src={logoactividad} alt="Actividad" className="w-32 h-auto rounded-lg shadow-md mx-auto" />
        </div>
          <p className="text-lg mt-6 font-semibold text-gray-800">Descripción:</p>
          <p className="mt-2 text-gray-600">{actividad?.descripcion}</p>
        <div className="mt-6">
          <p className="text-gray-800">Archivo de la actividad:</p>
          <a href={actividad.url || "#"} className="text-blue-500 hover:underline">
            {actividad.url ? actividad.url : "La actividad no posee ningún link"}
          </a>
        </div>
      </div>
      <div className="lg:w-1/3">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <span className="text-gray-600">Fecha de Publicacion: {actividad.fechaCreacion}</span>
        </div>
      </div>
       
      </div>
    </div> 
    <Footer />
    </div>
  );
};

export default ActividadDetalle;
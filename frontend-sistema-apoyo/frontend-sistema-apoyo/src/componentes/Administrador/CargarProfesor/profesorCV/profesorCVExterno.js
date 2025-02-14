import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Download, GraduationCap, BookOpen, Award, Briefcase } from 'lucide-react';
import Header from "../../HeaderAdministrador";
import Footer from "../../FooteraAdministrador";

const ProfesorCVExterno = () => {
  const [profesor, setProfesor] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProfesor = async () => {
      setCargando(true);
      try {
        const respuesta = await axios.get("http://localhost:5228/API/AdministradorProfesor/ListaProfesoresNOAutorizados");
        if (respuesta.data.status && respuesta.data.value) {
          setProfesor(respuesta.data.value);
        } else {
          console.error("Error al cargar el profesor: " + respuesta.data.message);
          setError("No se pudo cargar los datos del profesor.");
        }
      } catch (error) {
        console.error("Error al cargar los datos del profesor: ", error);
        setError("Error al conectar con el servidor.");
      } finally {
        setCargando(false);
      }
    };

    obtenerProfesor();
  }, []);

  if (cargando) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-lg text-gray-600">Cargando...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-lg text-red-600">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profesor) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-lg text-gray-600">No se encontraron datos del profesor.</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />
        <div className="flex items-center justify-start w-full mt-4 mb-0 px-20">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
                <ArrowLeft className="w-6 h-6" />
                <span>Volver</span>
            </button>
        </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            
            {/* Sección de Encabezado */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  {profesor.imagenUrl ? (
                    <img
                      src={profesor.imagenUrl}
                      alt={`${profesor.nombre} ${profesor.apellido}`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <GraduationCap size={48} className="text-green-600" />
                  )}
                </div>
              </div>
              
              <div className="md:ml-8 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800">
                  {profesor.nombre} {profesor.apellido}
                </h2>
                <p className="text-lg text-green-600 font-medium mt-1">
                  {profesor.profesion}
                </p>
              </div>
            </div>

            {/* Cuadrícula de Información */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Correo Electrónico</p>
                  <p className="text-gray-700">{profesor.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <Phone className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="text-gray-700">{profesor.telefono}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <Briefcase className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Profesión</p>
                  <p className="text-gray-700">{profesor.profesion}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <BookOpen className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Especialidad</p>
                  <p className="text-gray-700">{profesor.especialidad}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <Award className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Nivel</p>
                  <p className="text-gray-700">{profesor.nivel}</p>
                </div>
              </div>
            </div>

            {/* Botón de Descarga CV */}
            <div className="mt-8">
              {profesor.cv ? (
                <a
                  href={profesor.cv}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descargar CV
                </a>
              ) : (
                <span className="text-gray-500 italic">CV: no disponible</span>
              )}
            </div>

            {/* Información adicional de JellyJobs */}
            <div className="mt-8 text-center text-sm text-gray-600">
              Información obtenida de: <a href="https://www.jellyjobs.com" className="text-green-600 hover:underline">JellyJobs</a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfesorCVExterno;

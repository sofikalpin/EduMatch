import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logoactividad from "../Imagenes/actividades.png";
import { FaSearch, FaUserCircle, FaBell, FaYoutube, FaGoogleDrive, FaUpload } from "react-icons/fa";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";

const ActividadDetalle = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  console.log("ID de la actividad:", id);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [actividad, setActividad] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unidades, setUnidades] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const youtubeInputRef = useRef(null);
  const driveInputRef = useRef(null);
  const uploadInputRef = useRef(null);

  const actividades = [
    { id: "1", title: "Cómo utilizar los phrasal verbs en conversaciones cotidianas", description: "En esta actividad hay que completar con el phrasal verb que corresponde." },
    { id: "2", title: "Uso de tiempos verbales en inglés", description: "Practica el uso de los tiempos verbales en diferentes contextos." },
    { id: "3", title: "Preparación para el examen de listening", description: "Escucha el audio y responde las preguntas relacionadas." },
  ];

  useEffect(() => {
    const actividadEncontrada = actividades.find((actividad) => actividad.id === id);
    if (actividadEncontrada) {
      setActividad(actividadEncontrada);
    }
  }, [id]);

  useEffect(() => {
    const unidadesAsignadas = Array.from({ length: 12 }, (_, i) => `Unit ${i + 1}`);
    setUnidades(unidadesAsignadas);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedUnit(null);
  };

  const handleUnitClick = (unitNumber) => {
    setSelectedUnit(unitNumber);
    setSearchQuery(`Unit ${unitNumber}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuOptionClick = (option) => {
    switch(option) {
      case "Mi perfil":
        navigate("/mi-perfil"); 
        break;
      case "Cambiar de cuenta":
        break;
      case "Salir":
        break;
      default:
        break;
    }
    setIsMenuOpen(false); 
  };

  const handleUploadClick = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name); 
      setLoading(true); 
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const archivoSubido = "https://www.example.com/archivo-actividad.pdf"; 

  if (!actividad) return <div className="flex justify-center items-center h-screen">Cargando...</div>; 

  const handleSubmit = () => {
    setIsSubmitted(true); 
    alert("Actividad entregada");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="lg:w-2/3">
  <h1 className="text-3xl font-bold text-gray-900">{actividad.title}</h1>
  <div className="mt-6 flex justify-center">
    <img src={logoactividad} alt="Actividad" className="w-32 h-auto rounded-lg shadow-md mx-auto" />
  </div>
  <p className="text-lg mt-6 font-semibold text-gray-800">Descripción:</p>
  <p className="mt-2 text-gray-600">{actividad.description}</p>
  {archivoSubido && (
    <div className="mt-6">
      <p className="text-gray-800">Archivo de la actividad:</p>
      <a href={archivoSubido} download className="text-blue-500 hover:underline">
        Descargar actividad
      </a>
    </div>
  )}
</div>


          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <span className="text-gray-600">Fecha de entrega: 25/08</span>
              <div className="flex space-x-4 mt-6">
                <FaYoutube className="text-red-500 w-10 h-10 cursor-pointer" onClick={() => handleUploadClick(youtubeInputRef)} />
                <input
                  type="file"
                  accept="video/*"
                  ref={youtubeInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <FaGoogleDrive className="text-blue-500 w-10 h-10 cursor-pointer" onClick={() => handleUploadClick(driveInputRef)} />
                <input
                  type="file"
                  ref={driveInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <FaUpload className="text-gray-700 w-10 h-10 cursor-pointer" onClick={() => handleUploadClick(uploadInputRef)} />
                <input
                  type="file"
                  ref={uploadInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              {selectedFile && !loading && <p className="mt-4 text-sm text-gray-600">Archivo seleccionado: {selectedFile}</p>}
              {loading && <p className="mt-4 text-sm text-gray-600">Cargando archivo...</p>}
            </div>

            <div className="mt-6">
              <button
                className={`w-full py-3 rounded-md text-white font-semibold ${isSubmitted ? "bg-green-500" : "bg-blue-500"} hover:bg-blue-600 transition duration-300`}
                onClick={handleSubmit}
                disabled={isSubmitted}
              >
                {isSubmitted ? "Actividad entregada" : "Entregar actividad"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-32"></div>
      <Footer></Footer>
    </div>
  );
};

export default ActividadDetalle;
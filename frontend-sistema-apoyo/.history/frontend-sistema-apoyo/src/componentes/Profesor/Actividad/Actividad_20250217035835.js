import React, { useState, useEffect } from "react"; 
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import actividadImg from "../Imagenes/actividad.jpg";
import Header from "../HeaderProfesor";
import Footer from "../FooterProfesor";
import axios from "axios";
import { useUser } from "../../../context/userContext";

const ActividadesProfesor = () => {
  const location = useLocation();
  const { nivel, nombre } = location.state || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [actividades, setActividades] = useState([]);
  const [filteredActividades, setFilteredActividades] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [opcionCreacion, setOpcionCreacion] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  const idProfesor = user?.idUsuario;

  // Depuración: Mostrar el estado inicial
  useEffect(() => {
    console.log("Estado inicial - nivel:", nivel);
    console.log("Estado inicial - nombre:", nombre);
    console.log("Estado inicial - idProfesor:", idProfesor);
  }, [nivel, nombre, idProfesor]);

  useEffect(() => {
    const fetchActividades = async () => {
      setLoading(true);
      setError("");
      try {
        const idNivel = nivel;
        // Depuración: Verificar el ID del nivel
        console.log("Fetching actividades para nivel ID:", idNivel);
        
        if (!idNivel) {
          throw new Error("El ID del nivel no está disponible.");
        }

        const response = await axios.get(`http://localhost:5228/API/Actividad/ActividadesPorNivel?idNivel=${idNivel}`);
        // Depuración: Verificar respuesta del servidor
        console.log("Respuesta del servidor:", response.data);
        
        if (response.data.status && Array.isArray(response.data.value)) {
          setActividades(response.data.value);
          setFilteredActividades(response.data.value);
          // Depuración: Mostrar las actividades recibidas
          console.log("Actividades recibidas:", response.data.value);
        } else {
          setError(response.data.message || "Error al cargar las actividades");
        }
      } catch (error) {
        console.error("Error fetching actividades:", error);
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setActividades([]);
        setFilteredActividades([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (nivel) {
      fetchActividades();
    } else {
      setError("No se ha especificado un nivel válido");
      setLoading(false);
    }
  }, [nivel]);

  // Función para manejar el clic en "Ver actividad"
  const handleViewActividad = (actividad) => {
    navigate(`/profesor/cursos/detalle/actividad/${actividad.idactividad}`, {
      state: { nivel, nombre }
    });
  };

  useEffect(() => {
    // Filtrar por título solo si hay un texto de búsqueda
    const titlesFiltered = searchQuery
      ? actividades.filter(
          (actividad) => actividad.titulo?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : actividades;  // Si no hay búsqueda, no aplicamos filtro por título
    
    // Aplicar filtro de creador solo si se seleccionó una opción
    const filtered = opcionCreacion
      ? titlesFiltered.filter(
          (actividad) => actividad.idusuario && actividad.idusuario.toString() === opcionCreacion
        )
      : titlesFiltered;  // Si no hay filtro de creador, no filtramos por creador
    
    setFilteredActividades(filtered);
  }, [searchQuery, opcionCreacion, actividades]);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsFocused(true);
  };

  const handleNuevaActividad = () => {
    if (user.nivel < nivel) {
      alert("Su nivel de perfil es menor al nivel correspondiente a la actividad que desea crear. Por favor cree actividades con su nivel o menor a este.");
    } else {
      // Depuración: Verificar datos antes de navegar a crear actividad
      console.log("Navegando a crear actividad con nivel:", nivel);

      navigate("/crear-actividad", { 
        state: { nivel } 
      });
    }
  };

  // Verificar si una actividad pertenece al profesor
  const isOwnActividad = (actividad) => {
    return actividad.idusuario && actividad.idusuario.toString() === idProfesor?.toString();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header />

      <div className="flex-grow flex flex-col items-center justify-center px-5 py-10">
        
        {/* Contenedor para "Volver" y el título */}
        <div className="flex items-center justify-between w-full mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Volver</span>
          </button>

          <h1 className="text-5xl font-bold text-[#2c7a7b] text-center flex-grow">Actividades</h1>
        </div>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Explora y administra las actividades disponibles.</p>

        {/* Fila con buscador y botón de crear nueva actividad */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Buscador */}
          <div className="relative w-full md:w-2/3">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar actividad..."
                className="w-full p-3 pl-12 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              />
            </div>

            {/* Lista desplegable de resultados del buscador */}
            {isFocused && searchQuery && (
              <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-2 max-h-48 overflow-y-auto border border-gray-200 z-20">
                {loading ? (
                  <p className="text-center py-4">Cargando actividades...</p>
                ) : error ? (
                  <p className="text-center py-4 text-red-500">{error}</p>
                ) : filteredActividades.length > 0 ? (
                  filteredActividades.map((actividad) => (
                    <li key={actividad.idactividad} className="p-3 hover:bg-gray-100 cursor-pointer transition-all">
                      {/* Usar onClick en lugar de Link para depuración */}
                      <div 
                        onClick={() => handleViewActividad(actividad)}
                        className="block text-gray-700 cursor-pointer"
                      >
                        {actividad.titulo || "Actividad sin título"}
                        {isOwnActividad(actividad) && (
                          <span className="ml-2 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">Mi actividad</span>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-3 text-center text-gray-500">No se encontraron resultados</li>
                )}
              </ul>
            )}
          </div>

          {/* Filtro de "Mis actividades" */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              id="nivel-select"
              value={opcionCreacion}
              onChange={(e) => setOpcionCreacion(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base w-full md:w-48"
            >
              <option value="">Todas las actividades</option>
              <option value={idProfesor?.toString()}>Mis actividades</option>
            </select>

            {/* Botón "Crear nueva actividad" */}
            <button 
              onClick={handleNuevaActividad}
              className={`py-2 px-4 rounded-lg text-base transition-all whitespace-nowrap
                ${user.nivel < nivel 
                  ? "bg-gray-400 cursor-not-allowed text-gray-200" 
                  : "bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700"}`}
            >
              Crear actividad
            </button>
          </div>
        </div>

        {/* Actividades filtradas */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
  {loading ? (
    <div className="col-span-full text-center py-8">
      <p className="text-lg text-gray-600">Cargando actividades...</p>
    </div>
  ) : error ? (
    <div className="col-span-full text-center py-8">
      <p className="text-lg text-red-500">{error}</p>
    </div>
  ) : filteredActividades.length > 0 ? (
    filteredActividades.map((actividad) => (
      <div key={actividad.idactividad} className="flex flex-col items-center justify-between bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <img src={actividadImg} alt="actividad" className="w-full h-46 object-cover" />
        <div className="p-6 w-full">
          <h3 className="font-semibold text-xl text-gray-800 truncate mb-2">{actividad.nombre || "Sin título"}</h3>
          <p className="text-gray-600 text-sm mb-4">{actividad.descripcion || "Sin descripción"}</p>
          <div className="flex justify-between items-center w-full">
            {isOwnActividad(actividad) && (
              <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">Mi actividad</span>
            )}
            <button
              onClick={() => handleViewActividad(actividad)}
              className="w-full py-2 px-3 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors duration-300"
            >
              Ver actividad
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-full text-center py-8">
      <p className="text-lg text-gray-600">No se encontraron actividades.</p>
    </div>
    )}
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default ActividadesProfesor;
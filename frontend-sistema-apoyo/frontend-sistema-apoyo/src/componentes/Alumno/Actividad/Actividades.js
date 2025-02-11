import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import actividad from "../Imagenes/actividades.png";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";
import axios from "axios";

const Actividades = () => {
  const location = useLocation();
  const { nivel, nombre } = location.state || {};
  console.log(location.state);
  const [searchQuery, setSearchQuery] = useState("");
  const [assignedActivities, setAssignedActivities] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicializa la función navigate

  // Cargar actividades relacionadas al nivel seleccionado
  useEffect(() => {
    const fetchActividades = async () => {
      setLoading(true);
      setError("");
      try {
        const idAlumnoNivel = nivel;
        if (!idAlumnoNivel) {
          throw new Error("El ID del alumno no está disponible.");
        }

        const response = await axios.get(`http://localhost:5228/API/Actividad/ActividadesPorNivel?idNivel=${idAlumnoNivel}`);
        if (response.data.status && Array.isArray(response.data.value)) {
          setAssignedActivities(response.data.value);
        } else {
          console.error("Error al cargar las actividades: " + response.data.message);
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error al cargar las actividades: ", error);
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setAssignedActivities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchActividades();
  }, [nivel]); // Solo dependemos de nivel

  // Manejo de la búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsFocused(true);
  };

  // Filtrado de actividades
  const filteredActivities = assignedActivities.filter(
    (activity) =>
      activity.nombre?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="bg-gray-100 min-h-screen overflow-auto flex flex-col">
      <Header />
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-12 mt-12">Actividades</h1>
        
        <div className="relative max-w-lg mx-auto">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Buscar actividad o Unidad..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
          </div>
          {isFocused && searchQuery && (
            <ul className="absolute w-full bg-white shadow-lg rounded-xl mt-2 max-h-48 overflow-y-auto">
              {loading ? (
                <p>Cargando actividades ...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <li key={activity.idactividad} className="p-2 hover:bg-gray-200 cursor-pointer">
                    <Link to={activity.link}>{activity.nombre}</Link>
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No se encontraron resultados</li>
              )}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {filteredActivities.map((activity) => (
            <div key={activity.idactividad} className="bg-white shadow-md rounded-xl p-4">
              <Link to={activity.link} className="block">
                <img src={actividad} alt="Actividad" className="w-full h-40 object-cover rounded-md" />
                <p className="text-lg font-semibold mt-2">{activity.nombre}</p>
                <p>{activity.descripcion}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-32"></div>
      <Footer />
    </div>
  );
};

export default Actividades;

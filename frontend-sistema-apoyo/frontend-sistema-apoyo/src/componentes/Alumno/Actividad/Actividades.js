import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import actividad from "../Imagenes/actividades.png";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";
import { useUser } from "../../../context/userContext";
import axios from "axios";

const Actividades = () => {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unidades, setUnidades] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [assignedActivities, setAssignedActivities] = useState([]);

  useEffect(() => {
    const fetchActividades = async () => {
      setLoading(true);
      try {
        const idAlumnoNivel = user?.idNivel;
        if (!idAlumnoNivel) {
          throw new Error("El ID del alumno no está disponible.");
        }

        const response = await axios.get(`http://localhost:5228/API/Actividad/ActividadesPorNivel?idNivel=${idAlumnoNivel}`)
        if (response.data.status && Array.isArray(response.data.value)){
          setAssignedActivities(response.data.value);
        }else{
          console.error("Error al cargar las actividades" + response.data.message);
          setError(response.data.message);
        }
      }catch (error){
        console.error("Error al cargar las actividades: ", error);
        setError("Error al conectar con el servidor.");
      }finally{
        setLoading(false);
      }
    }
    fetchActividades();
  }, [user]);
  
  useEffect(() => {
    const unidadesAsignadas = Array.from({ length: 12 }, (_, i) => `Unit ${i + 1}`);
    setUnidades(unidadesAsignadas);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedUnit(null);
  };

  const filteredActivities = assignedActivities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `Unit ${activity.unidad}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen overflow-auto flex flex-col">
      <Header></Header>
      <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-12 mt-12">Actividades</h1>
        <div className="relative max-w-lg mx-auto ">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar actividad o Unidad..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
          {isFocused && searchQuery && (
            <ul className="absolute w-full bg-white shadow-lg rounded-xl mt-2 max-h-48 overflow-y-auto">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <li key={activity.id} className="p-2 hover:bg-gray-200 cursor-pointer">
                    <Link to={activity.link}>{activity.title}</Link>
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
            <div key={activity.id} className="bg-white shadow-md rounded-xl p-4">
              <Link to={activity.link} className="block">
                <img src={actividad} alt="Actividad" className="w-full h-40 object-cover rounded-md" />
                <p className="text-lg font-semibold mt-2">Unit {activity.unidad}: {activity.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-32"></div>
      <Footer></Footer>
    </div>
  );
};

export default Actividades;

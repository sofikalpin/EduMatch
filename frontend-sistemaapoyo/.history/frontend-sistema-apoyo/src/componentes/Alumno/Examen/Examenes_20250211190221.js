import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoInicio from "../../../logo/LogoInicio.png";
import chatIcon from "../Imagenes/chat.png";
import examenLogo from "../Imagenes/examen.png";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";
import axios from "axios";

const Examenes = () => {
  const location = useLocation();
  const { nivel, nombre } = location.state || {};
  console.log(location.state);
  const [searchQuery, setSearchQuery] = useState("");
  const [assignedExamenes, setAssignedExamenes] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicializa la función navigate

  //carga de examenes
  useEffect(() => {
    const fetchExamenes = async () => {
      setLoading(true);
      setError("");
      try {
        const idAlumnoNivel = nivel;
        if (!idAlumnoNivel) {
          throw new Error("El ID del alumno no está disponible.");
        }

        const response = await axios.get(`http://localhost:5228/api/examenes/ExamenPorNivel?idNivel=${idAlumnoNivel}`);
        if (response.data.status && Array.isArray(response.data.value)) {
          setAssignedExamenes(response.data.value);
        } else {
          console.error("Error al cargar los examenes: " + response.data.message);
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error al cargar los examenes: ", error);
        setError("Error al conectar con el servidor, inténtelo más tarde.");
        setAssignedExamenes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExamenes();
  }, [nivel]); // Solo dependemos de nivel

  // Manejo de la búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsFocused(true);
  };

  const filteredExamenes = assignedExamenes.filter(
    (examen) =>
      examen.titulo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-10">
    <Header />

      {/* Contenido */}
      <div className="p-6 flex-grow">
        <h1 className="text-3xl font-semibold mb-6">Examenes</h1>

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
                <p>Cargando examenes ...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : filteredExamenes.length > 0 ? (
                filteredExamenes.map((examen) => (
                  <li key={examen.idexamen} className="p-2 hover:bg-gray-200 cursor-pointer">
                    <Link to={examen.link}>{examen.titulo}</Link>
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No se encontraron resultados</li>
              )}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {filteredExamenes.map((examen) => (
            <div key={examen.idexamen} className="bg-white shadow-md rounded-xl p-4">
              <Link to={examen.link} className="block">
                <img src={examenLogo} alt="Examen" className="w-full h-40 object-cover rounded-md" />
                <p className="text-lg font-semibold mt-2">{examen.titulo}</p>
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

export default Examenes;

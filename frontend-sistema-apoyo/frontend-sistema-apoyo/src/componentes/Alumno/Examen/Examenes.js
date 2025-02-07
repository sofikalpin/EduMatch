import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoInicio from "../../../logo/LogoInicio.png";
import chatIcon from "../Imagenes/chat.png";
import examenLogo from "../Imagenes/examen.png";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";

const Examenes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unidades, setUnidades] = useState([]);
  const [assignedExamenes, setAssignedExamenes] = useState([
    { id: 1, title: "Cómo utilizar el pasado en conversaciones cotidianas", link: "/examenes/1", unidad: 1 },
    { id: 2, title: "Claves para mejorar tu pronunciación en inglés", link: "/examenes/2", unidad: 2 },
    { id: 3, title: "Uso correcto de los verbos modales en inglés", link: "/examenes/3", unidad: 3 },
    { id: 4, title: "El presente perfecto en situaciones reales", link: "/examenes/4", unidad: 1 },
    { id: 5, title: "Diferencias entre 'must' y 'have to'", link: "/examen/5", unidad: 2 },
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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

  const filteredExamenes = assignedExamenes.filter(
    (examen) =>
      examen.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `Unit ${examen.unidad}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const examenesForSelectedUnit = assignedExamenes.filter((examen) => examen.unidad === selectedUnit);
  const isUnitEmpty = selectedUnit !== null && examenesForSelectedUnit.length === 0;
  const isUnitSearch = searchQuery.toLowerCase().includes("unit");
  const searchUnitNumber = isUnitSearch ? parseInt(searchQuery.split(" ")[1], 10) : null;
  const isSearchUnitEmpty =
    searchUnitNumber && !assignedExamenes.some((examen) => examen.unidad === searchUnitNumber);

  const navigate = useNavigate();

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

  return (
    <div className="bg-gray-100 min-h-screen overflow-auto flex flex-col">
    <Header></Header>

      {/* Contenido */}
      <div className="p-6 flex-grow">
        <h1 className="text-3xl font-semibold mb-6">Examenes</h1>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-2 mb-6">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search examen or Unit"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="space-y-2">
              {unidades.map((unit, index) => {
                const unitNumber = index + 1;
                return (
                  <div key={index} className="text-gray-700">
                    <button
                      className="w-full text-left py-2 px-4 rounded-lg hover:bg-blue-100"
                      onClick={() => handleUnitClick(unitNumber)}
                    >
                      {unit}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Examenes */}
          <div className="w-3/4 ml-8">
            {isUnitEmpty ? (
              <p className="text-xl text-gray-600">This unit does not contain any examenes at the moment.</p>
            ) : isSearchUnitEmpty ? (
              <p className="text-xl text-gray-600">
                This unit does not exist at the moment. "{searchQuery}"
              </p>
            ) : (
              filteredExamenes.map((examen) => (
                <div key={examen.id} className="mb-4">
                  <Link to={`/alumno/examenes/${examen.id}`} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:bg-gray-100">
                    <div className="w-12 h-12">
                      <img src={examenLogo} alt="Logo Examen" className="w-full h-full object-cover rounded-md" />
                    </div>
                    <p className="text-lg font-medium text-gray-800">Unit {examen.unidad}: {examen.title}</p>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="mt-32"></div>
            <Footer />
    </div>
  );
};

export default Examenes;

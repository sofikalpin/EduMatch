import React, { useState } from "react";
import Headers from "../HeaderAlumno";
import Footer from "../FooterAlumno";

const Articulos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unidades] = useState(Array.from({ length: 12 }, (_, i) => `Unit ${i + 1}`));
  const [assignedArticles] = useState([
    { id: 1, title: "Cómo utilizar el pasado en conversaciones cotidianas", unidad: 1 },
    { id: 2, title: "Claves para mejorar tu pronunciación en inglés", unidad: 2 },
    { id: 3, title: "Uso correcto de los verbos modales en inglés", unidad: 3 },
    { id: 4, title: "El presente perfecto en situaciones reales", unidad: 1 },
    { id: 5, title: "Diferencias entre 'must' y 'have to'", unidad: 2 },
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedUnit(null);
  };

  const handleUnitClick = (unitNumber) => {
    setSelectedUnit(unitNumber);
    setSearchQuery(`Unit ${unitNumber}`);
  };

  const filteredArticles = assignedArticles.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `Unit ${article.unidad}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const isUnitEmpty = selectedUnit !== null && filteredArticles.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
    
      <Headers></Headers>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-10 mt-12">Articulos</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Busca un Arituclo o Unidad"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="space-y-2 bg-white rounded-lg shadow-sm p-4">
              {unidades.map((unit, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    selectedUnit === index + 1
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => handleUnitClick(index + 1)}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="flex-1">
            {isUnitEmpty ? (
              <div className="text-center py-12">
                <p className="text-gray-500">This unit does not contain any activities at the moment.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        📄
                      </div>
                      <h3 className="font-medium text-gray-900 text-center">
                        Unit {article.unidad}: {article.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-32"></div>
      <Footer></Footer>
    </div>
  );
};

export default Articulos;
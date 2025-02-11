import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import Header from "../HeaderProfesor";
import drive from "../Imagenes/google-drive.png";
import youtube from "../Imagenes/youtube.png";
import subir from "../Imagenes/subir.png";
import url from "../imagenes/url.png";

const CrearArticulo = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [unidad, setUnidad] = useState("Unidad 1");
  const [publicarEn, setPublicarEn] = useState("B1: Pre-Intermedio");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [estudiantesSeleccionados, setEstudiantesSeleccionados] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState("B1: Pre-Intermedio");
  const [asignarA, setAsignarA] = useState("Seleccionar Estudiantes");

  const cursos = [
    "A1: Principiante",
    "A2: Básico", 
    "B1: Pre-Intermedio",
    "B2: Intermedio",
    "C1: Intermedio-Alto",
    "C2: Avanzado"
  ];

  const estudiantes = {
    "B1: Pre-Intermedio": ["Estudiante 1", "Estudiante 2", "Estudiante 3"],
    "A1: Principiante": ["Estudiante 4", "Estudiante 5"],
    "A2: Básico": ["Estudiante 6", "Estudiante 7"],
    "B2: Intermedio": ["Estudiante 8", "Estudiante 9"],
    "C1: Intermedio-Alto": ["Estudiante 10", "Estudiante 11"],
    "C2: Avanzado": ["Estudiante 12", "Estudiante 13"]
  };

  const navigate = useNavigate();

  const handleCrearArticulo = async (e) => {
    e.preventDefault();
    const nuevoArticulo = {
      nombre,
      descripcion,
      unidad,
      publicarEn,
      asignarA: asignarA === "Todos" ? "Todos" : estudiantesSeleccionados
    };
    try {
      const response = await fetch("/api/articulos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoArticulo)
      });
      if (response.ok) {
        alert("Artículo creado exitosamente");
        navigate("/profesor/articulos");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const handleSeleccionarEstudiantes = (e) => {
    const value = e.target.value;
    setEstudiantesSeleccionados((prevState) =>
      prevState.includes(value)
        ? prevState.filter((estudiante) => estudiante !== value)
        : [...prevState, value]
    );
  };

  const handleSeleccionarCurso = (curso) => {
    setCursoSeleccionado(curso);
    setPublicarEn(curso);
    setEstudiantesSeleccionados([]);
  };

  const handleAsignarATodos = () => {
    if (asignarA === "Todos") {
      setEstudiantesSeleccionados([]);
      setAsignarA("Seleccionar Estudiantes");
    } else {
      setEstudiantesSeleccionados(estudiantes[cursoSeleccionado]);
      setAsignarA("Todos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Agrega el Header aquí */}
      <Header />

      {/* Botón "Volver" en la esquina superior izquierda */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
      >
      <ArrowLeft className="w-6 h-6" />
      <span>Volver</span>
      </button>

      {/*Contenedor con los detalles*/}
      <div className="curso-detalles-container px-5 py-10 bg-[#f0faf7] -mt-10">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-5xl font-bold text-center text-[#2c7a7b] mb-8">
            Nuevo Artículo
          </h1>
          
          <form onSubmit={handleCrearArticulo} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="group">
                  <label className="block text-lg font-semibold text-[#2c7a7b] mb-3">
                    Nombre del Artículo
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 bg-white"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    placeholder="Ingrese el nombre del artículo"
                  />
                </div>

                <div className="group">
                  <label className="block text-lg font-semibold text-[#2c7a7b] mb-3">
                    Descripción
                  </label>
                  <textarea
                    className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 min-h-[200px] bg-white"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Describe el artículo..."
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-[#2c7a7b] mb-4">
                    Adjuntar
                  </label>
                  <div className="flex justify-start space-x-6">
                    {[
                      { icon: drive, name: "Drive" },
                      { icon: youtube, name: "YouTube" },
                      { icon: subir, name: "Subir" },
                      { icon: url, name: "URL" }
                    ].map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        className="p-6 bg-white rounded-xl hover:bg-gray-50 transition duration-300 flex items-center justify-center group shadow-md hover:shadow-lg transform hover:-translate-y-1"
                      >
                        <img src={item.icon} alt={item.name} className="h-8 w-8" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-semibold text-[#2c7a7b] mb-3">
                    Publicar en
                  </label>
                  <select
                    className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 bg-white"
                    value={publicarEn}
                    onChange={(e) => handleSeleccionarCurso(e.target.value)}
                  >
                    {cursos.map((curso) => (
                      <option key={curso} value={curso}>
                        {curso}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-[#2c7a7b] mb-3">
                    Asignar a
                  </label>
                  <button
                    type="button"
                    onClick={() => setMostrarModal(true)}
                    className="w-full p-4 bg-teal-50 text-[#2c7a7b] rounded-xl hover:bg-teal-100 transition duration-300 flex items-center justify-between shadow-md hover:shadow-lg"
                  >
                    <span className="font-medium">
                      {asignarA === "Todos"
                        ? "Todos los estudiantes"
                        : `${estudiantesSeleccionados.length} estudiantes seleccionados`}
                    </span>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-[#2c7a7b] mb-3">
                    Unidad
                  </label>
                  <select
                    className="w-full p-4 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-teal-200 focus:border-teal-400 transition duration-300 bg-white"
                    value={unidad}
                    onChange={(e) => setUnidad(e.target.value)}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={`Unit ${num}`}>
                        Unidad {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:-translate-y-1 hover:shadow-xl"
              >
                Crear Artículo
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md m-4 transform transition-all">
            <h3 className="text-2xl font-bold text-[#2c7a7b] mb-6">
              Seleccionar Estudiantes de {cursoSeleccionado}
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="todos"
                  checked={asignarA === "Todos"}
                  onChange={handleAsignarATodos}
                  className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="todos" className="ml-3 text-gray-700 font-medium">
                  Asignar a todos
                </label>
              </div>
              
              <div className="max-h-64 overflow-y-auto space-y-3 pr-4">
                {estudiantes[cursoSeleccionado]?.map((estudiante, index) => (
                  <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded-xl transition duration-200">
                    <input
                      type="checkbox"
                      value={estudiante}
                      checked={estudiantesSeleccionados.includes(estudiante)}
                      onChange={handleSeleccionarEstudiantes}
                      disabled={asignarA === "Todos"}
                      className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500"
                    />
                    <label className="ml-3 text-gray-700">{estudiante}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition duration-300 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setMostrarModal(false);
                  setAsignarA(
                    estudiantesSeleccionados.length
                      ? estudiantesSeleccionados
                      : "Todos"
                  );
                }}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition duration-300 font-medium"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrearArticulo;
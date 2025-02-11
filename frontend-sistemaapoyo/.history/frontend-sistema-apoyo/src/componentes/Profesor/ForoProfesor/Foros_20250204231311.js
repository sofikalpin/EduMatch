import { useState } from "react";
import { Plus, MessageSquare, Trash2, ChevronRight } from "lucide-react";
import HeaderForo from "../HeaderProfesor";
import logo from "../../../logo/LogoInicio.png";
import Footer from "../FooterProfesor";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';


const socialIcons = [
  { name: 'Facebook', color: 'hover:text-blue-500' },
  { name: 'Instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', color: 'hover:text-blue-400' },
  { name: 'Youtube', color: 'hover:text-red-500' },
  { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const Foro = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [consultaToDelete, setConsultaToDelete] = useState(null);
  const [currentView, setCurrentView] = useState("forum"); // 'forum', 'respuesta', 'masrespuestas', 'consulta'
  const [showResponses, setShowResponses] = useState({}); // Estado para controlar las respuestas visibles

  const navigate = useNavigate(); // Usamos useNavigate en lugar de onNavigate

  const handleResponder = () => {
    navigate('/respuesta'); // Aquí rediriges a la página de consulta
  };

  const handleMasRespuestas = () => {
    setCurrentView("masrespuestas");
  };

  const handleNuevaConsulta = () => {
    navigate('/consulta'); // Aquí rediriges a la página de consulta
  };

  const handleEliminar = (consultaId) => {
    setConsultaToDelete(consultaId);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    setShowConfirmDialog(false);
    setConsultaToDelete(null);
    // Aquí puedes añadir la lógica para eliminar la consulta
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setConsultaToDelete(null);
  };

  const toggleResponses = (consultaId) => {
    setShowResponses((prev) => ({
      ...prev,
      [consultaId]: !prev[consultaId], // Alternar visibilidad de las respuestas
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <HeaderForo logo={logo} />
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
      >
      <ArrowLeft className="w-6 h-6" />
      <span>Volver</span>
      </button>

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-32">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Foro de Discusión</h1>
          <button
            onClick={handleNuevaConsulta} // Aquí se llama a navigate('/consulta')
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Consulta</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Post Card 1 */}
          <article className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                    V
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Valentina Capra</h3>
                    <p className="text-sm text-gray-500">18 de Octubre</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full">Gramática</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">Buenas tardes! Cuando tengo que usar el past simple?</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MessageSquare className="w-4 h-4" />
                  <span>2 respuestas</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEliminar(0)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleResponder(0)}
                    className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200"
                  >
                    <span>Responder</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Botón para ver respuestas */}
              <div className="flex items-center gap-2 text-blue-600 text-sm mt-4">
                <button
                  onClick={() => toggleResponses(0)} // Alternar visibilidad de las respuestas
                  className="hover:text-blue-800"
                >
                  {showResponses[0] ? "Ocultar respuestas" : "Ver respuestas"}
                </button>
              </div>

              {/* Respuestas */}
              {showResponses[0] && (
                <div className="mt-4 space-y-4">
                  <div className="bg-teal-50 p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                        M
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">María González</h3>
                        <p className="text-sm text-gray-500">19 de Octubre</p>
                      </div>
                    </div>
                    <p className="text-gray-700">El past simple se usa para acciones completadas en el pasado. Por ejemplo: "I watched a movie yesterday."</p>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                        J
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Juan Silva</h3>
                        <p className="text-sm text-gray-500">19 de Octubre</p>
                      </div>
                    </div>
                    <p className="text-gray-700">También se usa para una serie de acciones consecutivas en el pasado: "I woke up, had breakfast, and went to work."</p>
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Puedes agregar más post similares aquí */}
        </div>
      </main>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmar eliminación</h3>
            <p className="text-gray-600 mb-6">¿Estás seguro que deseas eliminar esta consulta? Esta acción no se puede deshacer.</p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer 
        socialIcons={socialIcons}
        onNavigation={navigate}
      />
    </div>
  );
};

export default Foro;

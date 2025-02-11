import { useState } from "react";
import { Plus, MessageSquare, Trash2, ChevronRight } from "lucide-react";
import HeaderForo from "./HeaderForo";
import logo from "../../logo/LogoInicio.png";

const Foro = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [consultaToDelete, setConsultaToDelete] = useState(null);
  const [currentView, setCurrentView] = useState('forum'); // 'forum', 'respuesta', 'masrespuestas', 'consulta'

  const handleResponder = (consultaId) => {
    setCurrentView('respuesta');
  };

  const handleMasRespuestas = () => {
    setCurrentView('masrespuestas');
  };

  const handleNuevaConsulta = () => {
    setCurrentView('consulta');
  };

  const handleEliminar = (consultaId) => {
    setConsultaToDelete(consultaId);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    setShowConfirmDialog(false);
    setConsultaToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setConsultaToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <HeaderForo logo={logo} />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-32 mt-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Foro de Discusión</h1>
          <button
            onClick={handleNuevaConsulta}
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
            </div>
          </article>

          {/* Post Card 2 */}
          <article className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Andrés Pérez</h3>
                    <p className="text-sm text-gray-500">20 de Octubre</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">Present Perfect</span>
                </div>
              </div>
              
              <h4 className="font-medium text-lg text-gray-900 mb-2">Uso del present perfect</h4>
              <p className="text-gray-700 mb-6">¿En qué situaciones se usa el present perfect? Agradecería si me pueden dar ejemplos.</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MessageSquare className="w-4 h-4" />
                  <span>0 respuestas</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEliminar(1)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleResponder(1)}
                    className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200"
                  >
                    <span>Responder</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>
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
    </div>
  );
};

export default Foro;
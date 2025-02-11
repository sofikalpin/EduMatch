import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import logo from "../../logo/LogoInicio.png"

const Foro = () => {
  const navigate = useNavigate()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [consultaToDelete, setConsultaToDelete] = useState(null)

  const handleResponder = (consultaId) => {
    console.log(`Responder consulta con ID: ${consultaId}`);
    navigate("/respuesta", { state: { consultaId } })
  }

  const handleMasRespuestas = () => {
    console.log('Ver más respuestas');
    navigate("/masrespuestas")
  }

  const handleNuevaConsulta = () => {
    console.log('Crear nueva consulta');
    navigate("/consulta")
  }

  const handleEliminar = (consultaId) => {
    console.log(`Eliminar consulta con ID: ${consultaId}`);
    setConsultaToDelete(consultaId)
    setShowConfirmDialog(true)
  }

  const confirmDelete = () => {
    console.log(`Confirmando eliminación de consulta ${consultaToDelete}`)
    setShowConfirmDialog(false)
    setConsultaToDelete(null)
  }

  const cancelDelete = () => {
    console.log('Cancelando eliminación');
    setShowConfirmDialog(false)
    setConsultaToDelete(null)
  }

  return (
    <div className="h-full flex flex-col items-center justify-start bg-teal-400">
      <div className="max-w-[1200px] w-full mx-4 px-14 py-4 bg-green-800 text-white rounded-lg mt-[200px]">
        <h2 className="text-xl font-semibold">Foro</h2>
      </div>

      <div className="w-full flex flex-col items-center p-14 space-y-14 bg-white rounded-lg shadow-md mx-4">
        {/* Static foro post */}
        <div className="w-full p-24 border-b border-gray-300 mb-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="bg-gray-200 rounded-full w-[30px] h-[30px] flex items-center justify-center font-bold">V</span>
              <span className="font-semibold text-black">Valentina Capra</span>
            </div>
            <span className="text-gray-600 text-sm">Dia 18/10</span>
          </div>
          <div className="mt-3 text-left">
            <p>Buenas tardes! Cuando tengo que usar el past simple?</p>
          </div>
          <div className="mt-5 flex justify-end space-x-3">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md font-medium" onClick={() => handleResponder(0)}>
              Responder
            </button>
            <button className="bg-green-800 text-white px-4 py-2 rounded-md font-medium" onClick={handleMasRespuestas}>
              +respuestas
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md" onClick={() => handleEliminar(0)}>
              eliminar
            </button>
          </div>
        </div>

        {/* Static example of forum posts */}
        <div className="w-full p-5 border-b border-gray-300 mb-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="bg-gray-200 rounded-full w-[30px] h-[30px] flex items-center justify-center font-bold">A</span>
              <span className="font-semibold text-black">Andrés Pérez</span>
            </div>
            <span className="text-gray-600 text-sm">Dia 20/10</span>
          </div>
          <div className="mt-3 text-left">
            <h3 className="text-xl font-semibold">Uso del present perfect</h3>
            <p>¿En qué situaciones se usa el present perfect? Agradecería si me pueden dar ejemplos.</p>
          </div>
          <div className="mt-5 flex justify-end space-x-3">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md" onClick={() => handleEliminar(1)}>
              eliminar
            </button>
          </div>
        </div>
      </div>

      <button className="fixed bottom-8 right-8 bg-teal-claro text-white px-6 py-3 rounded-full shadow-lg hover:opacity-90 z-50" onClick={handleNuevaConsulta}>
        + Nueva Consulta
      </button>

      {showConfirmDialog && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="text-lg">¿Estás seguro que deseas eliminar esta consulta?</p>
            <div className="mt-4 flex space-x-4">
              <button className="bg-green-800 text-white px-4 py-2 rounded-md font-medium" onClick={confirmDelete}>
                Aceptar
              </button>
              <button className="bg-green-800 text-white px-4 py-2 rounded-md font-medium" onClick={cancelDelete}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Foro
"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import logo from "../../componentes/logo/LogoInicio.png"
import { API_BASE_URL } from "../config/Api"

const MasRespuestas = () => {
  const navigate = useNavigate()
  const [Respuestas, setRespuestas] = useState([])
  const [consultas, setConsultas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [respuestaToDelete, setRespuestaToDelete] = useState(null)

  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Respuesta`)
        setRespuestas(response.data)
        setIsLoading(false)
      } catch (err) {
        setError("Error al cargar las Respuestas")
        setIsLoading(false)
      }
    }

    fetchRespuestas()
  }, [])

  const handleResponder = (consultaId) => {
    navigate("/respuesta", { state: { consultaId } })
  }

  const handleForo = () => {
    navigate("/Foro")
  }

  const handleEliminar = (respuestaId) => {
    setRespuestaToDelete(respuestaId)
    setShowConfirmDialog(true)
  }

  const confirmDelete = () => {
    // Aquí iría la lógica para eliminar la respuesta
    console.log(`Eliminando respuesta ${respuestaToDelete}`)
    setShowConfirmDialog(false)
    setRespuestaToDelete(null)
    // Después de eliminar, podrías actualizar el estado de las respuestas o recargar la página
  }

  const cancelDelete = () => {
    setShowConfirmDialog(false)
    setRespuestaToDelete(null)
  }

  return (
    <div className="p-4">
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center w-full h-24 bg-custom-teal shadow-lg rounded-b-[50px] z-50">
        <div className="flex items-center pl-2 bg-">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-20 h-auto" // Logo más pequeño
          />
        </div>
        <nav className="pr-8">
          <ul className="flex gap-5">
            <li><Link to="#" className="text-white text-lg">Profesores</Link></li>
            <li><Link to="#" className="text-white text-lg">Programa</Link></li>
            <li><Link to="#" className="text-white text-lg">Herramientas</Link></li>
          </ul>
        </nav>
      </header>

      <div className="mt-24 bg-teal-700 text-white p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-4 text-black">Más Respuestas</h2>
      </div>

      <div className="space-y-6">
        {/* Static foro post */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-teal-claro text-white rounded-full flex items-center justify-center font-bold">O</span>
              <span className="text-black">Oriana Acosta</span>
            </div>
            <span className="text-gray-600 text-sm">Dia 18/10</span>
          </div>
          <div className="mt-2">
            <p>
              Buenas tardes! El past simple se usa para acciones terminadas en el pasado, con un tiempo específico o
              implícito. Ejemplos: I went to the store (Fui a la tienda). Cualquier consulta me escriben.
            </p>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-orange-400">Responder</button>
            <button className="bg-gray-300 text-black px-4 py-2 rounded-full">Eliminar</button>
          </div>
        </div>

        {/* Dynamic foro posts */}
        {isLoading ? (
          <div>Cargando respuestas...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          Respuestas.map((respuesta) => (
            <div key={respuesta.Idrespuesta} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold">{respuesta.Titulo[0]}</span>
                  <span className="text-black">Usuario {respuesta.Idusuario}</span>
                </div>
                <span className="text-gray-600 text-sm">
                  {respuesta.Fechahora
                    ? new Date(respuesta.Fechahora).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" })
                    : "Fecha desconocida"}
                </span>
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-semibold">{respuesta.Titulo}</h3>
                <p>{respuesta.Contenido}</p>
              </div>
              <div className="mt-4 flex gap-3">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-full" onClick={() => handleResponder(0)}>Responder</button>
                <button className="bg-gray-300 text-black px-4 py-2 rounded-full" onClick={() => handleEliminar(0)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        className="fixed bottom-8 right-8 bg-teal-claro text-white px-6 py-3 rounded-full shadow-lg"
        onClick={handleForo}
      >
        Volver
      </button>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <p>¿Estás seguro que deseas eliminar esta respuesta?</p>
            <div className="mt-4 flex gap-4">
              <button className="bg-green-800 text-white px-4 py-2 rounded-full" onClick={confirmDelete}>Aceptar</button>
              <button className="bg-green-800 text-black px-4 py-2 rounded-full" onClick={cancelDelete}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MasRespuestas;
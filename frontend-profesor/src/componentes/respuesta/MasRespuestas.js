"use client"

import "./MasRespuestas.css"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import logo from "../../componentes/logo/LogoInicio.png"
import { API_BASE_URL } from "../config/Api"

const MasRespuestas = () => {
  const navigate = useNavigate()
  const [Respuestas, setRespuestas] = useState([])
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
    <div className="mas-masRespuestas">
      <header className="header">
        <img src={logo || "/placeholder.svg"} alt="Logo" className="logo-img" />
        <nav className="navigation">
          <ul>
            <li>
              <Link to="#">Profesores</Link>
            </li>
            <li>
              <Link to="#">Programa</Link>
            </li>
            <li>
              <Link to="#">Herramientas</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="respuestas-header">
        <h2>Más Respuestas</h2>
      </div>

      <div className="respuestas-content">
        {/* Static foro post */}
        <div className="respuestas-post">
          <div className="respuesta-header">
            <div className="user-info">
              <span className="user-initial">O</span>
              <span className="user-name">Oriana Acosta</span>
            </div>
            <span className="post-date">Dia 18/10</span>
          </div>
          <div className="post-content">
            <p>
              Buenas tardes! El past simple se usa para acciones terminadas en el pasado, con un tiempo específico o
              implícito. Ejemplos: I went to the store (Fui a la tienda). Cualquier consulta me escriben.
            </p>
          </div>
          <div className="post-actions">
            <button className="btn-responder" onClick={() => handleResponder(0)}>
              Responder
            </button>
            <button className="btn-eliminar" onClick={() => handleEliminar(0)}>
              Eliminar
            </button>
          </div>
        </div>

        {/* Dynamic foro posts */}
        {isLoading ? (
          <div>Cargando respuestas...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          Respuestas.map((respuesta) => (
            <div key={respuesta.Idrespuesta} className="foro-post">
              <div className="post-header">
                <div className="user-info">
                  <span className="user-initial">{respuesta.Titulo[0]}</span>
                  <span className="user-name">Usuario {respuesta.Idusuario}</span>
                </div>
                <span className="post-date">
                  {respuesta.Fechahora
                    ? new Date(respuesta.Fechahora).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" })
                    : "Fecha desconocida"}
                </span>
              </div>
              <div className="post-content">
                <h3>{respuesta.Titulo}</h3>
                <p>{respuesta.Contenido}</p>
              </div>
              <div className="post-actions">
                <button className="btn-responder" onClick={() => handleResponder(respuesta.Idrespuesta)}>
                  Responder
                </button>
                <button className="btn-eliminar" onClick={() => handleEliminar(respuesta.Idrespuesta)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="btn-nueva-consulta" onClick={handleForo}>
        Volver
      </button>

      {showConfirmDialog && (
        <div className="confirmarEliminar">
          <div className="confirmardialog">
            <p>¿Estás seguro que deseas eliminar esta respuesta?</p>
            <div className="confirm-buttons">
              <button className="confirm-Aceptar"onClick={confirmDelete}>Aceptar</button>
              <button className="confirm-Cancelar"onClick={cancelDelete}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MasRespuestas


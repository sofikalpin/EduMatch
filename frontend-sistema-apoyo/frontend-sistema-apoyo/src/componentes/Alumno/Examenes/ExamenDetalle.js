import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./examenDetalle.css";
import LogoInicio from "../../../logo/LogoInicio.png";
import chatIcon from "../Imagenes/chat.png";
import fileIcon from "../Imagenes/file-icon.png"; // Imagen para archivos

const ExamenDetalle = () => {
    const { id } = useParams(); // ID de la unidad
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const [examFile, setExamFile] = useState(null); // Archivo del examen para descarga
    const [examDate, setExamDate] = useState(null); // Fecha de entrega
    const [examTime, setExamTime] = useState(null); // Hora de entrega
    const [examDescription, setExamDescription] = useState(""); // Descripción dinámica del examen
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar el menú desplegable
    const youtubeInputRef = useRef(null);
    const driveInputRef = useRef(null);
    const uploadInputRef = useRef(null);

    const assignedExamenes = [
      { id: 1, title: "Cómo utilizar el pasado en conversaciones cotidianas", description: "Este examen cubre el uso del pasado en situaciones cotidianas." },
      { id: 2, title: "Claves para mejorar tu pronunciación en inglés", description: "Aquí aprenderás a mejorar tu pronunciación en inglés." },
      { id: 3, title: "Uso correcto de los verbos modales en inglés", description: "Este examen evalúa tu comprensión de los verbos modales." },
      { id: 4, title: "El presente perfecto en situaciones reales", description: "Aprende a usar el presente perfecto en conversaciones reales." },
      { id: 5, title: "Diferencias entre 'must' y 'have to'", description: "Este examen te ayudará a entender las diferencias entre 'must' y 'have to'." },
    ];

    useEffect(() => {
      // Obtener la descripción y otros detalles cuando el componente se monta
      const exam = assignedExamenes.find(exam => exam.id === parseInt(id));
      if (exam) {
        setExamDescription(exam.description); // Establecer la descripción
      }
      fetchScore();
      fetchExamFile();
    }, [id]);

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        setUploadProgress(0);
        simulateUpload();
      }
    };

    const simulateUpload = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setUploadProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 500);
    };

    const handleSubmit = async () => {
      if (file && uploadProgress === 100) {
        setSubmitted(true);
        setScore(null);
        await uploadStudentFile(file);
      }
    };

    const uploadStudentFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`API_URL/upload-student-file/${id}`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setExamDate(data.examDate);
        setExamTime(data.examTime);
        setScore(data.score);
      } catch (error) {
        console.error("Error al subir el archivo:", error);
      }
    };

    const downloadExam = async () => {
      try {
        const response = await fetch(`API_URL/download-exam/${id}`);
        const data = await response.blob();
        const url = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Examen_Unidad_${id}.pdf`;
        link.click();
      } catch (error) {
        console.error("Error al descargar el examen:", error);
      }
    };

    const fetchScore = async () => {
      try {
        const response = await fetch(`API_URL/get-score/${id}`);
        const data = await response.json();
        setScore(data.score);
      } catch (error) {
        console.error("Error al obtener la calificación:", error);
      }
    };

    const fetchExamFile = async () => {
      try {
        const response = await fetch(`API_URL/get-exam-file/${id}`);
        const data = await response.json();
        setExamFile(data.fileName);
      } catch (error) {
        console.error("Error al obtener el archivo del examen:", error);
      }
    };

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuOptionClick = (option) => {
      switch(option) {
        case "Mi perfil":
          navigate("/mi-perfil"); // Redirige a la página de perfil
          break;
        case "Cambiar de cuenta":
          // Lógica para cambiar de cuenta
          break;
        case "Salir":
          // Lógica para salir (cerrar sesión)
          break;
        default:
          break;
      }
      setIsMenuOpen(false); // Cierra el menú después de seleccionar una opción
    };

    return (
      <div className="container">
        <div className="header">
          <div className="nav-links">
            <img src={LogoInicio} alt="Logo" className="logo" />
            <a href="#inicio">INICIO</a>
            <a href="#mis-cursos">MIS CURSOS</a>
            <a href="#herramientas">PROFESORES</a>
          </div>
          <div className="user-info">
            <span>Maria A</span>
            <div className="user-avatar" onClick={toggleMenu}>M</div>
            <div className="chat-icon-container">
              <img src={chatIcon} alt="Chat" className="chat-icon" />
            </div>
            {isMenuOpen && (
              <div className="mini-container">
                <ul>
                  <li onClick={() => handleMenuOptionClick("Mi perfil")}>Mi perfil</li>
                  <li onClick={() => handleMenuOptionClick("Cambiar de cuenta")}>Cambiar de cuenta</li>
                  <li onClick={() => handleMenuOptionClick("Salir")}>Salir</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="content">
          <h1 className="title">Examen: Unidad {id}</h1>

          <div className="exam-description">
            <h3>Descripción del examen:</h3>
            <p>{examDescription}</p>
          </div>

          <div className="exam-container">
            <div className="upload-section">
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                disabled={submitted}
              />
              <button className="file-button" onClick={() => document.querySelector('input[type="file"]').click()}>
                {file ? "Cambiar archivo" : "Seleccionar archivo"}
              </button>

              {file && (
                <div className={`file-preview ${uploadProgress === 100 ? "uploaded" : ""}`}>
                  <img src={fileIcon} alt="Archivo" className="file-icon" />
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <div className="progress-bar-container">
                      <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
                        {uploadProgress}%
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={submitted || (!file && uploadProgress < 100)}
              >
                {submitted ? "Examen enviado" : file ? "Entregar examen" : "Seleccionar archivo"}
              </button>
            </div>

            <div className="exam-status">
              <p><strong>Fecha de entrega:</strong> {examDate || "Pendiente"}</p>
              <p><strong>Hora de entrega:</strong> {examTime || "Pendiente"}</p>
              <p><strong>Puntuación:</strong> {score !== null ? `${score}/100` : "Pendiente de corrección"}</p>

              <button onClick={downloadExam} disabled={!examFile}>
                {examFile ? "Descargar examen" : "Examen no disponible"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ExamenDetalle;

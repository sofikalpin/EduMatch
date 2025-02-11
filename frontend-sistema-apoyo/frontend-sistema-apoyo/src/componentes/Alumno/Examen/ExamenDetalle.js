import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LogoInicio from "../../../logo/LogoInicio.png";
import fileIcon from "../Imagenes/file-icon.png";
import Header from "../HeaderAlumno";
import Footer from "../FooterAlumno";

const ExamenDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [examFile, setExamFile] = useState(null);
  const [examDate, setExamDate] = useState(null);
  const [examTime, setExamTime] = useState(null);
  const [examDescription, setExamDescription] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchExamDetails();
  }, [id]);

  const fetchExamDetails = async () => {
    try {
      const response = await fetch(`https://your-api-url.com/get-exam-details/${id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setExamDescription(data.description);
      setScore(data.score);
      setExamFile(data.fileName);
      setExamDate(data.examDate);
      setExamTime(data.examTime);
    } catch (error) {
      console.error("Error al obtener detalles del examen:", error);
      alert("Error al cargar los detalles del examen. Por favor, inténtelo de nuevo.");
    }
  };

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
      await uploadStudentFile();
    }
  };

  const uploadStudentFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`https://your-api-url.com/upload-student-file/${id}`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setScore(data.score);
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      alert("Error al subir el archivo. Por favor, inténtelo de nuevo.");
    }
  };

  const handleDownload = () => {
    if (examFile) {
      window.open(`https://your-api-url.com/download-exam/${id}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />

      <div className="p-6 flex-grow">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-12">Examen: Unidad {id}</h1>

        <div className="bg-gray-50 rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-2xl font-semibold text-gray-700">Descripción del examen</h3>
          <p className="text-lg text-gray-600 mt-3">{examDescription}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={submitted}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg hover:bg-blue-700 transition duration-200"
          >
            {file ? "Cambiar archivo" : "Seleccionar archivo"}
          </button>

          {file && (
            <div className="flex items-center space-x-4 mt-6">
              <img src={fileIcon} alt="Archivo" className="w-12 h-12" />
              <div className="flex-1">
                <span className="block font-medium text-lg">{file.name}</span>
                <div className="bg-gray-200 rounded-lg h-2 mt-2">
                  <div
                    className="bg-blue-600 h-full rounded-lg"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={submitted || uploadProgress < 100}
            className="w-full bg-green-600 text-white py-3 rounded-md text-lg mt-6 hover:bg-green-700 transition duration-200"
          >
            {submitted ? "Examen enviado" : "Entregar examen"}
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg shadow-sm p-6">
          <p className="text-lg text-gray-700">
            <strong>Fecha de entrega:</strong> {examDate || "Pendiente"}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Hora de entrega:</strong> {examTime || "Pendiente"}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Puntuación:</strong> {score !== null ? `${score}/100` : "Pendiente de corrección"}
          </p>

          <button
            onClick={handleDownload}
            disabled={!examFile}
            className="w-full bg-gray-600 text-white py-3 rounded-md text-lg mt-6 hover:bg-gray-700 transition duration-200"
          >
            {examFile ? "Descargar examen" : "Examen no disponible"}
          </button>
        </div>
      </div>
      <div className="mt-32"></div>
                  <Footer />
    </div>
  );
};

export default ExamenDetalle;
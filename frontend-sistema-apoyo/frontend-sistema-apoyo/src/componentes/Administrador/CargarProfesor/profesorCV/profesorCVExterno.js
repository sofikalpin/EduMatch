import React, { useState } from 'react'; 
import { ArrowLeft, Eye, Download } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";

import { Mail, GraduationCap, Award, Briefcase } from 'lucide-react';
import Header from "../../HeaderAdministrador";
import Footer from "../../FooteraAdministrador";

const ProfesorCVExterno = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profesorData = location.state?.profesor;
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  if (!profesorData) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-lg text-gray-600">No se encontraron datos del profesor.</div>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePreviewCV = () => {
    if (profesorData.cvUrl) {
      setPreviewModalOpen(true);
    }
  };

  const handleDownloadCV = () => {
    if (profesorData.cvUrl) {
     
      const link = document.createElement('a');
      link.href = profesorData.cvUrl;
      link.download = `CV_${profesorData.nombreCompleto.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      <Header />
      <div className="flex items-center justify-start w-full mt-4 mb-0 px-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver</span>
        </button>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <GraduationCap size={48} className="text-green-600" />
                </div>
              </div>
              
              <div className="md:ml-8 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800">
                  {profesorData.nombreCompleto}
                </h2>
                <p className="text-lg text-green-600 font-medium mt-1">
                  Profesor de {profesorData.especialidad}
                </p>
              </div>
            </div>

   
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Correo Electrónico</p>
                  <p className="text-gray-700">{profesorData.correo}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <Briefcase className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Especialidad</p>
                  <p className="text-gray-700">{profesorData.especialidad}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <Award className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Nivel</p>
                  <p className="text-gray-700">{profesorData.nivel}</p>
                </div>
              </div>
            </div>

           
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {profesorData.cvUrl ? (
                <>
                  <button
                    onClick={handlePreviewCV}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Visualizar CV
                  </button>
                  <button
                    onClick={handleDownloadCV}
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Descargar CV
                  </button>
                </>
              ) : (
                <span className="text-gray-500 italic">CV: no disponible</span>
              )}
            </div>

     
            <div className="mt-8 text-center text-sm text-gray-600">
              Información obtenida de: <a href="https://www.jellyjobs.com" className="text-green-600 hover:underline">JellyJobs</a>
            </div>
          </div>
        </div>
      </main>

    
      {previewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-lg font-semibold">CV de {profesorData.nombreCompleto}</h3>
              <button 
                onClick={() => setPreviewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Cerrar</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 h-screen max-h-[80vh]">
              <iframe
                src={`${profesorData.cvUrl}#toolbar=0&navpanes=0`}
                className="w-full h-full"
                title={`CV de ${profesorData.nombreCompleto}`}
              />
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={handleDownloadCV}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProfesorCVExterno;
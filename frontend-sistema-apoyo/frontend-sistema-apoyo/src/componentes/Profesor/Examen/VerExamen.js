import React from "react";
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";

const VerExamen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { examenUrl } = location.state || {};

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <button
                onClick={() => navigate(-1)}
                className="absolute left-0 -ml-2 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
                <ArrowLeft className="w-6 h-6" />
                <span>Volver</span>
            </button>

            <h1 className="text-2xl font-bold mb-4 text-center"> Examen </h1>

            {examenUrl ? (
                <iframe
                    src={`${examenUrl}?embedded=true`}
                    width="100%"
                    height="800"
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-lg shadow-md"
                >
                    Cargando…
                </iframe>
            ) : (
                <p className="text-center text-gray-600">No se ha encontrado un examen válido.</p>
            )}
        </div>
    );
};

export default VerExamen;
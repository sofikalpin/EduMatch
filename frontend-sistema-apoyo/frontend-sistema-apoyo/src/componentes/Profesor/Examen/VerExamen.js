import React from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const VerExamen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { examenUrl } = location.state || {};

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">

            <button
                onClick={() => navigate(-1)}
                className="fixed top-5 left-5 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium bg-white p-2 rounded-lg shadow-md"
            >
                <ArrowLeft className="w-6 h-6" />
                <span>Volver</span>
            </button>

            <div className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Examen</h1>

                {examenUrl ? (
                    <iframe
                        src={`${examenUrl}?embedded=true`}
                        width="100%"
                        height="600"
                        frameBorder="0"
                        allowFullScreen
                        className="rounded-lg shadow-md w-full"
                    >
                        Cargando…
                    </iframe>
                ) : (
                    <p className="text-center text-gray-600">No se ha encontrado un examen válido.</p>
                )}
            </div>
        </div>
    );
};

export default VerExamen;
import React, { useEffect, useState } from "react";
import TablaProfesoresExterno from "./tablaProfesAutorizar/tablaProfesorAExterno.js";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Header from "../HeaderAdministrador.js";
import Footer from "../FooteraAdministrador.js";
import JellyJobs from "./imagen/JellyJobs.png";
import { useNavigate } from "react-router-dom";

const ProfesorInitialsCircle = ({ initials }) => (
    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
        {initials}
    </div>
);

const CargarProfesorExterno = () => {
    const [profesoresIngles, setProfesoresIngles] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState("");

    const navigate = useNavigate();

    const getInitials = (name) => {
        if (!name) return "";
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    const handleDeleteProfesor = async (idbolsa) => {
       
        try {
            if (!idbolsa) {
                throw new Error("ID de bolsa no válido");
            }
    
            if (window.confirm("¿Estás seguro de que deseas rechazar este profesor?")) {
                const response = await axios.delete(`http://localhost:5228/api/Bolsatrabajo/EliminarBolsa?id=${idbolsa}`);
                if (response.status === 200) {
                    setProfesoresIngles((prevProfesores) =>
                        prevProfesores.filter((profesor) => profesor.idbolsa !== idbolsa)
                    );
                    setMensaje("Profesor rechazado con éxito.");
                    setTimeout(() => setMensaje(""), 2000);
                } else {
                    throw new Error("Error al eliminar el profesor");
                }
            }
        } catch (error) {
            console.error("Error al rechazar al profesor:", error);
            setError("Ocurrió un error al rechazar el profesor. Por favor, intenta nuevamente.");
            setTimeout(() => setError(""), 3000);
        }
    };
    

    const handleAutorizarProfesor = async (idbolsa) => {
        try {
            if (!idbolsa) {
                throw new Error("ID de bolsa no válido");
            }

            if (window.confirm("¿Estás seguro de que deseas autorizar este profesor?")) {
                const response = await axios.put(`http://localhost:5228/API/AdministradorProfesor/AutorizarProfesor?id=${idbolsa}`);
                
                if (response.status === 200) {
                    setProfesoresIngles((prevProfesores) => 
                        prevProfesores.filter((profesor) => profesor.idbolsa !== idbolsa)
                    );
                    
                    setMensaje("Profesor autorizado con éxito.");
                    setTimeout(() => setMensaje(""), 2000);
                } else {
                    throw new Error("Error al autorizar el profesor");
                }
            }
        } catch (error) {
            console.error("Error al autorizar al profesor:", error);
            setError("Ocurrió un error al autorizar el profesor. Por favor, intenta nuevamente.");
            setTimeout(() => setError(""), 3000);
        }
    };

    const mapNivelToId = (nivelString) => {
        if (!nivelString) return 0;
        
        const niveles = {
            "A1": 1,
            "A2": 2,
            "B1": 3,
            "B2": 4,
            "C1": 5,
            "C2": 6
        };
        const nivelCode = nivelString.split(":")[0].trim();
        return niveles[nivelCode] || 0;
    };

    useEffect(() => {
        const fetchProfesores = async () => {
            setLoading(true);
            setError("");
            
            try {
                const response = await axios.get("http://localhost:5228/api/Bolsatrabajo/ingles");
                console.log("Datos recibidos de la API:", response.data);

                if (Array.isArray(response.data)) {
                    const datosLimpios = response.data.map((profesor) => ({
                        key: profesor.idbolsa,
                        idbolsa: profesor.idbolsa,
                        idusuario: profesor.idusuario,
                        nombreCompleto: profesor.nombreCompleto || "Sin nombre",
                        initials: getInitials(profesor.nombreCompleto),
                        correo: profesor.correo || "Sin correo",
                        profesion: profesor.profesion || "No especificado",
                        nivel: profesor.nivel || "No disponible",
                        idnivel: mapNivelToId(profesor.nivel),
                        cvUrl: profesor.cvUrl || "",
                        nameDisplay: (
                            <div className="flex items-center gap-3">
                                <ProfesorInitialsCircle 
                                    initials={getInitials(profesor.nombreCompleto)} 
                                />
                                <span className="font-medium">
                                    {profesor.nombreCompleto || "Sin nombre"}
                                </span>
                            </div>
                        )
                    }));
                    
                    setProfesoresIngles(datosLimpios);
                } else {
                    throw new Error("El formato de la respuesta no es válido");
                }
            } catch (error) {
                console.error("Error al cargar profesores:", error);
                setError("Error al cargar la lista de profesores. Por favor, intente nuevamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfesores();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
            <Header />

            <div className="flex-grow flex flex-col items-center justify-center px-5 py-10">
                {/* Back Button */}
                <div className="flex items-center justify-start w-full mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-6 h-6" />
                        <span>Volver</span>
                    </button>
                </div>

                {/* Title and Logo */}
                <div className="flex flex-col items-center w-full mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Profesores de Inglés
                    </h1>
                    <img 
                        src={JellyJobs} 
                        alt="Logo" 
                        className="w-30 h-30 mb-4" 
                    />
                </div>

                {/* Messages */}
                {mensaje && (
                    <div className="text-green-600 text-center mb-4 p-2 bg-green-50 rounded">
                        {mensaje}
                    </div>
                )}
                {error && (
                    <div className="text-red-600 text-center mb-4 p-2 bg-red-50 rounded">
                        {error}
                    </div>
                )}
                
                {/* Content */}
                {loading ? (
                    <div className="text-center text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mx-auto mb-2"></div>
                        Cargando...
                    </div>
                ) : (
                    <TablaProfesoresExterno 
                        data={profesoresIngles}
                        onDelete={handleDeleteProfesor}
                        onAutorizar={handleAutorizarProfesor}
                    />
                )}
            </div>

            <Footer />
        </div>
    );
};

export default CargarProfesorExterno;
import React, { useEffect, useState } from "react";
import TablaProfesoresExterno from "./TablaProfesAutorizar/TablaProfesorAExterno.js";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Header from "../HeaderAdministrador.js";
import Footer from "../FooteraAdministrador.js";
import JellyJobs from "./Imagen/JellyJobs.png";
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
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    const handleDeleteProfesor = (idbolsa) => {
       
        console.log(" Lista actual de profesores antes de eliminar:", profesoresIngles);
        if (window.confirm("¿Estás seguro de que deseas rechazar este profesor?")) {
            const profesorExistente = profesoresIngles.find(profesor => profesor.idbolsa === idbolsa);
            
            if (!profesorExistente) {
                console.warn(" Profesor no encontrado en la lista.");
                alert("Este profesor no se encuentra en la lista.");
                return;
            }
    
            console.log(` Profesor encontrado con IDbolsa: ${idbolsa}, procediendo a eliminar...`);
    
            axios.delete(`http://localhost:5228/api/Bolsatrabajo/EliminarBolsa?id=${idbolsa}`)
                .then(() => {
                    setProfesoresIngles((prevProfesores) => 
                        prevProfesores.filter((profesor) => profesor.idbolsa !== idbolsa)
                    ); 
                    setMensaje("Profesor rechazado con éxito.");
                    setTimeout(() => setMensaje(""), 2000);
                }) 
                .catch((error) => {
                    console.error(" Error al rechazar al profesor: ", error);
                    alert("Ocurrió un error al rechazar el profesor. Por favor, intenta nuevamente.");
                });
        }
    };
    
    
    
    const handleAutorizarProfesor = (idusuario) => {
        if (window.confirm("¿Estás seguro de que deseas autorizar este profesor?")) {
            axios.put(`http://localhost:5228/API/AdministradorProfesor/AutorizarProfesor?id=${idusuario}`)
                .then(() => {
                    setProfesoresIngles((prevProfesores) => 
                        prevProfesores.filter((profesor) => profesor.idusuario !== idusuario)
                    );
                    setMensaje("Profesor autorizado con éxito.");
                    setTimeout(() => setMensaje(""), 2000);
                })
                .catch((error) => {
                    console.error("Error al autorizar al profesor: ", error);
                    alert("Ocurrió un error al autorizar el profesor. Por favor, intenta nuevamente.");
                });
        }
    };
    

    const mapNivelToId = (nivelString) => {
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
            try {
                const response = await axios.get("http://localhost:5228/api/Bolsatrabajo/ingles");

                console.log("Datos recibidos de la API:", response.data);

                if (Array.isArray(response.data)) {
                    const datosLimpios = response.data.map((profesor, index) => ({
                        key: profesor.idbolsa,
                        idbolsa: profesor.idbolsa,
                        idusuario: profesor.idusuario,
                        nombreCompleto: profesor.nombreCompleto,
                        initials: getInitials(profesor.nombreCompleto),
                        correo: profesor.correo,
                        especialidad: profesor.especildad || "No especificado",
                        nivel: profesor.nivel || "No disponible",
                        idnivel: mapNivelToId(profesor.nivel || ""),
                        cvUrl: profesor.cvUrl || "",
                        nameDisplay: (
                            <div className="flex items-center gap-3">
                                <ProfesorInitialsCircle initials={getInitials(profesor.nombreCompleto)} />
                                <span className="font-medium">{profesor.nombreCompleto}</span>
                            </div>
                        )
                    }));
                    
                    setProfesoresIngles(datosLimpios);
                } else {
                    console.error("Error en el formato de la respuesta:", response.data);
                    setError("No se pudo cargar la lista de profesores.");
                }
            } catch (error) {
                console.error("Error al conectar con el servidor:", error);
                setError("Error al conectar con el servidor.");
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
                <div className="flex items-center justify-start w-full mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-6 h-6" />
                        <span>Volver</span>
                    </button>
                </div>

                <div className="flex flex-col items-center w-full mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Profesores de Inglés</h1>
                    <img src={JellyJobs} alt="Logo" className="w-30 h-30 mb-4" />
                </div>

                {mensaje && <div className="text-green-600 text-center mb-4">{mensaje}</div>}
                {error && <div className="text-red-600 text-center mb-4">{error}</div>}
                
                {loading ? (
                    <div className="text-center text-gray-500">Cargando...</div>
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
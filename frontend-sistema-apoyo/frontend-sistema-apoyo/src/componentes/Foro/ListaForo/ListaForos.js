import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, ChevronRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeaderForo from "../HeaderForo";
import FooterForo from "../FooterForo";
import { useUser } from "../../../Context/UserContext";

const ListarForos = () => {
    const { user } = useUser();
    const [foros, setForos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [nivelSeleccionado, setNivelSeleccionado] = useState("");

    const navigate = useNavigate();

    const nivelColores = {
        "1": "bg-green-200 text-green-800",
        "2": "bg-blue-200 text-blue-800",
        "3": "bg-yellow-200 text-yellow-800",
        "4": "bg-orange-200 text-orange-800",
        "5": "bg-red-200 text-red-800",
        "6": "bg-purple-200 text-purple-800",
    }

    const niveles = {
        "1": "A1: Principiante",
        "2": "A2: Básico",
        "3": "B1: Pre-intermedio",
        "4": "B2: Intermedio",
        "5": "C1: Intermedio-alto",
        "6": "C2: Avanzado",
    }

    useEffect(() => {
        const cargarForos = async () => {
            try {
                setLoading(true);
                setError("");
                const respuesta = await axios.get("http://localhost:5228/API/Foro/ListarForos");
                console.log("Foros obtenidos: ", respuesta.data.value);
                setForos(respuesta.data.value);
            } catch (error) {
                console.error("Error al obtener los datos del foro: ", error);
                setError("No se pudo cargar la lista de foros.");
            } finally {
                setLoading(false);
            }
        };

        cargarForos();
    }, []);

    const handleNuevoForo = () => {
        if (user.idrol === 1){
            navigate("/crear-foro");
        }else{
            alert("Los alumnos no tienen permitidos crear foros.")
        }
    }

    const foroNivel = foros.filter(
        (foro) => nivelSeleccionado === "" || (foro.idnivel && foro.idnivel.toString() === nivelSeleccionado)
    );

    if (loading) return <p className="text-center text-gray-500">Cargando foros...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col">

            <HeaderForo/>

            <main className="flex-grow w-full max-w-5xl px-6 py-10 mx-auto">

                <button
                    onClick={() => navigate(-1)} 
                    className="mb-4 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                    <ArrowLeft className="w-6 h-6" />
                    <span>Volver</span>
                </button>

                <div className="mb-6 flex items-center gap-4">
                    <label htmlFor="nivel-select" className="text-lg font-semibold text-gray-700">
                        Filtrar por nivel:
                    </label>
                    <select
                        id="nivel-select"
                        value={nivelSeleccionado}
                        onChange={(e) => setNivelSeleccionado(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-lg w-60"
                    >
                        <option value="">Todos los niveles</option>
                        {Object.entries(niveles).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleNuevoForo}
                        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full transition focus:outline-none focus:ring focus:ring-teal-400"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Nuevo Foro</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {foroNivel.length > 0 ? (
                        foroNivel.map((foro, index) => (
                            <div 
                                key={foro.idForo || `foro-${index}`} 
                                className="p-6 border rounded-lg shadow-md bg-white flex justify-between items-center w-full max-w-5xl mx-auto"
                            >
                                <span
                                    className={`px-3 py-1 text-sm font-semibold rounded-full ${nivelColores[foro.idnivel?.toString()] || "bg-gray-300 text-gray-700"}`}
                                >
                                    {niveles[foro.idnivel?.toString()] || "Desconocido"}    
                                </span>
                                <div className="flex-1 ml-6">
                                    <h2 className="text-lg font-semibold text-gray-800">{foro.nombre}</h2>
                                    <p className="text-gray-600 text-sm">{foro.descripcion}</p>
                                </div>
                                <button 
                                    onClick={() => navigate("/foro", { state: { foro }})} 
                                    className="text-teal-600 hover:text-teal-800"
                                    aria-label={`Ver foro ${foro.nombre}`}
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No hay foros disponibles para este nivel.</p>
                    )}
                </div>
            </main>        
            
            < FooterForo />
        </div>

    );
};

export default ListarForos;

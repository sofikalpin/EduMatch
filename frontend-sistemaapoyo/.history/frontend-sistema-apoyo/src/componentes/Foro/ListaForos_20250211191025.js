import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, ChevronRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../logo/LogoInicio.png";

const ListarForos = () => {
    const [foros, setForos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [nivelSeleccionado, setNivelSeleccionado] = useState("");

    const navigate = useNavigate();

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

    const handleNuevoForo = () => navigate("/crear-foro");

    const foroNivel = foros.filter(
        (foro) => nivelSeleccionado === "" || (foro.idnivel && foro.idnivel.toString() === nivelSeleccionado)
    );

    if (loading) return <p className="text-center text-gray-500">Cargando foros...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
            {/* Header con el logo */}
            <header className="flex items-center px-6 py-4 shadow-md bg-white">
                <img src={logo} alt="Logo" className="h-12 w-auto" />
                <h1 className="text-2xl font-bold text-gray-900 flex-1 text-center">Foros</h1>
            </header>

            <div className="max-w-4xl mx-auto px-4 pt-6">
                {/* Botón de volver */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                    <ArrowLeft className="w-6 h-6" />
                    <span>Volver</span>
                </button>

                {/* Filtro por nivel */}
                <div className="mb-4 flex items-center gap-4">
                    <label htmlFor="nivel-select" className="text-sm font-medium text-gray-700">
                        Filtrar por nivel:
                    </label>
                    <select
                        id="nivel-select"
                        value={nivelSeleccionado}
                        onChange={(e) => setNivelSeleccionado(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-48"
                    >
                        <option value="">Todos los niveles</option>
                        <option value="1">A1: Principiante</option>
                        <option value="2">A2: Básico</option>
                        <option value="3">B1: Pre-intermedio</option>
                        <option value="4">B2: Intermedio</option>
                        <option value="5">C1: Intermedio-alto</option>
                        <option value="6">C2: Avanzado</option>
                    </select>
                </div>

                {/* Botón de Nuevo Foro */}
                <div className="mb-8 flex justify-end">
                    <button
                        onClick={handleNuevoForo}
                        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full transition"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Nuevo Foro</span>
                    </button>
                </div>

                {/* Lista de Foros */}
                <ul className="space-y-4">
                    {foroNivel.length > 0 ? (
                        foroNivel.map((foro, index) => (
                            <li key={foro.idForo || `foro-${index}`} className="flex items-center justify-between p-4 border-b">
                                <span className="text-gray-800">
                                    <strong>{foro.nombre}</strong><br />{foro.descripcion}
                                </span>
                                <button onClick={() => navigate(`/foros/${foro.idForo}`)} className="text-teal-600 hover:text-teal-800">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No hay foros para este nivel.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ListarForos;

import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, MessageSquare, Trash2, ChevronRight } from "lucide-react";
import logo from "../../logo/LogoInicio.png";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

const socialIcons = [
    { name: 'Facebook', color: 'hover:text-blue-500' },
    { name: 'Instagram', color: 'hover:text-pink-500' },
    { name: 'Twitter', color: 'hover:text-blue-400' },
    { name: 'Youtube', color: 'hover:text-red-500' },
    { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const ListarForos = () => {
    const [foros, setForos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [nivelSeleccionado, setNivelSeleccionado] = useState("")
  
    const navigate = useNavigate(); // Usamos useNavigate en lugar de onNavigate

    const handleNuevoForo = () => {
      navigate("/crear-foro");
    }

    const handleNivelSeleccionado = (e) => {
      setNivelSeleccionado(e.target.value);
    }

    const foroNivel = foros.filter(
      (foro) =>
        nivelSeleccionado === "" || (foro.idnivel && foro.idnivel.toString() === nivelSeleccionado)
    );
    

    const isDataValid = foroNivel.length > 0;
  
    useEffect(() => {
      const cargarForos = async() => {
        try{
            setLoading(true);
            setError("");
            const respuesta = await axios.get('http://localhost:5228/API/Foro/ListarForos'); 
            console.log("Foros obtenidos: ", respuesta.data.value);
            setForos(respuesta.data.value);
        }catch (error) {
            console.error("Error al obtener los datos del foro: ", error)
            setError("No se pudo cargar la lista de foros.")
        } finally {
            setLoading(false);
        }
      };
  
      cargarForos();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Cargando foros...</p>;
    }
    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
        >
        <ArrowLeft className="w-6 h-6" />
        <span>Volver</span>
        </button>

        <div className="mb-4">
          <label htmlFor="nivel-select" className="block text-sm font-medium text-gray-700">
            Filtrar por nivel:
          </label>
            <select
              id="nivel-select"
              value={nivelSeleccionado}
              onChange={handleNivelSeleccionado}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
  
        <main className="max-w-4xl mx-auto px-4 pt-24 pb-32">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Foros</h1>
            <button
              onClick={handleNuevoForo}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Nuevo Foro</span>
            </button>
          </div>
  
            <div className="space-y-6">
              <ul className="space-y-4">
                { isDataValid ? (
                  foroNivel.map((foro, index) => (
                  <li key={foro.idForo || `foro-${index}`} className="flex items-center justify-between p-4 border-b">
                      <span className="text-gray-800">
                          <strong>{foro.nombre}</strong><br/>{foro.descripcion}
                      </span>
                      <button onClick={() => navigate(`/foros/${foro.idForo}`)} className="text-teal-600 hover:text-teal-800">
                          <ChevronRight className="w-5 h-5" />
                      </button>
                  </li>
                ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                        No hay filtros con ese nivel
                    </td>
                  </tr>
                )}
              </ul>
            </div>

        </main>   
      </div>
    );
  };
  
  export default ListarForos;
  

import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import { useUser } from "../../../Context/UserContext.js";
import HeaderForo from '../HeaderForo.js';

const NuevoForo = () => {
    const { user } = useUser();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [nivel, setNivel] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate(); 

    const niveles = {
        A1: 1,
        A2: 2,
        B1: 3,
        B2: 4,
        C1: 5,
        C2: 6,
    };

    const idusuario = user?.idusuario;
    const nivelProfesor = user?.idnivel; 

    const nivelesInferiores = Object.keys(niveles).filter(nivelKey => niveles[nivelKey] <= nivelProfesor);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        
        if (!nombre || !descripcion || !nivel) {
            setMensaje("Todos los campos son obligatorios.");
            setLoading(false);
            return;
        }

        if (nombre.length < 5) {
            setMensaje("El nombre debe tener al menos 5 caracteres.");
            setLoading(false);
            return;
        }
          
        if (descripcion.length < 10) {
            setMensaje("La descripción debe tener al menos 10 caracteres.");
            setLoading(false);
            return;
        }
        
        try {
            const nivelId = niveles[nivel];
  
            const datosForo = {
                idforo: 0,
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                idnivel: nivelId,
                idusuario: idusuario,
            };
  
            console.log("Datos del foro:", datosForo);
  
            const response = await axios.post("http://localhost:5228/API/Foro/CrearForo", datosForo);

            if (response?.status === 200) {
                setMensaje("Foro creado con éxito. Redirigiendo...");
                setTimeout(() => navigate("/listaForos"), 2000);
                setNombre("");
                setDescripcion("");
                setNivel("");
            } else {
                setMensaje(response?.data?.msg || "No se pudo crear el foro.");
            }

        } catch (error) {
            console.error("Error al registrar el foro:", error);
            setMensaje("Ocurrió un error al registrar el foro. Por favor, intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };    

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            <HeaderForo />

            <div className="w-full max-w-3xl px-6 py-10">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition font-medium mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Volver a la lista de foros</span>
                </button>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Nuevo Foro</h2>

                    {mensaje && <p className="text-center text-red-500">{mensaje}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="titulo" className="text-lg font-semibold text-gray-800">
                                Nombre
                            </label>
                            <input 
                                id="titulo"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-sm bg-white"
                                placeholder="Escribe un nombre descriptivo"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="descripcion" className="text-lg font-semibold text-gray-800">
                                Descripcion
                            </label>
                            <input 
                                id="descripcion"
                                type="text"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-sm bg-white"
                                placeholder="Escribe una descripcion descriptiva"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="nivel" className="text-lg font-semibold text-gray-800">
                                Nivel
                            </label>
                            <select 
                                id="nivel"
                                value={nivel}
                                onChange={(e) => setNivel(e.target.value)}
                                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-teal-500 focus:border-teal-500 text-gray-900 shadow-sm bg-white"
                            >
                                <option value="" disabled>Seleccione un nivel</option>
                                {nivelesInferiores.includes("A1") && <option value="A1">A1: Principiante</option>}
                                {nivelesInferiores.includes("A2") && <option value="A2">A2: Básico</option>}
                                {nivelesInferiores.includes("B1") && <option value="B1">B1: Pre-intermedio</option>}
                                {nivelesInferiores.includes("B2") && <option value="B2">B2: Intermedio</option>}
                                {nivelesInferiores.includes("C1") && <option value="C1">C1: Intermedio-alto</option>}
                                {nivelesInferiores.includes("C2") && <option value="C2">C2: Avanzado</option>}
                            </select>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-3 shadow-md transition-all duration-300"
                        >
                            <Send className="w-6 h-6" />
                            {loading ? "Publicando..." : "Publicar Foro"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NuevoForo;

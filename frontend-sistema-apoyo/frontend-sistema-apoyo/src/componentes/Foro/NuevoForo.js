import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import logo from '../../logo/LogoInicio.png';
import axios from "axios";
import { useUser } from "../../context/userContext.js";

const socialIcons = [
  { name: 'Facebook', color: 'hover:text-blue-500' },
  { name: 'Instagram', color: 'hover:text-pink-500' },
  { name: 'Twitter', color: 'hover:text-blue-400' },
  { name: 'Youtube', color: 'hover:text-red-500' },
  { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const NuevoForo = () => {
    const { user } = useUser();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [nivel, setNivel] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    const niveles = {
        A1: 1,
        A2: 2,
        B1: 3,
        B2: 4,
        C1: 5,
        C2: 6,
    };

    const idusuario = user?.idUsuario;

    const handleSubmit = async(e) => {
        e.preventDefault();

        setLoading(true);
        
        if ( !nombre || !descripcion || !nivel){
            alert("Todos los campos son obligatorios");
            setLoading(false);
            return;
        }

        if (nombre.length < 5) {
            setMensaje({ tipo: "error", texto: "El nombre debe tener al menos 5 caracteres." });
            setLoading(false);
            return;
        }
          
        if (descripcion.length < 10) {
            setMensaje({ tipo: "error", texto: "La descripción debe tener al menos 10 caracteres." });
            setLoading(false);
            return;
        }
        
  
        try {
            const nivelId = niveles[nivel];
  
            const datosForo = {
                idforo: 0 ,
                nombre:  nombre.trim(),
                descripcion: descripcion.trim(),
                idnivel: nivelId, // Convertir nivel a entero
                idusuario: idusuario,
            };
  
            console.log("Datos del foro:", datosForo);
  
            const response = await axios.post(
                "http://localhost:5228/API/Foro/CrearForo",
                datosForo
            );

            console.log("Foro creado");
  
            if (response?.status === 200)
                {
                setMensaje("Foro creado con éxito. Redirigiendo...");
                setTimeout(() => navigate("/foros"), 2000);
                setNombre("");
                setDescripcion("");
                setNivel("");
            }
            else{
              alert(response?.data?.msg || "No se pudo crear el foro.");
            }

        }catch (error){

            console.error("Error al registrar el foro:", error);
            alert("Ocurrió un error al registrar el foro. Por favor, intenta nuevamente.");

        }finally{

            setLoading(false);
        }
    };    

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50">
             <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="h-12 w-auto cursor-pointer" 
                    onClick={() => navigate(-1)} // Redirigir a la página anterior
                />
            </header>

        <div className="flex-grow flex flex-col items-center justify-center p-6 mb-16">
            <button 
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium self-start mt-3"
            >
            <ArrowLeft className="w-6 h-6" />
            <span>Volver a la lista de foros</span>
            </button>

            <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Nuevo Foro</h2>

            {mensaje && <p className="text-center text-red-500">{mensaje}</p>}

            <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6">
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
                        <option value="A1">A1: Principiante</option>
                        <option value="A2">A2: Básico</option>
                        <option value="B1">B1: Pre-intermedio</option>
                        <option value="B2">B2: Intermedio</option>
                        <option value="C1">C1: Intermedio-alto</option>
                        <option value="C2">C2: Avanzado</option>
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
    );
};

export default NuevoForo;
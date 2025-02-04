import React, { useEffect, useState } from 'react';
import logo from '../../logo/LogoInicio.png';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import chatIcon from "../chatAdmin/chatIcons/chatIcon.png";

const socialIcons = [
    { name: 'Facebook', color: 'hover:text-blue-500' },
    { name: 'Instagram', color: 'hover:text-pink-500' },
    { name: 'Twitter', color: 'hover:text-blue-400' },
    { name: 'Youtube', color: 'hover:text-red-500' },
    { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const Administrador = () => {
    const [cantidadA, setCantidadA] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const iniciales = (name) => {
        if (!name) return "";
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();
    };

    const cantAutorizar = async () => {
        try {
            const response = await axios.get("http://localhost:5228/API/AdministradorProfesor/ListaProfesoresNOAutorizados");
            setCantidadA(response.data.value.length); 
        } catch (error) {
            console.error("Error al obtener profesores no autorizados", error);
            setCantidadA(0);
        }
    };

    useEffect(() => {
        cantAutorizar();
    }, []); 

    const rutaPrincipal = location.pathname === "/administrador";

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {rutaPrincipal && (
                <header className="bg-white shadow-md">
                    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                        <img src={logo} alt="Logo" className="h-10" />
                        
                        <nav className="flex items-center space-x-4">
                            <Link 
                                to="/administrador/listaProfesores" 
                                className="text-gray-700 hover:text-blue-600 transition duration-300"
                            >
                                Profesores
                            </Link>
                            <Link 
                                to="/administrador/listaAlumnos" 
                                className="text-gray-700 hover:text-blue-600 transition duration-300"
                            >
                                Alumnos
                            </Link>
                            
                            <div className="flex items-center space-x-3">
                                <Link to="/administrador/chatAdmin" className="hover:bg-gray-100 p-2 rounded-full">
                                    <img 
                                        src={chatIcon} 
                                        alt="Chat" 
                                        className="w-6 h-6"
                                    />
                                </Link>
                                <button 
                                    onClick={() => navigate("/perfil")}
                                    className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-blue-600 transition"
                                >
                                    {iniciales("Administrador 1")}
                                </button>
                            </div>
                        </nav>
                    </div>
                </header>
            )}

            {rutaPrincipal && (
                <div className="flex flex-col items-center mt-8 px-4">
                    <section className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800">Edu-Match</h1>
                        <h1 className="text-2xl text-gray-700">Administrador</h1>
                    </section>

                    <div className="w-full max-w-md mt-6">
                        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
                            <span className="text-sm font-semibold">Autorizar Profesor</span>
                            
                            {cantidadA > 0 && (
                                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                    {cantidadA}
                                </span>
                            )}
                            
                            <button
                                onClick={() => navigate("/administrador/cargarProfesor")}
                                className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2L10.59 3.41 18.17 11H2v2h16.17l-7.58 7.59L12 22l10-10z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main className="flex-grow flex justify-center mt-6 px-4">
                <div className="w-full max-w-4xl">
                    <Outlet />
                </div>
            </main>

            <footer className="bg-gray-200 py-4 mt-8">
                <div className="container mx-auto px-4 flex justify-center space-x-6">
                    {socialIcons.map((icon) => (
                        <a 
                            key={icon.name} 
                            href="#" 
                            className={`text-gray-600 ${icon.color} transition duration-300`}
                        >
                            {icon.name}
                        </a>
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default Administrador;
import React, { useEffect, useState } from 'react';
import logo from '../../logo/LogoInicio.png';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './HeaderAdministrador';
import Footer from '../Administrador/FooteraAdministrador';

const socialIcons = [
    { name: 'Facebook', color: 'hover:text-blue-500' },
    { name: 'Instagram', color: 'hover:text-pink-500' },
    { name: 'Twitter', color: 'hover:text-blue-400' },
    { name: 'Youtube', color: 'hover:text-red-500' },
    { name: 'Linkedin', color: 'hover:text-blue-700' }
];

const AutorizarProfesor = ({ cantidad, onNavigate }) => (
    <div className="mt-4 p-4 bg-white shadow-md rounded-lg flex items-center justify-between">
        <span className="text-sm font-semibold">Autorizar Profesor</span>
        {cantidad > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">{cantidad}</span>
        )}
        <button
            className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700"
            onClick={() => onNavigate('/administrador/cargarProfesor')}
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
);

const Administrador = () => {
    const [cantidadA, setCantidadA] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const cargarProfesoresNoAutorizados = async () => {
        try {
            const response = await axios.get('http://localhost:5228/API/AdministradorProfesor/ListaProfesoresNOAutorizados');
            setCantidadA(response.data?.value?.length || 0);
        } catch (error) {
            console.error('Error al obtener la cantidad de profesores no autorizados', error);
            setCantidadA(0);
        }
    };

    useEffect(() => {
        cargarProfesoresNoAutorizados();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header onNavigate={navigate} logo={logo} />

            {location.pathname === '/administrador' && (
                <div className="flex flex-col items-center mt-6 px-4">
                    <section className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800">Edu-Match</h1>
                        <h1 className="text-2xl text-gray-700">Administrador</h1>
                    </section>

                    <div className="w-full max-w-md mt-6">
                        <AutorizarProfesor cantidad={cantidadA} onNavigate={navigate} />
                    </div>
                </div>
            )}

            <main className="flex-grow flex justify-center mt-6 px-4">
                <div className="w-full max-w-4xl">
                    <Outlet />
                </div>
            </main>
            <div className="mb-20"></div>
            <Footer socialIcons={socialIcons} className="w-full" />
        </div>
    );
};

export default Administrador;
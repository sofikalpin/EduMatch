import React, { useEffect, useState } from 'react';
import logo from '../../logo/LogoInicio.png';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './HeaderAdministrador';
import Footer from './FooterAdministrador';

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

    useEffect(() => {
        const cargarProfesoresNoAutorizados = async () => {
            try {
                const response = await axios.get('http://localhost:5228/API/AdministradorProfesor/ListaProfesoresNOAutorizados');
                setCantidadA(response.data?.value?.length || 0);
            } catch (error) {
                console.error('Error al obtener la cantidad de profesores no autorizados', error);
                setCantidadA(0);
            }
        };
        cargarProfesoresNoAutorizados();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header onNavigate={navigate} logo={logo} />

            <div className="flex-grow flex flex-col items-center">
                {location.pathname === '/administrador' && (
                    <section className="text-center mt-8">
                        <h1 className="text-3xl font-bold text-gray-800">Edu-Match</h1>
                        <h1 className="text-2xl text-gray-700">Administrador</h1>
                    </section>
                )}

                <main className="w-full max-w-4xl mt-6 flex-grow">
                    <Outlet />
                </main>
            </div>

            <Footer socialIcons={socialIcons} className="mt-auto" />
        </div>
    );
};

export default Administrador;

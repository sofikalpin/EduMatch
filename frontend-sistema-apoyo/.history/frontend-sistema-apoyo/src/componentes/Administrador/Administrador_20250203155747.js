import React, { useEffect, useState } from 'react';
import logo from '../../logo/LogoInicio.png';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
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

    const cargarProfesorDireccion = () => {
        navigate('/administrador/cargarProfesor');
    };

    const iniciales = (name) => {
        if (!name) return '';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    const cantAutorizar = async () => {
        try {
            const response = await axios.get('http://localhost:5228/API/AdministradorProfesor/ListaProfesoresNOAutorizados');
            setCantidadA(response.data.value.length);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        cantAutorizar();
    }, []);

    const rutaPrincipal = location.pathname === '/administrador';

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {rutaPrincipal && (
                <>
                    
                    <section className="text-center mt-8">
                        <h1 className="text-3xl font-bold text-gray-800">Edu-Match</h1>
                        <h1 className="text-2xl text-gray-700">Administrador</h1>
                    </section>

                    <div className="mt-6 p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
                        <span className="text-lg font-semibold">Autorizar Profesor</span>
                        {cantidadA > 0 && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">{cantidadA}</span>
                        )}
                        <button
                            className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700"
                            onClick={cargarProfesorDireccion}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2L10.59 3.41 18.17 11H2v2h16.17l-7.58 7.59L12 22l10-10z" />
                            </svg>
                        </button>
                    </div>
                </>
            )}
            <main className="w-full max-w-4xl mt-6">
                <Outlet />
            </main>
        </div>
    );
};

export default Administrador;
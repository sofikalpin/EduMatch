import React, {useEffect, useState} from 'react';
import './administrador.css'; 
import logo from '../../../logo/LogoInicio.png';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import chatIcon from "../chatAdmin/chatIcons/chatIcon.png";

const Administrador = () => {
    const [cantidadA , setCantidadA] = useState(0)
    const navigate = useNavigate();
    const location = useLocation();
    
    const cargarProfesorDireccion = () => {
        navigate("/administrador/cargarProfesor");
    };

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
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        cantAutorizar();
    }, []); 

    const rutaPrincipal = location.pathname === "/administrador";
    
    return (
        <div className="inicio-container">
            { rutaPrincipal && (
            <>
                <header className="Header-inicio">
                    <img src={logo} alt="Logo" className="logo-img" />
                    <nav className="navigation">
                        <ul className='nav-links'>
                            <li className='listaP-link'><Link to="/administrador/listaProfesores">Profesores</Link></li>
                            <li className='listaA-link'><Link to="/administrador/listaAlumnos">Alumnos</Link></li>
                        </ul>
                        <div className="profile-chat-container">
                            <Link to="/administrador/chatAdmin" className="chat-link">
                                <img src={chatIcon} className='icono-chat'/>
                            </Link>
                            <button className="avatar-perfil" onClick={() => navigate("/perfil")}>
                                {iniciales("Administrador 1")}
                            </button>
                        </div>
                    </nav>
                    <div className="auth-buttons">
                    </div>
                </header>

                    <section className="intro-top">
                        <h1>Edu-Match</h1>
                        <h1>Administrador</h1>
                    </section>

                    <div className="cargar-Profesor">
                        <span className="texto-boton">Autorizar Profesor</span>
                            
                        {cantidadA > 0 && (
                            <span className={`cantidad-icono ${cantidadA > 0 ? "" : "hidden"}`}>{cantidadA}</span>
                        )}

                        <button className="icono" onClick={cargarProfesorDireccion}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="white"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2L10.59 3.41 18.17 11H2v2h16.17l-7.58 7.59L12 22l10-10z" />
                            </svg>
                        </button>
                    </div>
                </>
            )}
            <main>
                <Outlet />
            </main>

        </div>
    );
};

export default Administrador;
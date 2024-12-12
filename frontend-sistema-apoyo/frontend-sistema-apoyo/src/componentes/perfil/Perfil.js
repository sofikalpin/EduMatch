import React, { useState } from "react";
import './Perfil.css'; 

export const Perfil = () => {
    const [usuario, setUsuario] = useState(''); 
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');

    const handleGuardarCambios = (e) => {
        e.preventDefault();
       
        console.log('Cambios guardados:', { usuario, nombre, apellido, email });
    };

    return (
        <div className="contenedor-perfil">
            <h2>Configurar Perfil</h2>
            <form onSubmit={handleGuardarCambios} className="perfil-form">
                <label htmlFor="usuario" className="titulo-form">Usuario</label>
                <input
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    type="text"
                    id="usuario"
                    name="usuario"
                    className="perfil-input"
                />

                <label htmlFor="nombre" className="titulo-form">Nombre</label>
                <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="perfil-input"
                />

                <label htmlFor="apellido" className="titulo-form">Apellido</label>
                <input
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    type="text"
                    id="apellido"
                    name="apellido"
                    className="perfil-input"
                />

                <label htmlFor="email" className="titulo-form">Correo electrónico</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    className="perfil-input"
                />

                <button type="submit" className="boton-guardar">Guardar Cambios</button>
            </form>
        </div>
    );
};

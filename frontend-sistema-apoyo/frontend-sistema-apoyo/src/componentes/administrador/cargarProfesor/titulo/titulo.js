import React from "react";
import "./titulo.css";
import logo from "../../../../logo/LogoInicio.png";

const titulo = ({cantidad}) => {
    return (
        <div className="titulo-contenedor">
            <img src={logo} alt="Logo" className="logo-img" />
            <div className="titulo-textos">
                <h1 className="titulo-nombre">Autorizar Profesores</h1>
                <p className="titulo-contador">
                    Solicitudes de autorizacion: <span className="contador">{cantidad}</span>
                </p>
            </div>
        </div>
    );
};

export default titulo;
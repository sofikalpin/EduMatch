import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Inicio from "./componentes/inicio/Inicio";
import Login from "./componentes/login/Login";
import { Registrar } from "./componentes/registrar/Registrar";
import Perfil from "./componentes/perfil/Perfil";

import InicioProfesor from "./componentes/inicio/profesorini"; 
import NivelInicial from "./componentes/inicio/NivelInicial";
import NivelIntermedio from "./componentes/inicio/NivelIntermedio";
import NivelAvanzado from "./componentes/inicio/NivelAvanzado";
import Informacion from "./componentes/inicio/Informacion";


// Componente para proteger rutas basadas en rol
const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");

  if (userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/iniciarsesion" element={<Login />} />
        <Route path="/registrarse" element={<Registrar />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/inicioprofesor" element={<InicioProfesor />} />
        <Route path="/nivelinicial" element={<NivelInicial />} />
        <Route path="/nivelintermedio" element={<NivelIntermedio />} />
        <Route path="/nivelavanzado" element={<NivelAvanzado />} />
        <Route path="/info" element={<NivelAvanzado />} />



        {/* Rutas protegidas */}

        {/* Redirigir rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

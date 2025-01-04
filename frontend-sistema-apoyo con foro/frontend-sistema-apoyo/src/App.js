import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Importar componentes existentes
import Inicio from "./componentes/inicio/Inicio";
import Login from "./componentes/login/Login";
import { Registrar } from "./componentes/registrar/Registrar";
import { Perfil } from "./componentes/perfil/Perfil";
import InicioProfesor from "./componentes/profesor/homeprofe/inicioprofesor";
import MisAlumnos from "./componentes/profesor/homeprofe/misalumnos";
import MisCursos from "./componentes/profesor/homeprofe/miscursos";

// Importar nuevos componentes
import Foro from "./componentes/Foro/Foro";
import Consulta from "./componentes/Consulta/Consulta";
import Respuesta from "./componentes/Respuesta/Respuesta";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrarse" element={<Registrar />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* Rutas para profesores */}
        <Route path="/profesor/inicio" element={<InicioProfesor />} />
        <Route path="/profesor/miscursos" element={<MisCursos />} />
        <Route path="/profesor/misalumnos" element={<MisAlumnos />} />

        {/* Nuevas rutas para Foro, Consulta y Respuesta */}
        <Route path="/Foro" element={<Foro />} />
        <Route path="/Consulta" element={<Consulta />} />
        <Route path="/Respuesta" element={<Respuesta />} />

        {/* Redirigir rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

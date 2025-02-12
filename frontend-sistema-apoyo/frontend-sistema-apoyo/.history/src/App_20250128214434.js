import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Importar los componentes
import Inicio from "./componentes/inicio/Inicio/Inicio";
import Login from "./componentes/login/Login";
import { Registrar } from "./componentes/registrar/Registrar";
import Perfil from "./componentes/perfil/Perfil";
import InicioProfesor from "./componentes/inicio/profesorini"; 
import NivelInicial from "./componentes/inicio/NivelInicial";
import NivelIntermedio from "./componentes/inicio/NivelIntermedio";
import NivelAvanzado from "./componentes/inicio/NivelAvanzado";
import Informacion from "./componentes/inicio/Informacion/Informacion";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/iniciarsesion" element={<Login />} />
        <Route path="/registrarse" element={<Registrar />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/informacion" element={<Informacion />} />

        {/* Rutas protegidas */}
        <Route path="/inicioprofesor" element={<InicioProfesor />} />
        <Route path="/nivelinicial" element={<NivelInicial />} />
        <Route path="/nivelintermedio" element={<NivelIntermedio />} />
        <Route path="/nivelavanzado" element={<NivelAvanzado />} />

        {/* Redirigir rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

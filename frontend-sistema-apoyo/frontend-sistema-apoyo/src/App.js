import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Inicio from "./componentes/inicio/Inicio";
import Login from "./componentes/login/Login"; // Verifica que este archivo exista y esté en esta ruta
import { Registrar } from "./componentes/registrar/Registrar"; 
import { Perfil } from "./componentes/perfil/Perfil"; 
import InicioProfesor from "./componentes/Profesor/InicioProfesor";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} /> {/* Asegúrate de usar "/" en las rutas */}
        <Route path="/registrarse" element={<Registrar />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/inicioProfesor" element={<InicioProfesor />} />
      </Routes>
    </div>
  );
}

export default App;

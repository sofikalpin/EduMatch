import React from "react";
import './App.css';

import Inicio from './componentes/inicio/Inicio'; // Si Inicio usa export default
import Login from "./componentes/login/Login";
import { Routes, Route } from "react-router-dom";
import { Registrar } from "./componentes/registrar/Registrar"; // Si Registrar usa export named
import { Perfil } from "./componentes/perfil/Perfil"; // Si Perfil usa export named

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="login" element={<Login />} />
        <Route path="registrarse" element={<Registrar />} />
        <Route path="perfil" element={<Perfil />} />
      </Routes>
    </div>
  );
}

export default App;

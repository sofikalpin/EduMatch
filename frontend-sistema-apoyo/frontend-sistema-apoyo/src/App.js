import React, {useState} from "react";
import './App.css';

import Inicio  from './componentes/inicio/Inicio';
import { Login } from "./componentes/login/Login";
import { Routes, Route } from "react-router-dom";
import { Registrar } from "./componentes/registrar/Registrar"; 
import { Perfil } from "./componentes/perfil/Perfil";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="login" element={<Login />} />
        <Route path="registrarse" element={<Registrar />} />
        <Route path="perfil" element={<Perfil />} />
      </Routes>
    </div>
  );
}

export default App;

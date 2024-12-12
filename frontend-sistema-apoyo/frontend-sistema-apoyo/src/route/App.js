import React from "react";
import './App.css';

import Inicio from './componentes/inicio/Inicio';
import { Login } from "./componentes/login/Login";
import { Registrar } from "./componentes/registrar/Registrar"; 
import { Perfil } from "./componentes/perfil/Perfil";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MenuProfesor from '../Pajes/MenuProfe';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="login" element={<Login />} />
          <Route path="registrarse" element={<Registrar />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="MenuProfesor" element={<MenuProfesor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

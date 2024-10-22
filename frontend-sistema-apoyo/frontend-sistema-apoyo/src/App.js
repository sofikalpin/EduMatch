import React, {useState} from "react";
import './App.css';

import Inicio  from './componentes/inicio/Inicio';
import { Login } from "./componentes/login/Login";
import { Routes, Route } from "react-router-dom";
import { Registrar } from "./componentes/registrar/Registrar";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="login" element={<Login />} />
        <Route path="registrarse" element={<Registrar />} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Inicio from "./componentes/inicio/Inicio";
import Login from "./componentes/login/Login";
import { Registrar } from "./componentes/registrar/Registrar";
import { Perfil } from "./componentes/perfil/Perfil";
import InicioProfesor from "./componentes/profesor/homeprofe/inicioprofesor";
import MisAlumnos from "./componentes/profesor/homeprofe/misalumnos";
import MisCursos from "./componentes/profesor/homeprofe/miscursos";
import InicioAdministrador from "./componentes/administrador/sesionIniciada/administrador.js";
import CargarProfesor from "./componentes/administrador/cargarProfesor/cargarProfesor.js";
import ListaProfesores from "./componentes/administrador/profesores/listaProfesores.js";
import ListaAlumnos from "./componentes/administrador/alumnos/listaAlumnos.js";
import ProfesorCV  from "./componentes/profesorCV/profesorCV.js";
import NuevoAlumno from "./componentes/administrador/alumnos/nuevoAlumno/nuevoAlumno.js";
import NuevoProfesor from "./componentes/administrador/profesores/nuevoProfesor/nuevoProfesor.js";
import EditarAlumno from "./componentes/administrador/alumnos/editAlumno/editAlumno.js";
import EditarProfesor from "./componentes/administrador/profesores/editProfesor/editProfesor.js"
import ChatAdmin from "./componentes/administrador/chatAdmin/chatAdmin.js";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrarse" element={<Registrar />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* Rutas para profesores (sin restricción de rol) */}
        <Route path="/profesor/inicio" element={<InicioProfesor />} />
        <Route path="/profesor/miscursos" element={<MisCursos />} />
        <Route path="/profesor/misalumnos" element={<MisAlumnos />} />

        {/* Redirigir rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />

        
        
        {/* Rutas para Administrador */}
        <Route path="/administrador" element={<InicioAdministrador />}>

          {/* Autorizar Profesores */}
          <Route path="cargarProfesor" element={<CargarProfesor />} />

          {/* Control de Profesores */}
          <Route path="listaProfesores" element={<ListaProfesores />} />
          <Route path="listaProfesores/nuevoProfesor" element={<NuevoProfesor />} />
          <Route path="listaProfesores/editarProfesor" element={<EditarProfesor />} />

          {/* Control de Alumnos */}
          <Route path="listaAlumnos" element={<ListaAlumnos />} />
          <Route path="listaAlumnos/nuevoAlumno" element={<NuevoAlumno />} />
          <Route path="listaAlumnos/editarAlumno" element={<EditarAlumno />} />

          {/* Chat del Administrador */}
          <Route path="chatAdmin" element={<ChatAdmin />} />
        </Route>

        {/* Visualizar CV de Profesor */}
        <Route path="/profesorCV" element={<ProfesorCV />} />

      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Importar los componentes
import Inicio from "./componentes/inicio/Inicio/Inicio";
import Login from "./componentes/login/Login";
import { Registrar } from "./componentes/registrar/Registrar";
import Perfil from "./componentes/perfil/Perfil";
import InicioProfesor from "./componentes/inicio/Profesores/profesorini"; 
import NivelInicial from "./componentes/inicio/Programas/NivelInicial";
import NivelIntermedio from "./componentes/inicio/Programas/NivelIntermedio";
import NivelAvanzado from "./componentes/inicio/Programas/NivelAvanzado";
import Informacion from "./componentes/inicio/Informacion/Informacion";
import Chats from "./componentes/chats/chat.js";
import Administrador from "./componentes/administrador/sesionIniciada/administrador.js";
import CargarProfesor from "./componentes/administrador/cargarProfesor/cargarProfesor.js";
import ListaProfesores from "./componentes/administrador/profesores/listaProfesores.js";
import NuevoProfesor from "./componentes/administrador/profesores/nuevoProfesor/nuevoProfesor.js";
import EditarProfesor from "./componentes/administrador/profesores/editProfesor/editProfesor.js";
import ListaAlumnos from "./componentes/administrador/alumnos/listaAlumnos.js";
import NuevoAlumno from "./componentes/administrador/alumnos/nuevoAlumno/nuevoAlumno.js";
import EditarAlumno from "./componentes/administrador/alumnos/editAlumno/editAlumno.js";
import ChatAdmin from "./componentes/administrador/chatAdmin/chatAdmin.js";
import ProfesorCV from "./componentes/profesorCV/profesorCV.js";

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

        {/*Chat*/}
        <Route path="/chats" element={<Chats/>} />

        {/* Rutas para Administrador */}
        <Route path="/administrador" element={<Administrador />}>

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
        
        {/* CV del profesor */}
        <Route path="/profesorCV" element={<ProfesorCV />} />

      </Routes>
    </div>
  );
}

export default App;

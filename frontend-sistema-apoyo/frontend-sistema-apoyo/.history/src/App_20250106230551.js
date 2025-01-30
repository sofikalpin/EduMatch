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

// Componente para proteger rutas basadas en rol
const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role"); // Asegúrate de que el rol esté guardado en localStorage o en un estado global

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
        <Route path="/login" element={<Login />} />
        <Route path="/registrarse" element={<Registrar />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* Rutas para profesores, protegidas por rol */}
        <Route
          path="/profesor/inicio"
          element={
            <ProtectedRoute role="profesor">
              <InicioProfesor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profesor/miscursos"
          element={
            <ProtectedRoute role="profesor">
              <MisCursos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profesor/misalumnos"
          element={
            <ProtectedRoute role="profesor">
              <MisAlumnos />
            </ProtectedRoute>
          }
        />

        {/* Redirigir rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Importar los componentes
//Iniciar Sesion - Registrarse
import Login from "./componentes/login/Login";
import { Registrar } from "./componentes/registrar/Registrar";
//Inicio
import Inicio from "./componentes/inicio/Inicio/Inicio";
import InicioProfesor from "./componentes/inicio/Profesores/profesorini"; 
import NivelInicial from "./componentes/inicio/Programas/NivelInicial";
import NivelIntermedio from "./componentes/inicio/Programas/NivelIntermedio";
import NivelAvanzado from "./componentes/inicio/Programas/NivelAvanzado";
import Informacion from "./componentes/inicio/Informacion/Informacion";
import ResetPassword from "./componentes/inicio/Inicio/NuevaContra";


//Administrador
import Administrador from "./componentes/Administrador/Administrador";
import ListaProfesores from "./componentes/Administrador/Profesores/listaProfesores";
import NuevoProfesor from "./componentes/Administrador/Profesores/NuevoProfesor/nuevoProfesor";
import EditarProfesor from "./componentes/Administrador/Profesores/EditarProfesor/editProfeso";
import CargarProfesor from "./componentes/Administrador/CargarProfesor/cargarProfesor";
import ListaAlumnos from "./componentes/Administrador/Alumnos/listaAlumnos";
import NuevoAlumno from "./componentes/Administrador/Alumnos/nuevoAlumno/NuevoAlumno";
import EditarAlumno from "./componentes/Administrador/Alumnos/editAlumno/editAlumno";
import PerfilAdministrador from "./componentes/Administrador/PerfilAdministrador";
import ChatAdmin from "./componentes/Administrador/chatAdmin/chatAdmin";

//Profesor
import Perfil from "./componentes/Profesor/PerfilProfesor";

//Alumnos


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
        <Route path="/contra" element={<ResetPassword />} />
     
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/administrador/listaProfesores" element={<ListaProfesores />} />
        <Route path="/administrador/listaProfesores/nuevoProfesor" element={<NuevoProfesor />} />
        <Route path="/administrador/editarProfesor" element={<EditarProfesor />} />
        <Route path="/administrador/cargarProfesor" element={<CargarProfesor />} />
        <Route path="/administrador/listaAlumnos" element={<ListaAlumnos />} />
        <Route path="/administrador/listaAlumnos/nuevoAlumno" element={<NuevoAlumno />} />
        <Route path="/administrador/editarAlumno" element={<EditarAlumno />} /> 
        <Route path="/administrador/perfilAdministrador" element={<PerfilAdministrador />} />
        <Route path="/administrador/chatAdmin" element={<ChatAdmin />} />
        

        {/* Redirigir rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

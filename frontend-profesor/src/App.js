import React from "react";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import "./App.css";
import './styles/tailwind.css';  // Asegúrate de que la ruta sea correcta

// Importamos los componentes de las páginas
import Inicio from "./componentes/profesor/home/Inicio";
import Alumnos from "./componentes/profesor/home/Alumnos";
import Cursos from "./componentes/profesor/home/Cursos";
import CursoDetalles from "./componentes/profesor/home/DetalleCurso";

// Importar los componentes para las secciones de Actividad, Artículos, Examen y Foro
import Actividad from "./componentes/profesor/Actividad";
import Articulos from "./componentes/profesor/Articulo";
import Examen from "./componentes/profesor/Examen";
import CrearActividad from "./componentes/profesor/CrearActividad";
import CrearExamen from "./componentes/profesor/CrearExamen";
import CrearArticulo from "./componentes/profesor/CrearArticulo";

//Importar los componentes para el foro
import Foro from "./componentes/foro/Foro";
import Consulta from "./componentes/consulta/Consulta";
import Respuesta from "./componentes/respuesta/Respuesta";
import MasRespuestas from "./componentes/respuesta/MasRespuestas";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/profesor/inicio" element={<Inicio />} />
        <Route path="/profesor/cursos" element={<Cursos />} />
        <Route path="/profesor/alumnos" element={<Alumnos />} />
        
        {/* Separate routes for each section */}
        <Route path="/profesor/cursos/:id/actividad" element={<Actividad />} />
        <Route path="/profesor/cursos/:id/articulos" element={<Articulos />} />
        <Route path="/profesor/cursos/:id/examen" element={<Examen />} />
        <Route path="/profesor/cursos/:id/foro" element={<Foro />} />
  
        <Route path="/profesor/cursos/:id" element={<CursoDetalles />} />

        <Route path="/crear-actividad" element={<CrearActividad />} />
        <Route path="/crear-articulo" element={<CrearArticulo />} />
        <Route path="/crear-examen" element={<CrearExamen />} />

        <Route path="/foro" element={<Foro />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="/respuesta" element={<Respuesta />} />
        <Route path="/masrespuestas" element={<MasRespuestas />} />
        
        {/*Redirigir rutas no encontradas*/}
        <Route path="*" element={<Navigate to="/profesor/inicio" />} />
      </Routes>
    </div>
  );
}

export default App;


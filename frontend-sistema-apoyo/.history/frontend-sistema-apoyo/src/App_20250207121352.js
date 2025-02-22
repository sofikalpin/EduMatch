import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Importar los componentes
// Iniciar Sesion - Registrarse
import Login from "./componentes/login/Login";
import { Registrar } from "./componentes/registrar/Registrar";

// Inicio
import Inicio from "./componentes/inicio/Inicio/Inicio";
import InicioProfesor from "./componentes/inicio/Profesores/profesorini"; 
import NivelInicial from "./componentes/inicio/Programas/NivelInicial";
import NivelIntermedio from "./componentes/inicio/Programas/NivelIntermedio";
import NivelAvanzado from "./componentes/inicio/Programas/NivelAvanzado";
import Informacion from "./componentes/inicio/Informacion/Informacion";
import ResetPassword from "./componentes/inicio/Inicio/NuevaContra";

// Administrador
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

// Profesor
import AlumnosProfesor from "./componentes/Profesor/Alumnos/MisAlumnos";
import InicioProfesorPage from "./componentes/Profesor/InicioProfesor"; // Renombrado aquí
import CursosProfesor from "./componentes/Profesor/Cursos/MisCursos";
import CursoDetalle from "./componentes/Profesor/Cursos/DetalleCurso";
import ActividadProfesor from "./componentes/Profesor/Actividad/Actividad";
import ArticuloProfesor from "./componentes/Profesor/Articulo/Articulo";
import ExamenProfesor from "./componentes/Profesor/Examen/Examen";
import CrearActividad from "./componentes/Profesor/Actividad/CrearActividad";
import CrearArticulo from "./componentes/Profesor/Articulo/CrearArticulo";
import CrearExamen from "./componentes/Profesor/Examen/CrearExamen";
import PerfilProfesor from "./componentes/Profesor/PerfilProfesor";
import ChatProfesor from "./componentes/Profesor/ChatProfesor/chat";

//Foro
//import ListaForoProfesor from "./componentes/Profesor/ForoProfesor/ListaForos";
//import ForoProfesor from "./componentes/Profesor/ForoProfesor/Foro";
//import NuevoForo from "./componentes/Profesor/ForoProfesor/NuevoForo";
//import Consulta from "./componentes/Profesor/ForoProfesor/Consulta";
//import NuevaConsulta from "./componentes/Profesor/ForoProfesor/NuevaConsulta";
//import Respuesta from "./componentes/Profesor/ForoProfesor/Respuesta";
//import NuevaRespuesta from "./componentes/Profesor/ForoProfesor/NuevaRespuesta";

import ListaForos from "./componentes/Foro/ListaForos";
import Foro from "./componentes/Foro/Foro";
import NuevoForo from "./componentes/Foro/NuevoForo";
import Consulta from "./componentes/Foro/Consulta";
import NuevaConsulta from "./componentes/Foro/NuevaConsulta";
import Respuesta from "./componentes/Foro/Respuesta";
import NuevaRespuesta from "./componentes/Foro/NuevaRespuesta";


//Alumno
import MisCursosAlumno from "./componentes/Alumno/Cursos/MisCursos";
import CursoAlumno from "./componentes/Alumno/Cursos/Cursos";
import ArticulosAlumno from "./componentes/Alumno/Articulo/Articulos";
import ActividadesAlumno from "./componentes/Alumno/Actividad/Actividades";
import ExamenAlumno from "./componentes/Alumno/Examen/Examenes";
import ArticuloDetalleAlumno from "./componentes/Alumno/Articulo/articuloDetalle";
import ActividadDetalleAlumno from "./componentes/Alumno/Actividad/actividadDetalle";
import ExamenDetalleAlumno from "./componentes/Alumno/Examen/ExamenDetalle";
import PerfilAlumno from "./componentes/Alumno/PerfilAlumno";



function App() {
  return (
    <div className="App">
      <Routes>
        {/* Iniciar Sesión - Registrarse */}
        <Route path="/iniciarsesion" element={<Login />} />
        <Route path="/registrarse" element={<Registrar />} />

        {/* Inicio */}
        <Route path="/" element={<Inicio />} />
        <Route path="/informacion" element={<Informacion />} />
        <Route path="/inicioprofesor" element={<InicioProfesor />} />
        <Route path="/nivelinicial" element={<NivelInicial />} />
        <Route path="/nivelintermedio" element={<NivelIntermedio />} />
        <Route path="/nivelavanzado" element={<NivelAvanzado />} />
        <Route path="/contra" element={<ResetPassword />} />

        {/* Administrador */}
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

        {/* Profesor */}
        <Route path="/profesor" element={<InicioProfesorPage />} />
        <Route path="/profesor/alumnos" element={<AlumnosProfesor />} />
        <Route path="/profesor/cursos" element={<CursosProfesor />} />
        <Route path="/profesor/cursos/detalle/:id" element={<CursoDetalle />} />
        <Route path="/profesor/cursos/detalle/:id/actividad" element={<ActividadProfesor />} />
        <Route path="/profesor/cursos/detalle/:id/articulos" element={<ArticuloProfesor />} />
        <Route path="/profesor/cursos/detalle/:id/examen" element={<ExamenProfesor />} />
        {/*
        
        <Route path="/profesor/cursos/detalle/:id/foros" element={<ListaForoProfesor />} />
        <Route path="/profesor/cursos/detalle/:id/foros/:idForo" element={<ForoProfesor />} />
        <Route path="/profesor/cursos/detalle/:id/foros/:idForo/:idConsulta" element={<Consulta />} />
        <Route path="/crear-foro" element={<NuevoForo />} />
        <Route path="/crear-consulta/:idForo" element={<NuevaConsulta />} />
        <Route path="/crear-respuesta/:idConsulta" element={<NuevaRespuesta />} />
        <Route path="/profesor/consulta" element={<Consulta />} />
        <Route path="/profesor/respuesta" element={<Respuesta />} />

        */}


        <Route path="/crear-actividad" element={<CrearActividad />} />
        <Route path="/crear-articulo" element={<CrearArticulo />} />
        <Route path="/crear-examen" element={<CrearExamen />} />
        <Route path="/profesor/chat" element={<ChatProfesor />} />
        <Route path="/profesor/perfil" element={<PerfilProfesor />} />


        {/* Foro */}
        <Route path="/listaForos" element={<ListaForos/>} />
        <Route path="/listaForos/:idForo" element={<Foro/>} />
        <Route path="/listaForos/:idForo/:idConsulta" element={<Consulta/>}/>
        <Route path="/listaForos/:idForo/:idConsulta/:idRespuesta" element={<Respuesta/>} />

        <Route path="/crear-foro" element={<NuevoForo />} />
        <Route path="/crear-consulta/:idForo" element={<NuevaConsulta />} />
        <Route path="/crear-respuesta/:idConsulta" element={<NuevaRespuesta />} />
        
         {/* Alumno */}
        <Route path="/alumno" element={<MisCursosAlumno />} />  
        <Route path="/alumno/cursos" element={<CursoAlumno />} />
        <Route path="/alumno/articulos" element={<ArticulosAlumno />} />
        <Route path="/alumno/actividades" element={<ActividadesAlumno />} />
        <Route path="/alumno/examen" element={<ExamenAlumno />} />
        <Route path="/alumno/articulos/:id" element={<ArticuloDetalleAlumno />} />

        <Route path="/alumno/actividades/:id" element={<ActividadDetalleAlumno />} />
       <Route path="/alumno/examen/:id" element={<ExamenDetalleAlumno />} />
        <Route path="/alumno/perfil" element={<PerfilAlumno />} />


        {/* Redirigir rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

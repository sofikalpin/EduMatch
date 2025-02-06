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

import ListaForoProfesor from "./componentes/Profesor/ForoProfesor/ListaForos";
import ForoProfesor from "./componentes/Profesor/ForoProfesor/Foro";
import NuevoForo from "./componentes/Profesor/ForoProfesor/NuevoForo";
import Consulta from "./componentes/Profesor/ForoProfesor/Consulta";

import PerfilProfesor from "./componentes/Profesor/PerfilProfesor";
import NuevaConsulta from "./componentes/Profesor/ForoProfesor/NuevaConsulta";
import Respuesta from "./componentes/Profesor/ForoProfesor/Respuesta";
import NuevaRespuesta from "./componentes/Profesor/ForoProfesor/NuevaRespuesta";
import ChatProfesor from "./componentes/Profesor/ChatProfesor/chat";

// Alumno
import MisCursos from "./componentes/Alumno/Miscursos/Miscursos";
import Cursos from "./componentes/Alumno/Cursos/Cursos"; 
import Articulos from "./componentes/Alumno/Articulos/Articulos";
import Actividades from "./componentes/Alumno/Actividades/Actividades";
import Examenes from "./componentes/Alumno/Examenes/Examenes"; 


import ArticuloDetalle from "./componentes/Alumno//Articulos/ArticuloDetalle";
import ActividadDetalle from './componentes/Alumno/Actividades/ActividadDetalle';
import ExamenDetalle from './componentes/Alumno/Examenes/ExamenDetalle';


import Foros from "./componentes/Alumno/ForoAlumno/Foros"; // Ajustado la ruta según la ubicación correcta del archivo
import Nuevaconsulta  from "./componentes/Alumno/ForoAlumno/NuevaConsulta";
import RespuestaAlu from "./componentes/Alumno/ForoAlumno/Respuesta";

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
        <Route path="/profesor/cursos/detalle/:id/foros" element={<ListaForoProfesor />} />
        <Route path="/profesor/cursos/detalle/:id/foros/:idForo" element={<ForoProfesor />} />
        <Route path="/profesor/cursos/detalle/:id/foros/:idForo/:idConsulta" element={<Consulta />} />

        <Route path="/crear-foro" element={<NuevoForo />} />
        <Route path="/crear-consulta/:idForo" element={<NuevaConsulta />} />
        <Route path="/crear-respuesta/:idConsulta" element={<NuevaRespuesta />} />
        <Route path="/crear-actividad" element={<CrearActividad />} />
        <Route path="/crear-articulo" element={<CrearArticulo />} />
        <Route path="/crear-examen" element={<CrearExamen />} />
        <Route path="/profesor/consulta" element={<Consulta />} />
        <Route path="/profesor/respuesta" element={<Respuesta />} />
        <Route path="/profesor/chat" element={<ChatProfesor />} />
        <Route path="/profesor/perfil" element={<PerfilProfesor />} />

        {/* Alumno */}
        <Route path="/alumno/" element={<MisCursos />} />
        <Route path="/alumno/cursos" element={<Cursos />} />
        <Route path="/alumno/articulos" element={<Articulos />} />
        <Route path="/alumno/actividades" element={<Actividades />} />
        <Route path="/alumno/examenes" element={<Examenes />} />
        <Route path="/alumno/articulo/:id" element={<ArticuloDetalle />} />
        <Route path="/actividades/:id" element={<ActividadDetalle />} />
        <Route path="/alumno/examenes/:idForo" element={<ExamenDetalle />} />

        {/* Foro Alumno */}
        <Route path="/alumno/foro" element={<Foros />} /> {/* Ruta de Foros para los alumnos */}
        <Route path="/alumno/foro/:id" element={<Nuevaconsulta />} /> {/* Ruta de Foros para los alumnos */}
        <Route path="/alumno/foro/:idRespuesta" element={<RespuestaAlu />} /> {/* Ruta de Foros para los alumnos */}
        
        {/* Redirigir rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

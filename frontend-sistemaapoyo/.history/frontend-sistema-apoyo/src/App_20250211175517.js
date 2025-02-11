import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtegerRuta from "./ProtectedRoute";
import { UserProvider } from "./context/userContext";
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
import ChatProfesor from "./componentes/Profesor/ChatProfesor/chat";

//Foro
import ListaForos from "./componentes/Foro/ListaForos";
import Foro from "./componentes/Foro/Foro";
import NuevoForo from "./componentes/Foro/NuevoForo";
import Consulta from "./componentes/Foro/Consulta";
import NuevaConsulta from "./componentes/Foro/NuevaConsulta";
import Respuesta from "./componentes/Foro/Respuesta";
import NuevaRespuesta from "./componentes/Foro/NuevaRespuesta";

//Alumno
import MisCursosAlumno from "./componentes/Alumno/Cursos/MisCursos";
import Cursos from "./componentes/Alumno/Cursos/Cursos";
import ArticulosAlumno from "./componentes/Alumno/Articulo/Articulos";
import ActividadesAlumno from "./componentes/Alumno/Actividad/Actividades";
import ExamenAlumno from "./componentes/Alumno/Examen/Examenes";
import ArticuloDetalleAlumno from "./componentes/Alumno/Articulo/articuloDetalle";
import ActividadDetalleAlumno from "./componentes/Alumno/Actividad/actividadDetalle";
import ExamenDetalleAlumno from "./componentes/Alumno/Examen/ExamenDetalle";



function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          {/* Rutas Publicas */}
          {/* Iniciar Sesión - Registrarse */}
          <Route path="/iniciarsesion" element={ <Login />} />
          <Route path="/registrarse" element={<Registrar />} />


          {/* Rutas protegidas (Solo lo pueden ver lo que inician sesion) */}
            {/* Inicio */}
            <Route path="/" element={<Inicio />} />
            <Route path="/informacion" element={<Informacion />} />
            <Route path="/inicioprofesor" element={<InicioProfesor />} />
            <Route path="/nivelinicial" element={<NivelInicial />} />
            <Route path="/nivelintermedio" element={<NivelIntermedio />} />
            <Route path="/nivelavanzado" element={<NivelAvanzado />} />
            <Route path="/contra" element={<ResetPassword />} />

            {/* Administrador */}
            <Route path="/administrador" element={<ProtegerRuta><Administrador /></ProtegerRuta>} />
            <Route path="/administrador/listaProfesores" element={<ProtegerRuta><ListaProfesores /></ProtegerRuta>} />
            <Route path="/administrador/listaProfesores/nuevoProfesor" element={<ProtegerRuta><NuevoProfesor /></ProtegerRuta>} />
            <Route path="/administrador/editarProfesor" element={<ProtegerRuta><EditarProfesor /></ProtegerRuta>} />
            <Route path="/administrador/cargarProfesor" element={<ProtegerRuta><CargarProfesor /></ProtegerRuta>} />
            <Route path="/administrador/listaAlumnos" element={<ProtegerRuta><ListaAlumnos /></ProtegerRuta>} />
            <Route path="/administrador/listaAlumnos/nuevoAlumno" element={<ProtegerRuta><NuevoAlumno /></ProtegerRuta>} />
            <Route path="/administrador/editarAlumno" element={<ProtegerRuta><EditarAlumno /></ProtegerRuta>} />
            <Route path="/administrador/perfilAdministrador" element={<ProtegerRuta><PerfilAdministrador /></ProtegerRuta>} />
            <Route path="/administrador/chatAdmin" element={<ProtegerRuta><ChatAdmin /></ProtegerRuta>} />

            {/* Profesor */}
            <Route path="/profesor" element={<ProtegerRuta><InicioProfesorPage /></ProtegerRuta>} />
            <Route path="/profesor/alumnos" element={<ProtegerRuta><AlumnosProfesor /></ProtegerRuta>} />
            <Route path="/profesor/cursos" element={<ProtegerRuta><CursosProfesor /></ProtegerRuta>} />
            <Route path="/profesor/cursos/detalle/:id" element={<ProtegerRuta><CursoDetalle /></ProtegerRuta>} />
            <Route path="/profesor/cursos/detalle/:id/actividad" element={<ProtegerRuta><ActividadProfesor /></ProtegerRuta>} />
            <Route path="/profesor/cursos/detalle/:id/articulos" element={<ProtegerRuta><ArticuloProfesor /></ProtegerRuta>} />
            <Route path="/profesor/cursos/detalle/:id/examen" element={<ProtegerRuta><ExamenProfesor /></ProtegerRuta>} />
                  
            <Route path="/crear-actividad" element={<ProtegerRuta><CrearActividad /></ProtegerRuta>} />
            <Route path="/crear-articulo" element={<ProtegerRuta><CrearArticulo /></ProtegerRuta>} />
            <Route path="/crear-examen" element={<ProtegerRuta><CrearExamen /></ProtegerRuta>} />
            <Route path="/profesor/chat" element={<ProtegerRuta><ChatProfesor /></ProtegerRuta>} />
            <Route path="/profesor/perfil" element={<ProtegerRuta><PerfilProfesor /></ProtegerRuta>} />

            {/* Foro */}
            <Route path="/listaForos" element={<ProtegerRuta><ListaForos/></ProtegerRuta>} />
            <Route path="/listaForos/:idForo" element={<ProtegerRuta><Foro/></ProtegerRuta>} />
            <Route path="/listaForos/:idForo/:idConsulta" element={<ProtegerRuta><Consulta/></ProtegerRuta>}/>
            <Route path="/listaForos/:idForo/:idConsulta/:idRespuesta" element={<ProtegerRuta><Respuesta/></ProtegerRuta>} />

            <Route path="/crear-foro" element={<ProtegerRuta><NuevoForo /></ProtegerRuta>} />
            <Route path="/crear-consulta/:idForo" element={<ProtegerRuta><NuevaConsulta /></ProtegerRuta>} />
            <Route path="/crear-respuesta/:idConsulta" element={<ProtegerRuta><NuevaRespuesta /></ProtegerRuta>} />
                  
            {/* Alumno */}
            <Route path="/alumno" element={<ProtegerRuta><MisCursosAlumno /></ProtegerRuta>} />  
            <Route path="/alumno/cursos/" element={<ProtegerRuta><Cursos /></ProtegerRuta>} />
            <Route path="/alumno/articulos/" element={<ProtegerRuta><ArticulosAlumno /></ProtegerRuta>} />
            <Route path="/alumno/actividades/" element={<ProtegerRuta><ActividadesAlumno /></ProtegerRuta>} />
            <Route path="/alumno/examen/" element={<ProtegerRuta><ExamenAlumno /></ProtegerRuta>} />
            <Route path="/alumno/articulos/:id" element={<ProtegerRuta><ArticuloDetalleAlumno /></ProtegerRuta>} />
            <Route path="/alumno/actividades/:id" element={<ProtegerRuta><ActividadDetalleAlumno /></ProtegerRuta>} />
            <Route path="/alumno/examen/:id" element={<ProtegerRuta><ExamenDetalleAlumno /></ProtegerRuta>} />
            <Route path="/alumno/perfil" element={<ProtegerRuta><PerfilAlumno /></ProtegerRuta>} />


            {/* Redirigir rutas no encontradas */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>          
    </UserProvider>   
  );
}

export default App;

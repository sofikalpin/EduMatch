import React, { useState } from 'react';
import logo from '../../../../logo/LogoFinal.png';
import "./nuevoAlumno.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const NuevoAlumno = () => {
    const [email, setEmail] = useState('');
    const [clave, setClave] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nivel, setNivel] = useState('');
    const [rol, setRol] = useState('alumno'); // Valor por defecto como 'alumno'
    const [mensajeCreado, setmensajeCreado] = useState("");

    const navigate = useNavigate();
    
    const niveles = {
        A1: 1,
        A2: 2,
        B1: 3,
        B2: 4,
        C1: 5,
        C2: 6,
      };

    const handleRegistrar = async(e) => {
        e.preventDefault();
          
        if ( !nombre || !apellido || !email || !clave || !nivel){
          alert("Todos los campos son obligatorios");
          return;
        }

        try {

          // Convertir el nivel seleccionado a un entero
          const nivelId = niveles[nivel];

          const datosAlumno = {
              nombrecompleto:  `${nombre.trim()} ${apellido.trim()}`,
              correo: email.trim(),
              contraseñaHash: clave.trim(), // El backend se encargará de hashearla
              idnivel: nivelId, // Convertir nivel a entero
              idrol: 2, // Rol fijo para profesores
          };

          console.log("Datos del alumno:", datosAlumno);

          const response = await axios.post(
              "http://localhost:5228/API/AdministradorAlumno/CrearAlumno",
              datosAlumno
          );

          if (response.data.status){
            setmensajeCreado("Alumno creado con éxito.");
            setTimeout(() => setmensajeCreado(""), 2000); // Limpiar mensaje después de 3 segundos
            //Reiniciar Formulario
            setNombre("");
            setApellido("");
            setEmail("");
            setClave("");
            setNivel("");
          }else{
            alert(response.data.msg || "No se pudo crear el alumno.");
          }
        }catch (error){
          console.error("Error al registrar alumno:", error);
          alert("Ocurrió un error al registrar el alumno. Por favor, intenta nuevamente.");
        }
    }

    const handleCancelar = () => {
      navigate("../listaAlumnos", {replace: true});
  }

    return (
        <div className="contenedor-principal">
            <img src={logo} alt="Logo" className="logo-img" />

            {mensajeCreado && <div className="creado-message">{mensajeCreado}</div>}

            <form onSubmit={handleRegistrar} className="register-form">
                <h3>REGISTRAR ALUMNO</h3>
                <label htmlFor="rol" className="titulo-form">Tipo de Usuario</label>
                <select id="rol" value={rol} onChange={(e) => setRol('alumno')} className="login-input">
                    <option value="alumno">Alumno</option>
                </select>

                <label htmlFor="nombre" className="titulo-form">Nombre</label>
                <input 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    type="text" 
                    id="nombre" 
                    name="nombre" 
                    className="login-input" 
                    placeholder="Ejemplo: Juan" 
                />

                <label htmlFor="apellido" className="titulo-form">Apellido</label>
                <input 
                    value={apellido} 
                    onChange={(e) => setApellido(e.target.value)} 
                    type="text" 
                    id="apellido" 
                    name="apellido" 
                    className="login-input" 
                    placeholder="Ejemplo: Pérez" 

                />
                
                <label htmlFor="email" className="titulo-form">Correo electrónico</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="login-input" 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Ejemplo: correo@dominio.com" 
                />

                <label htmlFor="clave" className="titulo-form">Contraseña</label>
                <input 
                    value={clave} 
                    onChange={(e) => setClave(e.target.value)} 
                    className="login-input" 
                    type="password" 
                    id="clave" 
                    name="clave"
                    placeholder="Contraseña segura"
                />

                <label htmlFor="nivel" className="titulo-form">Nivel</label>
                  <select 
                    id="nivel" 
                    value={nivel} 
                    onChange={(e) => setNivel(e.target.value)} 
                    className="login-input"
                  >
                    <option value="" disabled>Seleccione un nivel</option>
                    <option value="A1">A1: Principiante</option>
                    <option value="A2">A2: Básico</option>
                    <option value="B1">B1: Pre-intermedio</option>
                    <option value="B2">B2: Intermedio</option>
                    <option value="C1">C1: Intermedio-alto</option>
                    <option value="C2">C2: Avanzado</option>
                  </select>

                <button type="submit" className="link-registrar">Crear Alumno</button>
                <button type="button" className="link-cancelar" onClick={handleCancelar}>Cancelar</button>
            </form>
        </div>
    );
};

export default NuevoAlumno;
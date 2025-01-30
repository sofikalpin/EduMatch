import React, {useState} from "react";
import logo from "../../../../logo/LogoFinal.png";
import "./nuevoProfesor.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const NuevoProfesor = () => {
      const [email, setEmail] = useState('');
      const [clave, setClave] = useState('');
      const [nombre, setNombre] = useState('');
      const [apellido, setApellido] = useState('');
      const [nivel, setNivel] = useState('');
      const [rol, setRol] = useState('profesor'); // Valor por defecto como 'profesor'
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

      const cancelar = () => {
        navigate("../listaProfesores" , { replace : true })
      }

      const handleRegistrar = async(e) => {
          e.preventDefault();
          
          if ( !nombre || !apellido || !email || !clave || !nivel){
            alert("Todos los campos son obligatorios");
            return;
          }

          try {

            // Convertir el nivel seleccionado a un entero
            const nivelId = niveles[nivel];

            const datosProfesor = {
                nombrecompleto:  `${nombre.trim()} ${apellido.trim()}`,
                correo: email.trim(),
                contraseñaHash: clave.trim(), // El backend se encargará de hashearla
                idnivel: nivelId, // Convertir nivel a entero
                idrol: 1, // Rol fijo para profesores
            };

            console.log("Datos del profesor:", datosProfesor);

            const response = await axios.post(
                "http://localhost:5228/API/AdministradorProfesor/CrearProfesor",
                datosProfesor
            );

            if (response.data.status){
              setmensajeCreado("Profesor creado con éxito.");
              setTimeout(() => setmensajeCreado(""), 2000); // Limpiar mensaje después de 3 segundos
              //Reiniciar Formulario
              setNombre("");
              setApellido("");
              setEmail("");
              setClave("");
              setNivel("");
            }else{
              alert(response.data.msg || "No se pudo crear el profesor.");
            }
          }catch (error){
            console.error("Error al registrar profesor:", error);
            alert("Ocurrió un error al registrar el profesor. Por favor, intenta nuevamente.");
          }
      }
  
      return (
          <div className="contenedor-principal">
              <img src={logo} alt="Logo" className="logo-img" />
              
              {mensajeCreado && <div className="creado-message">{mensajeCreado}</div>}
              
              <form onSubmit={handleRegistrar} className="register-form">
                  <h3>REGISTRAR PROFESOR</h3>
                  <label htmlFor="rol" className="titulo-form">Tipo de Usuario</label>
                  <select id="rol" value={rol} onChange={(e) => setRol('profesor')} className="login-input">
                      <option value="profesor">Profesor</option>
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
                        type="text" id="apellido" 
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
                  
                  <button type="submit" className="link-registrar">Crear Profesor</button>
                  <button type="button" className="link-cancelar" onClick={cancelar}>Cancelar</button>
              </form>
          </div>
      );  
};

export default NuevoProfesor;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CrearActividad.css";
import logo from "../../componentes/logo/LogoInicio.png";
import drive from "../imagenes/google-drive.png";
import youtube from "../imagenes/youtube.png";
import subir from "../imagenes/subir.png";
import url from "../imagenes/url.png";

const CrearActividad = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [unidad, setUnidad] = useState("Unit 1");
  const [publicarEn, setPublicarEn] = useState("B1: Pre-Intermedio");
  const [showStudentSelection, setShowStudentSelection] = useState(false);
  const [asignarPara, setAsignarPara] = useState([]);
  const [todaLaClase, setTodaLaClase] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sinFecha, setSinFecha] = useState(false); // Estado para manejar el checkbox

  const navigate = useNavigate();

  const handleCrearActividad = async (e) => {
    e.preventDefault();

    const nuevaActividad = {
      nombre,
      descripcion,
      fechaEntrega: sinFecha ? "" : fechaEntrega, // Si no hay fecha, enviamos un string vacío
      unidad,
      publicarEn,
      asignarPara: todaLaClase ? "Toda la clase" : asignarPara,
    };

    try {
      const response = await fetch("/api/actividades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaActividad),
      });

      if (response.ok) {
        alert("Actividad creada exitosamente");
        navigate("/profesor/actividades");
      } else {
        console.error("Error al crear la actividad");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const alumnosMock = [
    { id: 1, nombre: "Sofia Kalpin", estado: "En línea" },
    { id: 2, nombre: "Juan Pérez", estado: "Ausente" },
    { id: 3, nombre: "María López", estado: "En línea" },
    { id: 4, nombre: "Carlos García", estado: "Ausente" },
  ];

  const filteredAlumnos = alumnosMock.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = () => {
    setSinFecha(!sinFecha);
    if (sinFecha) {
      setFechaEntrega(""); // Limpiar la fecha si se marca "No hay fecha"
    }
  };

  return (
    <div className="crear-actividad-container">
      <header className="header">
        <img src={logo} alt="Logo del curso" className="logo-img" />
        <nav className="left-nav">
          <ul>
            <li><Link to="/profesor/inicio">Inicio</Link></li>
            <li><Link to="/profesor/cursos">Mis Cursos</Link></li>
            <li><Link to="/profesor/alumnos">Mis Alumnos</Link></li>
          </ul>
        </nav>
      </header>

      <h1 className="titulo-articulos">Nueva Actividad</h1>

      <form onSubmit={handleCrearActividad} className="crear-actividad-form">
        <div className="form-grid">
          <div className="form-left">
            <div className="input-group">
            <label>Nombre de la Actividad:</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                required
              />
            </div>

            <div className="input-group">
            <label>Descripción:</label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción (opcional)"
              />
            </div>

            <div className="adjuntar">
              <span>Adjuntar</span>
              <div className="adjuntar-icons">
                <button type="button">
                    <img src={drive} alt="Google Drive" className="icon-img" />
                </button>
                <button type="button">
                <img src={youtube} alt="Youtube" className="icon-img" />
                </button>
                <button type="button">
                <img src={subir} alt="Subir" className="icon-img" />
                </button>
                <button type="button">
                <img src={url} alt="Url" className="icon-img" />
                </button>
              </div>
            </div>
          </div>

          <div className="form-right">
            <div className="input-group">
              <label>Publicar en:</label>
              <select value={publicarEn} onChange={(e) => setPublicarEn(e.target.value)}>
                <option>B1: Pre-Intermedio</option>
                <option>A1: Principiante</option>
                <option>A2: Básico</option>
                <option>B2: Intermedio</option>
                <option>C1: Intermedio-Alto</option>
                <option>C2: Avanzado</option>
              </select>
            </div>

            <div className="input-group">
              <button
                type="button"
                className="asignar-btn"
                onClick={() => setShowStudentSelection(!showStudentSelection)}
              >
                📑 Asignar para
              </button>
              <span className="asignar-info">
                {todaLaClase
                  ? "Asignado a: Toda la clase"
                  : asignarPara.length > 0
                  ? `Asignado a: ${asignarPara.join(", ")}`
                  : "Sin asignar"}
              </span>
            </div>

            {showStudentSelection && (
              <div className="student-selection-overlay">
                <div className="student-selection-content">
                  <div className="student-selection-header">
                    <input
                      type="text"
                      placeholder="Buscar estudiantes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="student-search"
                    />
                  </div>
                  <div className="students-list">
                    <label className="select-all">
                      <input
                        type="checkbox"
                        checked={todaLaClase}
                        onChange={() => setTodaLaClase(!todaLaClase)}
                      />
                      <span>Toda la clase</span>
                    </label>
                    {filteredAlumnos.map((alumno) => (
                      <div key={alumno.id} className="student-item">
                        <label>
                          <input
                            type="checkbox"
                            checked={asignarPara.includes(alumno.nombre)}
                            onChange={() => {
                              if (asignarPara.includes(alumno.nombre)) {
                                setAsignarPara(asignarPara.filter((a) => a !== alumno.nombre));
                              } else {
                                setAsignarPara([...asignarPara, alumno.nombre]);
                              }
                            }}
                          />
                          <span className="student-name">{alumno.nombre}</span>
                          <span
                            className={`student-status ${alumno.estado
                              .toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            {alumno.estado}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="student-selection-footer">
                    <button
                      type="button"
                      className="aceptar-btn"
                      onClick={() => setShowStudentSelection(false)}
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="input-group">
              <label htmlFor="fecha-entrega">Fecha de entrega</label>
              <input
                type="date"
                id="fecha-entrega"
                name="fecha-entrega"
                value={sinFecha ? "" : fechaEntrega}
                onChange={(e) => setFechaEntrega(e.target.value)}
                disabled={sinFecha} // Desactivar si se selecciona "No hay fecha"
              />
              <div>
                <input
                  type="checkbox"
                  id="sin-fecha"
                  checked={sinFecha}
                  onChange={handleCheckboxChange} // Cambiar aquí para usar el evento de React
                />
                Sin fecha de entrega
              </div>
            </div>

            <div className="input-group">
              <label>Unidad:</label>
              <select value={unidad} onChange={(e) => setUnidad(e.target.value)}>
                <option>Unit 1</option>
                <option>Unit 2</option>
                <option>Unit 3</option>
                <option>Unit 4</option>
                <option>Unit 5</option>
              </select>
            </div>
          </div>
        </div>

        <div className="crear-actividad-footer">
          <button type="submit" className="crear-btn">Crear Actividad</button>
        </div>
      </form>
    </div>
  );
};

export default CrearActividad;

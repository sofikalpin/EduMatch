import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ForoCompleto.css';
import logo from '../../logo/LogoInicio.png';

const Foro = () => {
  const { idconsulta } = useParams(); // Obtenemos el idconsulta desde la URL

  // Estado para consultas
  const [consultas, setConsultas] = useState([]);
  const [tituloBusqueda, setTituloBusqueda] = useState('');
  const [nuevaConsulta, setNuevaConsulta] = useState({
    titulo: '',
    contenido: '',
    idusuario: 0,
    fechahora: new Date().toISOString(),
  });
  const [consultaSeleccionada, setConsultaSeleccionada] = useState(null);

  // Estado para respuestas
  const [respuestas, setRespuestas] = useState([]);
  const [nuevaRespuesta, setNuevaRespuesta] = useState({
    contenido: '',
    idconsulta: idconsulta || 0,
    idusuario: 0,
    fechahora: new Date().toISOString(),
  });

  // Estado para manejar errores
  const [error, setError] = useState('');

  // Obtener todas las consultas
  const obtenerConsultas = async () => {
    try {
      const response = await fetch('http://localhost:5000/Consulta/ConsultarConsultas'); // Cambia la URL según tu configuración
      const data = await response.json();
      if (data.status) {
        setConsultas(data.value);
      } else {
        setError('Error al cargar las consultas');
      }
    } catch {
      setError('Error de conexión al servidor');
    }
  };

  // Crear una nueva consulta
  const crearConsulta = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/Consulta/CrearConsulta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaConsulta),
      });
      const data = await response.json();
      if (data.status) {
        obtenerConsultas();
        setNuevaConsulta({
          titulo: '',
          contenido: '',
          idusuario: 0,
          fechahora: new Date().toISOString(),
        });
      } else {
        setError('Error al crear la consulta');
      }
    } catch {
      setError('Error de conexión al servidor');
    }
  };

  // Obtener respuestas asociadas a una consulta
  const consultarRespuestas = async () => {
    try {
      const response = await fetch('http://localhost:5000/Respuesta/ConsultarRespuesta'); // Cambia la URL según tu configuración
      const data = await response.json();
      if (data.status) {
        const respuestasFiltradas = idconsulta
          ? data.value.filter((r) => r.idconsulta === parseInt(idconsulta))
          : data.value;
        setRespuestas(respuestasFiltradas);
      } else {
        setError('Error al cargar las respuestas');
      }
    } catch {
      setError('Error de conexión al servidor');
    }
  };

  // Crear una nueva respuesta
  const crearRespuesta = async (e) => {
    e.preventDefault();
    if (!nuevaRespuesta.contenido.trim()) {
      setError('El contenido de la respuesta no puede estar vacío');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/Respuesta/CrearRespuesta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaRespuesta),
      });
      const data = await response.json();
      if (data.status) {
        consultarRespuestas();
        setNuevaRespuesta({ ...nuevaRespuesta, contenido: '' });
      } else {
        setError('Error al crear la respuesta');
      }
    } catch {
      setError('Error de conexión al servidor');
    }
  };

  // Efecto para cargar consultas al montar el componente
  useEffect(() => {
    obtenerConsultas();
  }, []);

  // Efecto para cargar respuestas si se selecciona una consulta
  useEffect(() => {
    if (idconsulta) {
      consultarRespuestas();
    }
  }, [idconsulta]);

  return (
    <div className="p-4">
      <img src={logo} alt="logo" className="logo-img" />
      <h2 className="text-2xl font-bold mb-4">Encontrá tu Foro</h2>

      {/* Mostrar mensajes de error */}
      {error && <div className="error-message">{error}</div>}

      {/* Mostrar las consultas */}
      <h3 className="text-xl font-semibold mt-6">Consultas</h3>
      <ul>
        {consultas.map((consulta) => (
          <li key={consulta.idconsulta} className="consulta-item">
            <h4>{consulta.titulo}</h4>
            <p>{consulta.contenido}</p>
          </li>
        ))}
      </ul>

      {/* Crear nueva consulta */}
      <h3 className="text-xl font-semibold mt-6">Crear Consulta</h3>
      <form onSubmit={crearConsulta}>
        <input
          type="text"
          placeholder="Título"
          value={nuevaConsulta.titulo}
          onChange={(e) => setNuevaConsulta({ ...nuevaConsulta, titulo: e.target.value })}
        />
        <textarea
          placeholder="Contenido"
          value={nuevaConsulta.contenido}
          onChange={(e) => setNuevaConsulta({ ...nuevaConsulta, contenido: e.target.value })}
        ></textarea>
        <button type="submit">Crear</button>
      </form>

      {/* Mostrar respuestas si hay una consulta seleccionada */}
      {idconsulta && (
        <>
          <h3 className="text-xl font-semibold mt-6">Respuestas</h3>
          <ul>
            {respuestas.map((respuesta) => (
              <li key={respuesta.idrespuesta} className="respuesta-item">
                <p>{respuesta.contenido}</p>
                <small>Por usuario {respuesta.idusuario}</small>
              </li>
            ))}
          </ul>

          {/* Crear nueva respuesta */}
          <h3 className="text-xl font-semibold mt-6">Crear Respuesta</h3>
          <form onSubmit={crearRespuesta}>
            <textarea
              placeholder="Escribe tu respuesta"
              value={nuevaRespuesta.contenido}
              onChange={(e) => setNuevaRespuesta({ ...nuevaRespuesta, contenido: e.target.value })}
            ></textarea>
            <button type="submit">Responder</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Foro;

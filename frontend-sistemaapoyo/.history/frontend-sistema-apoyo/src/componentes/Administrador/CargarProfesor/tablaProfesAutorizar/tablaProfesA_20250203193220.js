import React, { useState } from "react";
import FilaProfesor from "../filaProfesor/filaProfesor.js";

const TablaProfesA = ({ data, onDelete, onAutorizar }) => {
  const [nivelSeleccionado, setNivelSeleccionado] = useState("");

  const handleNivelSeleccionado = (e) => {
    setNivelSeleccionado(e.target.value);
  };

  const profesorNivel = data.filter(
    (profesor) => nivelSeleccionado === "" || profesor.idnivel.toString() === nivelSeleccionado
  );

  const isDataValid = profesorNivel.length > 0;

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl">
      <div className="mb-4">
        <label htmlFor="nivel-select" className="block text-gray-700 font-semibold mb-2">
          Filtrar por nivel:
        </label>
        <select
          id="nivel-select"
          value={nivelSeleccionado}
          onChange={handleNivelSeleccionado}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los niveles</option>
          <option value="1">A1: Principiante</option>
          <option value="2">A2: Básico</option>
          <option value="3">B1: Pre-intermedio</option>
          <option value="4">B2: Intermedio</option>
          <option value="5">C1: Intermedio-alto</option>
          <option value="6">C2: Avanzado</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
              <th className="py-3 px-4 border-b">Nombre y apellido</th>
              <th className="py-3 px-4 border-b">Correo electrónico</th>
              <th className="py-3 px-4 border-b">🔽 Nivel</th>
              <th className="py-3 px-4 border-b">Acción</th>
            </tr>
          </thead>
          <tbody>
            {isDataValid ? (
              profesorNivel.map((profesor) => (
                <FilaProfesor
                  key={profesor.idusuario}
                  profesor={profesor}
                  onDelete={onDelete}
                  onAutorizar={onAutorizar}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaProfesA;

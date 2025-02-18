import React, { useState } from "react";
import FilaProfesor from "../FilaProfesor/FilaProfesor.js";

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
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="nivel-select" className="block text-sm font-medium text-gray-700">
          Filtrar por nivel:
        </label>
        <select
          id="nivel-select"
          value={nivelSeleccionado}
          onChange={handleNivelSeleccionado}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bbg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b">NOMBRE Y APELLIDO</th>
              <th className="py-3 px-4 border-b">CORREO ELECTRÓNICO</th>
              <th className="py-3 px-4 border-b">NIVEL</th>
              <th className="py-3 px-4 border-b">CV</th>
              <th className="py-3 px-4 border-b">ACCIONES</th>
              
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

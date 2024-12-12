import axios from 'axios';

export const getAlumnos = async (cursoId) => {
  const response = await axios.get(`/api/profesor/cursos/${cursoId}/alumnos`);
  return response.data;
};

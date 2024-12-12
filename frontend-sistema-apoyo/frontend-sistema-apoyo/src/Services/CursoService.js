import axios from 'axios';

export const getCursos = async () => {
  const response = await axios.get('/api/profesor/cursos');
  return response.data;
};

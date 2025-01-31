import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5528/api', // Asegúrate de que el puerto y URL son correctos
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
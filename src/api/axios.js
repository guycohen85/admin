import axios from 'axios';

const axiosConfig = {
  baseURL: 'http://localhost:3001/api/',
  headers: {},
  withCredentials: true,
};

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;

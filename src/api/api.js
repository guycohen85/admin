import axios from 'axios';

const axiosConfig = {
  baseURL: 'http://localhost:3001/api/',
  headers: {},
};

const api = axios.create(axiosConfig);

const setHeaderToken = (accessToken) => {
  const headerToken = accessToken ? `Bearer ${accessToken}` : null;
  api.defaults.headers.common['Authorization'] = headerToken;
};

let refresh = false;
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !refresh) {
      refresh = true;
      const res = await axios.post('refresh-token', {}, { withCredentials: true, ...axiosConfig });

      if (res.status === 200) {
        setHeaderToken(res.data.accessToken);

        const config = {
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${res.data.accessToken}`,
          },
        };

        return await api(config);
      }
    }

    refresh = false;
    return Promise.reject(error);
  }
);

export { api, setHeaderToken };

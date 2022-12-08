import axios from 'axios';

const axiosConfig = {
  baseURL: 'http://localhost:3001/api/',
  headers: {},
  withCredentials: true,
};

const authAxios = axios.create(axiosConfig);

const setHeaderToken = (accessToken) => {
  if (accessToken) {
    authAxios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`;
  } else {
    delete authAxios.defaults.headers.common['Authorization'];
  }
};

const setAuthInterceptors = (user, refreshToken, removeUser, navigate) => {
  axios.interceptors.request.eject(authAxios);
  axios.interceptors.response.eject(authAxios);

  if (!user) return;

  let accessToken = '';

  authAxios.interceptors.request.use(
    function (config) {
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (!user) {
        navigate('/login');
        return Promise.resolve(error);
      }

      try {
        if (error.response?.status === 401 && !error.config.retry) {
          error.config.retry = true;
          accessToken = await refreshToken(user);
          const response = await authAxios.request(error.config);
          return Promise.resolve(response);
        }

        if (error.config.retry) {
          removeUser();
          navigate('/login');
          return Promise.resolve(error);
        }
      } catch (error) {
        removeUser();
        navigate('/login');
        return Promise.resolve(error);
      }

      return Promise.reject(error);
    }
  );
};

export { authAxios, setAuthInterceptors, setHeaderToken };

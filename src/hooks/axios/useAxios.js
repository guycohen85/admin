import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types'

function useAxios(axiosInstance, method, url, config = {}) {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const callApi = async () => {
      try {
        const res = await axiosInstance({
          signal: controller.signal,
          method: method.toLowerCase(),
          url,
          ...config,
        });
        setResponse(res);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    callApi();

    return () => controller.abort();
  }, []);

  return { response, isLoading, error };
}

// useAxios.propTypes = {
// 	name: PropTypes.string
// };

export default useAxios;

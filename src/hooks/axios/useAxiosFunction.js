import { useEffect, useRef, useState } from 'react';
import axiosInstance from 'api/axios';

function useAxiosFunction() {
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const controller = useRef(new AbortController());

  const axiosFunction = async (method, url, config = {}) => {
    let res, err;
    try {
      setIsLoading(true);
      const res = await axiosInstance({
        signal: controller.current.signal,
        method: method.toLowerCase(),
        url,
        ...config,
      });
      setResponse(res);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }

    return [res, err];
  };

  useEffect(() => {
    const ctrl = controller.current;
    return () => ctrl && ctrl.abort();
  }, [controller]);

  return [axiosFunction, response, error, isLoading];
}

export default useAxiosFunction;

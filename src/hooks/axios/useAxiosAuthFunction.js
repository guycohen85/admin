import { useEffect, useRef, useState } from 'react';
import { useUser } from 'context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { authAxios, setAuthInterceptors, setHeaderToken } from 'api/auth';
import useToken from '../auth/useToken';

function useAxiosAuthFunction() {
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const controller = useRef(new AbortController());

  const axiosAuth = async (method, url, config = {}) => {
    try {
      setIsLoading(true);
      const res = await authAxios({
        signal: controller.current.signal,
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

  const { user, removeUser } = useUser();
  const { accessToken, refreshToken } = useToken();

  const navigate = useNavigate();

  useEffect(() => {
    setHeaderToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    setAuthInterceptors(user, refreshToken, removeUser, navigate);
  }, [user, refreshToken, removeUser, navigate]);

  useEffect(() => {
    const ctrl = controller.current;
    return () => ctrl && ctrl.abort();
  }, [controller]);

  return [axiosAuth, response, error, isLoading];
}

export default useAxiosAuthFunction;

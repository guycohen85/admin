import { useEffect } from 'react';
import useAxios from './useAxios';
import { useUser } from 'context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { authAxios, setAuthInterceptors, setHeaderToken } from 'api/auth';
import useToken from './auth/useToken';

function useAuthAxios(method, url, config = {}) {
  const { user, removeUser } = useUser();
  const { accessToken, refreshToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    setAuthInterceptors(user, refreshToken, removeUser, navigate);
  }, [user, refreshToken, removeUser, navigate]);

  const { response, isLoading, error } = useAxios(
    authAxios,
    method,
    url,
    config
  );

  return { response, isLoading, error };
}

export default useAuthAxios;

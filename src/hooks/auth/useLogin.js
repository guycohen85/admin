import { useUser } from 'context/UserProvider';
import useAxiosFunction from '../axios/useAxiosFunction';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useToken from './useToken';

const axiosConfig = { withCredentials: true };

function useLogin() {
  const { setUser } = useUser();
  const { setAccessToken } = useToken();
  const [axiosFn, response, error, isLoading] = useAxiosFunction();

  const navigate = useNavigate();

  const login = async (loginCredentials) => {
    await axiosFn('POST', 'login', {
      data: loginCredentials,
      ...axiosConfig,
    });
  };

  useEffect(() => {
    if (response.data) {
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      response && navigate('/profile');
    }
  }, [response, setUser, setAccessToken, navigate]);

  return [login, response, error, isLoading];
}

export default useLogin;

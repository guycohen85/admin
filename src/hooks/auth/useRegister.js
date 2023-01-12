import { useUser } from 'context/UserProvider';
import useAxiosFunction from '../axios/useAxiosFunction';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useToken from './useToken';


function useRegister() {
  const { setUser } = useUser();
  const { setAccessToken } = useToken();
  const [axiosFn, response, error, isLoading] = useAxiosFunction();

  const navigate = useNavigate();

  const register = async (registerCredentials) => {
    await axiosFn('POST', 'register', {
      data: registerCredentials,
    });
  };

  useEffect(() => {
    if (response.data) {
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      response && navigate('/profile');
    }
  }, [response, setUser, setAccessToken, navigate]);

  return [register, response, error, isLoading];
}

export default useRegister;

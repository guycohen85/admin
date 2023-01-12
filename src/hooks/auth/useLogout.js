import { useUser } from 'context/UserProvider';
import useAuthAxiosFunction from '../axios/useAxiosAuthFunction';
import { useNavigate } from 'react-router-dom';
import useToken from './useToken';


function useLogout() {
  const { user, removeUser } = useUser();
  const { setAccessToken } = useToken();
  const [axiosFn] = useAuthAxiosFunction();

  const navigate = useNavigate();

  const logout = async () => {
    axiosFn('POST', 'logout', {
      data: { id: user.id },
    });
    removeUser();
    setAccessToken(null);
    navigate('/login');
  };

  return logout;
}

export default useLogout;

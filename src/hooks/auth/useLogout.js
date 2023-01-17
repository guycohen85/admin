import useUser from '../user/useUser';
import { useNavigate } from 'react-router-dom';
import { api, setHeaderToken } from '../../api/api';
import { useMutation, useQueryClient } from 'react-query';

const logout = (id) => {
  if (!id) return null;
  return api.post('logout', { id }, { withCredentials: true });
};

function useLogout() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => logout(user?._id),
    onSettled: () => {
      setHeaderToken(null);
      queryClient.setQueryData(['user'], null);
      window.localStorage.removeItem('user');
      navigate('/login');
    },
  });

  return { mutateLogout: mutate };
}

export default useLogout;

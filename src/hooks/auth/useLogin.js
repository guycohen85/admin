import { useNavigate } from 'react-router-dom';
import { api, setHeaderToken } from '../../services/api';
import { useMutation, useQueryClient } from 'react-query';

const login = async (loginCredentials) => {
  const { data } = await api.post('login', loginCredentials, {
    withCredentials: true,
  });
  return data;
};

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: (loginCredentials) => login(loginCredentials),
    onSuccess: (data) => {
      setHeaderToken(data.accessToken);
      queryClient.setQueryData(['user'], data.user);
      navigate('/profile');
    },
  });

  return { mutateLogin: mutate, errorLogin: error };
}

export default useLogin;

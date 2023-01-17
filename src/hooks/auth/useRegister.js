import { useNavigate } from 'react-router-dom';
import { api, setHeaderToken } from '../../api/api';
import { useQueryClient, useMutation } from 'react-query';

const register = async (registerCredentials) => {
  const { data } = await api.post('register', registerCredentials, {
    withCredentials: true,
  });
  return data;
};

function useRegister() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: (registerCredentials) => register(registerCredentials),
    onSuccess: (data) => {
      setHeaderToken(data.accessToken);
      queryClient.setQueryData(['user'], data.user);
      navigate('/profile');
    },
  });

  return { mutateRegister: mutate, errorRegister: error };
}

export default useRegister;

// import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useQueryClient, useMutation } from 'react-query';

const updateUser = async (id, userCredentials) => {
  const { data } = await api.put(`user/${id}`, userCredentials);
  return data;
};

function useUpdateUser(id) {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, error, isSuccess } = useMutation({
    mutationFn: (registerCredentials) => updateUser(id, registerCredentials),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data); //TODO: use query key with ID
    },
  });

  return { mutateUser: mutate, errorMutateUser: error, isSuccessMutateUser: isSuccess };
}

export default useUpdateUser;

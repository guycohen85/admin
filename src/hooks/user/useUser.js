import { useQuery } from 'react-query';
import { api } from '../../services/api';

const fetchUser = async (id) => {
  if (!id) return null;

  const { data } = await api.get(`user/${id}`);
  return data;
};

function useUser() {
  const {
    data: user,
    status,
    error,
  } = useQuery(['user'], () => fetchUser(user?._id), {
    storage: window.localStorage,
    initialData: JSON.parse(window.localStorage.getItem('user')),
    staleTime: 60 * 1000 * 5,
    // set data to storage
    onSuccess: (data) => {
      if (data) {
        window.localStorage.setItem('user', JSON.stringify(data));
      } else {
        window.localStorage.removeItem('user');
      }
    },
  });

  return { user, status, error };
}

export default useUser;

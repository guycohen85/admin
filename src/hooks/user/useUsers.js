import { useQuery } from 'react-query';
import { api } from '../../services/api';

const fetchUsers = async () => {
  const { data } = await api.get('user');
  return data;
};

function useUsers() {
  const {
    data: users,
    status,
    error,
  } = useQuery(['users'], () => fetchUsers());

  return { users, status, error };
}

export default useUsers;

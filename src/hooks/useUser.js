import { useLocalStorage } from './useStorage';
// import { useQuery } from 'react-query';

function useUser() {
  const [user, setUser, removeUser] = useLocalStorage('user', null);

  //TODO: if user, refresh data from server(react-query)
  // if(user){
  // 	const {isLoading, isError, error, data} = useQuery(['user'], fetchTodos, {});
  // }

  return {
    user,
    setUser,
    removeUser,
  };
}

export default useUser;

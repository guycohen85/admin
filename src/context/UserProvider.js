import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useStorage';

const AuthContext = createContext(null);

function useUser() {
  return useContext(AuthContext);
}

function UserProvider({ children }) {
  const [user, setUser, removeUser] = useLocalStorage('user', null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        removeUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export { UserProvider, useUser };

import { useUser } from '../context/UserProvider';
import useLogout from './auth/useLogout';

function useMenu() {
  const { user } = useUser();
  const logout = useLogout();

  let headerMenu = [];
  let settingsMenu = [];

  if (user) {
    //* Auth links
    headerMenu = [{ path: '/protected', name: 'Protected' }];
    settingsMenu = [
      { path: '/profile', name: 'Profile' },
      { name: 'Logout', handleClick: logout, component: 'span' },
    ];
  } else {
    //* Guest links
    headerMenu = [];
    settingsMenu = [
      { path: '/login', name: 'Login' },
      { path: '/register', name: 'Register' },
    ];
  }

  return { headerMenu, settingsMenu };
}

export default useMenu;

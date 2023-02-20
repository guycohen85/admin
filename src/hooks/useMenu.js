import useUser from './user/useUser';
import useLogout from './auth/useLogout';

function useMenu() {
  const { user } = useUser();
  const { mutateLogout } = useLogout();

  let headerMenu = [];
  let settingsMenu = [];

  if (user) {
    //* Auth links
    headerMenu = [
      { path: '/protected', name: 'Protected' },
      { path: '/users', name: 'Users' },
    ];
    settingsMenu = [
      { path: '/profile', name: 'Profile' },
      { name: 'Logout', handleClick: mutateLogout, component: 'span' },
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

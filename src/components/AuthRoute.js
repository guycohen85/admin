import { Outlet, Navigate } from 'react-router-dom';
import useUser from '../hooks/user/useUser';

function AuthRoute() {
  const { user } = useUser();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthRoute;

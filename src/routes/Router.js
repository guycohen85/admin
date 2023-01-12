import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Protected from 'pages/Protected';
import Profile from 'pages/Profile';
import Users from 'pages/Users';
import NotFound from 'pages/NotFound';
import AuthRoute from 'components/AuthRoute';

function Router() {
  return (
    <Routes>
      <Route path="/">
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        {/* Protected Routes */}
        <Route element={<AuthRoute />}>
          <Route path="/protected" element={<Protected />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default Router;

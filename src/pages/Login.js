import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { email, password } from '../utils/joiValidations';
import useLogin from 'hooks/auth/useLogin';
import { useEffect } from 'react';
import PageContainer from 'layout/PageContainer';

const schema = Joi.object({ email, password });

export default function Login() {
  const { mutateLogin, errorLogin } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    clearErrors('server');
    await mutateLogin(data);
  };

  useEffect(() => {
    if (errorLogin?.response || errorLogin?.message) {
      setError('server', {
        type: 'server',
        message: errorLogin.response?.data?.error?.message || errorLogin.message,
      });
    }
  }, [errorLogin, errors, setError]);

  // TODO: use features folder structure

  return (
    <PageContainer maxWidth="xs">
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register('email')}
          helperText={errors.email?.message}
          error={!!errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          helperText={errors.password?.message}
          error={!!errors.password}
        />
        {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
        <Grid container>
          {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              "Don't have an account? Sign Up"
            </Link>
          </Grid>
        </Grid>
        {errors.server && <Typography color="error">{errors.server.message}</Typography>}
      </Box>
    </PageContainer>
  );
}

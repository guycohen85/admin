import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Joi from 'joi';
import { email, password, name } from '../utils/joiValidations';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import useRegister from 'hooks/auth/useRegister';
import { useEffect } from 'react';

const schema = Joi.object({
  firstName: name,
  lastName: name,
  email,
  password,
});

export default function Register() {
  const { mutateRegister, errorRegister } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    clearErrors('server');
    await mutateRegister(data);
  };

  useEffect(() => {
    if (errorRegister?.response || errorRegister?.message) {
      setError('server', {
        type: 'server',
        message: errorRegister.response?.data?.error?.message || errorRegister.message,
      });
    }
  }, [errorRegister, errors, setError]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                fullWidth
                label="First Name"
                autoFocus
                {...register('firstName')}
                helperText={errors.firstName?.message}
                error={!!errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                autoComplete="family-name"
                {...register('lastName')}
                helperText={errors.lastName?.message}
                error={!!errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                autoComplete="email"
                {...register('email')}
                helperText={errors.email?.message}
                error={!!errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                autoComplete="new-password"
                {...register('password', {
                  required: { value: true, message: 'aaa' },
                })}
                helperText={errors.password?.message}
                error={!!errors.password}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          {errors.server && <Typography color="error">{errors.server.message}</Typography>}
        </Box>
      </Box>
    </Container>
  );
}

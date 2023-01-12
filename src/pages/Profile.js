import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Joi from 'joi';
import { email, password, name } from '../utils/joiValidations';
import { useUser } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
  firstName: name,
  lastName: name,
  email,
  password,
});

export default function Profile() {
  const navigate = useNavigate();
  const { register: registerRequest, user } = useUser();// TODO: wrong use of register

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    try {
      clearErrors('server');
      await registerRequest(data);
      navigate('/');
    } catch (error) {
      setError('server', {
        type: 'server',
        message: error.response.data.error.message,
      });
    }
  };

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
          <ChildCareIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                {...register('firstName', { value: user.firstName })}
                helperText={errors.firstName?.message}
                error={!!errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                {...register('lastName', { value: user.lastName })}
                helperText={errors.lastName?.message}
                error={!!errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                value={user.email}
                disabled
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
          {errors.server && (
            <Typography color="error">{errors.server.message}</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

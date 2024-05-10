import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {NavLink} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/Auth';
import { useHistory } from 'react-router-dom';

export default function SignIn() {
  const history  = useHistory()
  const dispatch  = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const info = {
      email: data.get('email'),
      password: data.get('password'),
    };
    axios.post("http://localhost:8006/user/login",info)
    .then((data)=>{
      alert(data.data.message)
      localStorage.setItem('auth_token',data.data.token)
      dispatch(authActions.login())
      history.push('/')
    })
    .catch((e)=>{
     alert(e.message)
    })
  };

  return (
   
      <Container component="main" maxWidth="xs" sx={{backgroundColor:'aliceblue',px:2,pb:2,borderRadius:1}}>
        <CssBaseline />
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
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item   >
                <NavLink to={'/signup'} style={{color:'blue',textDecoration:'none'}} >
                  Don't Have One? Sign in
                </NavLink>
                
              </Grid>
              <Grid item >
              <NavLink to={'/forgot-password'} style={{color:'red',textDecoration:'none'}} >
                  Forgot Password?
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
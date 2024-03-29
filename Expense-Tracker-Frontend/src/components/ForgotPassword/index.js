import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {NavLink , useHistory} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import QuestionMarkRounded from '@mui/icons-material/QuestionMarkRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';

export default function ForgotPassword(){
   const history = useHistory()
  const handleSubmit = (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const info = {
      email: data.get('email')
    };

    axios.post('http://localhost:8006/password/forgotpassword',info)
    .then(()=>{
      alert("Link Send")
      history.push('/signin')
    })
    .catch((er)=>{
      console.log(er)
      alert("Error is sending Link")
    })
  }
    return(
        <Container component="main" maxWidth="xs" sx={{backgroundColor:'aliceblue',px:2,pb:2,borderRadius:1}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <QuestionMarkRounded />
          </Avatar>
          <Typography component="h1" variant="h5" mb={2}>
            Forgot Password
          </Typography>
          <TextField
           required
           fullWidth
           id="email"
           label="Email Address"
           name="email"
           autoComplete="email"
          />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              Send Link
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <NavLink to={'/signin'} style={{color:'blue',textDecoration:'none'}}>
                  Login?
                </NavLink>
              </Grid>
              <Grid item>
              <NavLink to={'/signup'} style={{color:'green',textDecoration:'none'}}>
                  New User?
                </NavLink>
              </Grid>
            </Grid>
          </Box>
      </Container>
    )
}
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {NavLink} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import QuestionMarkRounded from '@mui/icons-material/QuestionMarkRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function ForgotPassword(){
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
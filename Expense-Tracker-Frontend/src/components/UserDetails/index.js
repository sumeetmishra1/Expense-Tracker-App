import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



export default function UserDetails() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
   
      <Container component="main" maxWidth="xs" sx={{backgroundColor:'white',px:2,pb:2,borderRadius:1}}>
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
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Details
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dp"
                  label="Profile Picture"
                  name="dp"
                  autoComplete="dp"
                />
              </Grid>
              <Grid item xs={12}>
               <Typography>Email: sumitsfs0@gmail.com <Button>Verify</Button></Typography>
              </Grid>
              <Grid item sx={12}>
              <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
              </Grid>
              <Grid item sx={12}>
              <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2,color:'red' }}
            >
             Cancel
            </Button>
              </Grid>
            </Grid>
            
            
          </Box>
        </Box>
      </Container>
  );
}
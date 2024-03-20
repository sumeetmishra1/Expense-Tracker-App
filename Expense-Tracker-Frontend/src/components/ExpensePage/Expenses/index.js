import { Box,Typography,Container, Button } from "@mui/material"

export default function Expenses(){
    return(
        <Container
      sx={{
        height: "auto",
        width: "90vh",
        mt: 2,
        p:2,
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
       { [...Array(4)].map((i)=>{
            return(
            <Box key={i} sx={{display:'flex',backgroundColor:'#d2d2d2',m:2,p:1,borderRadius:2}}>
                <Box sx={{ flexGrow: 1, display: {xs:'none', md:'flex' },justifyContent:'space-around' }}>
                <Typography >₹ 20</Typography>
                <Typography>Car Fuel</Typography>
                <Typography>Fuel</Typography>
                </Box>
                <Box >
                    <Button variant="outlined" size="small" sx={{mr:1}}>
                        Edit
                    </Button>
                    <Button variant="contained" color="error" size="small">
                        Delete
                    </Button>
                </Box>
            </Box>
        )})}
    </Container>
    )
}
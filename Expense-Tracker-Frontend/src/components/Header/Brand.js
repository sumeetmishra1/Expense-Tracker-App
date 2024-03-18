import { Box, Typography } from "@mui/material";
import Calculate from "@mui/icons-material/Calculate"
import Menu from "@mui/icons-material/Menu"
export function BrandName(){
    return(
        <Box sx={{width:'100%',height:'10vh',backgroundColor:'aliceblue',display:"flex",borderRadius:1 }}>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Calculate sx={{fontSize:40,mt:1,mr:1}}/>
            <Typography sx={{fontFamily:'serif',fontSize:40,color:'#0056ff'}} >Expense Tracker App</Typography>
            </Box>
            <Menu sx={{m:2,fontSize:30}}/>
        </Box>
        
    )
}
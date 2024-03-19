import React from "react";
import { Box, Typography } from "@mui/material";
import Calculate from "@mui/icons-material/Calculate"
import MenuLogo from "@mui/icons-material/Menu"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from "react-router-dom";

export function BrandName(){
        const [anchorEl, setAnchorEl] = React.useState(null);
        const history = useHistory()
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        };
        const handleLogout = () => {
         history.push('/')
        };
    return(
        <Box sx={{width:'100%',height:'10vh',backgroundColor:'aliceblue',display:"flex",borderRadius:1 }}>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Calculate sx={{fontSize:40,mt:1,mr:1}}/>
            <Typography sx={{fontFamily:'serif',fontSize:40,color:'#0056ff'}} >Expense Tracker App</Typography>
            </Box>
            <MenuLogo sx={{m:2,fontSize:30}} onClick={handleClick}/>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={()=>setAnchorEl(null)}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            >
            <MenuItem onClick=
            {()=>{ history.push('/user-details') 
            setAnchorEl(null) }}>Profile</MenuItem>
            <MenuItem onClick={()=>{ history.push('/') 
            setAnchorEl(null) }}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
        </Box>
        
    )
}
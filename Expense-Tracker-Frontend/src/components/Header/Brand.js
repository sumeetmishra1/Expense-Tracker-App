import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Calculate from "@mui/icons-material/Calculate";
import MenuLogo from "@mui/icons-material/Menu";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/Auth";
import { premiumActions } from "../../store/Premium";
import paymentPage from "../ExpensePage/RazorpayPage";
export function BrandName() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const isPremium  = useSelector((state) =>state.premium.isPremium )
  const history = useHistory();

  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    history.push("/");
  };

  const handlePremiumClick = () =>{
    paymentPage((isError)=>{
      console.log(isError)
      if(!isError){
        dispatch(premiumActions.setIsPremium(true))
      }
    })
  }
  
  return (
    <Box
      sx={{
        width: "100%",
        height: "10vh",
        backgroundColor: "aliceblue",
        display: "flex",
        borderRadius: 1,
      }}
    >
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Calculate sx={{ fontSize: 40, mt: 1, mr: 1 }} />
        <Typography
          sx={{ fontFamily: "serif", fontSize: 40, color: "#0056ff" }}
        >
          Expense Tracker App
        </Typography>
      </Box>
      {isAuthenticated?
      <>
      { isPremium ? <Typography 
            sx={{
            mt:2,
            mr: 8,
            fontSize: 30,
            color:"gold",
            textTransform: "none",
            fontFamily:"initial",}}>
            Premium User <WorkspacePremiumIcon color="info" /> </Typography>
      :
      (
        <Button
          sx={{
            mr: 8,
            fontSize: 20,
            textTransform: "none",
            fontFamily: "serif",
            
          }}
          onClick={handlePremiumClick}
        >
          Buy Premium <WorkspacePremiumIcon />
        </Button>
      ) }
      <MenuLogo sx={{ m: 2, fontSize: 30, ml: 8 }} onClick={handleClick} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            history.push("/user-details");
            setAnchorEl(null);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            history.push("/");
            setAnchorEl(null);
          }}
        >
          My account
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      </>
      :
      null}
    </Box>
  );
}

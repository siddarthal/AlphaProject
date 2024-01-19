import React, { useState } from "react";
import { Typography, Grid, Box } from "@mui/material";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link,useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { getAuthToken } from "../util/auth";
const NavBar = ({ handleLog }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate=useNavigate();
  const handleClose = (str) => {
    navigate(str);
    setAnchorEl(null);
  };
  const handleSignout=()=>{
    localStorage.removeItem('accessToken');
    navigate("/signin")
  }
  const token =getAuthToken();
  const tokenBool=token!==null;
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ color: "#F1EFE7", fontFamily: "sans-serif" }}
    >
      <Grid container alignItems="center" item xs={4}>
        <EventAvailableRoundedIcon fontSize="large" />
        <Typography
          variant="h4"
          component={Link}
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            fontFamily: " sans-serif",
          }}
        >
          RelEvent
        </Typography>
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Typography
          variant="h7"
          component={Link}
          to="/events"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            fontFamily: " sans-serif",
            marginLeft: "75px",
          }}
        >
          Explore
        </Typography>
        <Typography
          variant="h7"
          component={Link}
          to="/dashboard"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            fontFamily: " sans-serif",
            marginLeft: "60px",
          }}
        >
          CreateEvents
        </Typography>
        {/* <Typography
            variant="h7"
            component={Link}
            to="/signin"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              fontFamily: " sans-serif",
              marginLeft: "60px",
            }}
          >
            Signin
          </Typography> */}

        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          sx={{paddingLeft:4.9}}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={()=>handleClose("/dashboard")}>My account</MenuItem>
          <MenuItem onClick={()=>handleClose("/channels")}>Channels</MenuItem>
          <MenuItem onClick={handleSignout}>{tokenBool?"signout":"signin"}</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default NavBar;

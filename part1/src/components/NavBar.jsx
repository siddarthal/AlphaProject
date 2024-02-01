import React, { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { Typography, Grid, Box } from "@mui/material";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { getAuthToken } from "../util/auth";
import useMediaQuery from "@mui/material/useMediaQuery";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleClose = (str) => {
    navigate(str);
    setAnchorEl(null);
  };
  const handleSignout = () => {
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };
  const token = getAuthToken();
  const tokenBool = token !== null;
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1195);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSmallScreen]);
  const isWideScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ color: "#fff", fontFamily: "sans-serif" }}
    >
      <Grid container alignItems="center" item xs={4}>
        <EventAvailableRoundedIcon
          fontSize={isWideScreen ? "large" : "default"}
        />
        <Typography
          variant="h4"
          component={Link}
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            fontSize: isWideScreen ? "1.5rem" : "1.26rem",
          }}
        >
          RelEvent
        </Typography>
      </Grid>

      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        {!isSmallScreen && (
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
        )}
        {!isSmallScreen && (
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
        )}
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
          sx={{ paddingLeft: 4.9 }}
        >
          <AccountCircle fontSize={isWideScreen?"small":"medium"} />
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
          {isSmallScreen && (
            <MenuItem
              className="NavbarWindow"
              onClick={() => handleClose("/events")}
            >
              Explore
            </MenuItem>
          )}
          {isSmallScreen && (
            <MenuItem
              className="NavbarWindow"
              onClick={() => handleClose("/dashboard")}
            >
              CreateEvents
            </MenuItem>
          )}
          <MenuItem onClick={() => handleClose("/dashboard/accounts")}>
            My account
          </MenuItem>
          <MenuItem onClick={() => handleClose("/events/channels")}>Channels</MenuItem>
          <MenuItem onClick={() => handleClose("/events/tickets")}>Tickets</MenuItem>
          <MenuItem onClick={handleSignout}>
            {tokenBool ? "signout" : "signin"}
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default NavBar;

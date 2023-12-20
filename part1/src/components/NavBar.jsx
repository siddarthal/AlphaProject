import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";

import { Link } from "react-router-dom";

const NavBar = ({ handleLog }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={2} alignItems="center">
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
        <Typography
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
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NavBar;

import React from "react";
import { Grid, Typography, Box, Container, Stack, Button } from "@mui/material";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import { Outlet } from "react-router-dom";
// import useState from "react";
const Dashboard = () => {
  // const [,] = useState(true);
  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={1.5} sx={{ backgroundColor: "#f0f0f0", paddingTop: 4 }}>
        <LeftSide />
      </Grid>
      <Grid item xs={10.5} sx={{ padding: "16px" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

import React from "react";
import { Grid, Typography, Box, Container, Stack, Button } from "@mui/material";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import { Outlet } from "react-router-dom";
// import useState from "react";
const Dashboard = () => {
  return (
    <Grid container style={{ height: "100vh", backgroundColor: "#F9F5F6" }}>
      <Grid 
        item
        xs={1.9}
        sx={{
          backgroundColor: "#0D162E",
        }}
      >
        <Box sx={{ position: "sticky", top: 0, paddingTop: 4 }}>
          <LeftSide />
        </Box>
      </Grid>
      <Grid item xs={10.1} sx={{ padding: "16px",backgroundColor:"#f9f5f6" }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

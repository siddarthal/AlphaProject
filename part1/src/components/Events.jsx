
import { Box, Stack, Typography,Container,useMediaQuery } from "@mui/material";
import api from "../Services/service";
import Menubar from "./Explore/Menubar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

const Events = () => {
  
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Container>
    <Stack spacing={3}>
      <Typography variant={isWideScreen?"h4":"h5" }sx={{ paddingTop: 10, fontWeight: "bold",paddingBottom:3 }}>
        Explore the best events happening around you
      </Typography>
      <Menubar />
      <Outlet/>
    </Stack>
    </Container>
  );
};

export default Events;

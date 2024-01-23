
import { Box, Stack, Typography,Container } from "@mui/material";
import api from "../Services/service";
import Menubar from "./Explore/Menubar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
const Events = () => {
  const [event, setEvent] = useState([]);
  useEffect(() => {
    api
      .getEvents()
      .then((res) => {
        console.log(res);
        setEvent(res);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <Container>
    <Stack spacing={3}>
      <Typography variant="h4" sx={{ paddingTop: 4, fontWeight: "bold" }}>
        Explore the best events happening around you
      </Typography>
      <Menubar />
      <Outlet event={event}/>
    </Stack>
    </Container>
  );
};

export default Events;

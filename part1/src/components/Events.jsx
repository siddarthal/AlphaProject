import { useEffect, useState } from "react";
import api from "../Services/service";
import { Grid, Stack, Typography } from "@mui/material";
import EventCard from "./EventCard";
import Menubar from "./Explore/Menubar";
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
    <Stack spacing={3}>
      <Typography variant="h4" sx={{paddingTop:4 , fontWeight:"bold"}}>
      Explore the best events happening around you
      </Typography>
      <Menubar/>
      
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {event.map((item, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <EventCard event={item} idx={index} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Events;

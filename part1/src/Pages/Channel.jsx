import { Box, Grid,Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../Services/service";
import ChannelEvents from "../components/Creator/ChannelEvents";
const Channel = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    api
      .getEvents()
      .then((res) => {
        console.log(res);
        setEvents(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Stack spacing={2} sx={{marginTop:3}}>
    <Typography variant="h5" fontWeight={"bold"} >
        Broadcast Channels
    </Typography>

    <Box>
      <Grid container alignContent="center">
        {events.map((item) => {
            return (
          <Grid item xs={6} key={item.EID}>
            <ChannelEvents eventdata={item}/>
          </Grid>)
        })}
      </Grid>
    </Box>
    </Stack>

  );
};
export default Channel;

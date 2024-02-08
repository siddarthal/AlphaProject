import { Box, Grid, Stack, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../Services/service";
import ChannelEvents from "../components/Creator/ChannelEvents";
import { Outlet } from "react-router-dom";
import LeftSideChannels from "../components/Creator/LeftSideChannels";

const Channel = ({ token }) => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchUserData = async () => {
    try {
      if (token !== null) {
        const response = await api.userAccountDatails(token);
        if (response.status === 200) {
          console.log(response.data.id, "userid");
          setUserId(response.data.id);
        } else {
          alert("Unable to fetch user ID");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [token]);

  useEffect(() => {
    if (userId !== null && userId !== undefined && token !== null) {
      api
        .userChannel(userId, token)
        .then((res) => {
          console.log(res);
          setEvents(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId, token]);

  return (
    <Stack spacing={2} sx={{ marginTop: 3 }}>
      <Box
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Grid container spacing={2} alignContent="center">
          <Grid item xs={3}>
            <Paper
              elevation={6}
              sx={{
                overflowY: "auto",
                "&::-webkit-scrollbar": { display: "none" },
                position: "sticky",
                top: 0,
                paddingTop: 4,
                height: "100vh",
                backgroundColor: "#bac8d1",
                color: "black",
              }}
            >
              <LeftSideChannels eventdata={events} token={token} />
            </Paper>
          </Grid>

          <Grid item xs={9}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Channel;

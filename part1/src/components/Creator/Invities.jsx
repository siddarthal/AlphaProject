import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import api from "../../Services/service";
import TicketEvents from "./TicketEvents";
const Invites = () => {
  const [ticket, setTicket] = useState([]);
  const [event, setEvent] = useState([]);
  useEffect(() => {
    api
      .userAccountDatails()
      .then((res) => {
        console.log(res.data.id);
        if (res.status === 200) {
          callTicketDetails(res.data.id);
        } else {
          alert("error in fetching user  details");
        }
      })
      .catch((error) => console.log(error));
  }, []);
  const callTicketDetails = (id) => {
    api
      .fetchTickets(id)
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          console.log("hi");
          setTicket(res.data);
          api
            .fetchEvent(res.data[0].event)
            .then((res) => {
              console.log(res.data);
              if (res.status === 200) {
                setEvent(res.data);
              } else {
                console.log("unable to fetch data of event from server");
              }
            })
            .catch((error) => console.log("error"));
        } else {
          alert("error in fetching ticket details");
        }
      })
      .catch((error) => console.log(error));
  };
  const noInvites = ticket.length == 0;

  return (
    <Box>
      {noInvites ? (
        <Typography variant="h5">No Tickets</Typography>
      ) : (
        <Box>
          <Typography variant="h5">Tickets </Typography>
          <Box sx={{pt:2}}>
          <Grid container alignItems="center" spacing={1}>
            {ticket.map((item) => {
              return (
                <Grid item xs={12} md={6} key={item.TID}>
                  <TicketEvents eventdata={event} />
                </Grid>
              );
            })}
          </Grid>
          </Box>
         
        </Box>
      )}
    </Box>
  );
};

export default Invites;

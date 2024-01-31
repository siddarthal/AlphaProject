import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import api from "../../Services/service";

import Ticket from "./Ticket";
const AllTickets = () => {
  const [ticket, setTicket] = useState([]);
  const [data, setData] = useState(null);
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
      .then((res2) => {
        console.log(res2.data);
        if (res2.status == 200) {
          console.log("hi");
          setTicket(res2.data);
          api
            .userSpecificEvent()
            .then((res) => {
              console.log(res.data);
              if (res.status === 200) {
                filterFunc(res2.data, res.data);
              } else {
                console.log("unable to fetch data of event from server");
              }
            })
            .catch((error) => console.log(error));
        } else {
          alert("error in fetching ticket details");
        }
      })
      .catch((error) => console.log(error));
  };
  const noInvites = ticket.length == 0;
  let eventObj = {};
  const filterFunc = (tickets, events) => {
    const setTick = new Set();
    tickets.forEach((element) => {
      setTick.add(element.event);
    });
    console.log(setTick);
    const filteredEventData = events.filter((event) => setTick.has(event.EID));
    console.log(filteredEventData);
    filteredEventData.forEach((event) => {
      eventObj[event.EID] = event;
    });
    setData(eventObj);
    console.log(eventObj, "eventObj");
  };
  return (
    <Box>
      {noInvites ? (
        <Typography variant="h4" sx={{fontWeight:"bold" ,pt:4}} >No Tickets Booked</Typography>
      ) : (
        <Box>
          <Typography variant="h5" sx={{fontWeight:"bold" ,pt:4 ,pb:4}}>Tickets Booked </Typography>
          <Box sx={{ pt: 2 }}>
            <Grid container alignItems="center" spacing={2}>
              {ticket.map((item) => {
                return (
                  <Grid item xs={12} md={6} key={item.TID}>
                    {data !== null && (
                      // <TicketEvents eventdata={data[item.event]} ticket={ticket} />
                      <Ticket eventdata={data[item.event]} ticket={item} />
                    )}
                  </Grid>
                );
                ("");
              })}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AllTickets;

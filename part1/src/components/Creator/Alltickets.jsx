import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import api from "../../Services/service";
import Loader from "../Explore/Loader";

import Ticket from "./Ticket";
const AllTickets = ({ token }) => {
  const [ticket, setTicket] = useState([]);
  const [data, setData] = useState(null);
  const [loader, setLoading] = React.useState(false);
  useEffect(() => {
    setLoading(true);
    if (token !== null) {
      api
        .userAccountDatails(token)
        .then((res) => {
          console.log(res.data.id);
          if (res.status === 200) {
            callTicketDetails(res.data.id);
          } else {
            alert("error in fetching user  details");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [token]);
  const callTicketDetails = (id) => {
    api
      .fetchTickets(id, token)
      .then((res2) => {
        console.log(res2.data);
        if (res2.status === 200) {
          console.log("hi");

          setTicket(res2.data);
          api
            .getEventsOne()
            .then((res) => {
              console.log(res.status, "status");
              if (res.status === 200) {
                setLoading(false);
                filterFunc(res2.data, res.data);
              } else {
                console.log("unable to fetch data of event from server", res2);
                setLoading(false);
              }
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        } else {
          alert("error in fetching ticket details");
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };
  const noInvites = ticket.length == 0;

  const filterFunc = (tickets, events) => {
    let eventObj = {};
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
      {loader && <Loader />}
      {noInvites ? (
        <Typography variant="h4" sx={{ fontWeight: "bold", pt: 4 }}>
          No Tickets Booked
        </Typography>
      ) : (
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold", pt: 4, pb: 4 }}>
            Tickets Booked{" "}
          </Typography>
          <Box sx={{ pt: 2 }}>
            <Grid container alignItems="center" spacing={2}>
              {ticket.map((item) => {
                return (
                  <Grid item xs={12} md={6} key={item.TID}>
                    {console.log(data, "data")}
                    {data !== null && (
                      // <TicketEvents eventdata={data[item.event]} ticket={ticket} />
                      <Ticket
                        eventdata={data[item.event]}
                        ticket={item}
                        token={token}
                      />
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

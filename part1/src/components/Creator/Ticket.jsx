import React from "react";
import { Box, Paper, Card, CardContent, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/base";
import api from "../../Services/service";
const Ticket = ({ eventdata, ticket, token }) => {
  const imgUrl = eventdata.poster;
  // const imgUrl = "http://127.0.0.1:8000" + eventdata.poster;
  const dateString = eventdata.startDate;
  const dateObj = new Date(dateString);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = weekdays[dateObj.getDay()];
  const dayOfMonth = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear().toString();

  const startEventTime = eventdata.time;
  const eventDuration = eventdata.duration;
  const stime = new Date(eventdata.startDate);
  const currentTime = new Date();
  const timeString = startEventTime;
  const timeParts = timeString.split(":");
  let hours = parseInt(timeParts[0]);
  const minutes = timeParts[1];
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedTime = hours + ":" + minutes + " " + ampm;

  const [durationHours, durationMinutes] = eventDuration.split(".").map(Number);

  const totalStartMinutes = hours * 60 + parseInt(minutes);
  const totalDurationMinutes = durationHours * 60 + durationMinutes;

  const totalEndMinutes = totalStartMinutes + totalDurationMinutes;

  const endHours = Math.floor(totalEndMinutes / 60) % 24;
  const endMinutes = totalEndMinutes % 60;

  const endAmPm = endHours >= 12 ? "PM" : "AM";
  const formattedEndHours = (endHours % 12 || 12).toString().padStart(2, "0");
  const formattedEndMinutes = endMinutes.toString().padStart(2, "0");
  const formattedEndTime =
    formattedEndHours + ":" + formattedEndMinutes + " " + endAmPm;

  console.log("Formatted Start Time:", formattedTime);
  console.log("Formatted End Time:", formattedEndTime);

  const allowedEndHours = (hours === 1 ? 12 : hours - 1)
    .toString()
    .padStart(2, "0");
  const allowedEndTime = allowedEndHours + ":" + minutes + " " + ampm;

  console.log("Allowed End Time:", allowedEndTime);
  const latitude = eventdata.latitude;
  const longitude = eventdata.longitude;
  const locationLink = `https://maps.google.com/?q=${latitude},${longitude}`;
  const handleCancel = (ticketData) => {
    console.log("Cancel Ticket");
    console.log("Ticket Data", ticketData);
    api
      .deleteTicket(ticketData.order_id, token)
      .then((res) => {
        console.log("Ticket Deleted", res);
        if (res.status === 200) {
          alert("Ticket Cancelled and proccessed for refund");
        }
      })
      .catch((err) => {
        console.error("Error", err);
        alert("Unable to cancel ticket at the moment. Please try again later.");
      });
  };
  return (
    <Paper elevation={10}>
      <Card sx={{ maxWidth: 700 }}>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Box>
              <Box
                sx={{
                  width: 350,
                  height: 250,
                  backgroundImage: `url(${imgUrl})`,
                  backgroundSize: "cover",
                  opacity: 0.85,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    color: "darkgray",
                    height: 250,
                    padding: "0 10px",
                    letterSpacing: "0.15em",
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "space-around",
                    writingMode: "vertical-rl",
                    transform: "rotate(-180deg)",
                    fontFamily: "'Staatliches', sans-serif",
                  }}
                >
                  <Typography component="p">RELEVENT</Typography>
                  <Typography component="p" fontWeight={700}>
                    RELEVENT
                  </Typography>
                  <Typography component="p">RELEVENT</Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    height: 250,
                    width: 250,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    padding: 5,
                    fontFamily: "'Staatliches', sans-serif",
                  }}
                >
                  <Typography component="p">{ticket.order_id}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderTop: "1px solid gray",
                  borderBottom: "1px solid gray",
                  paddingY: 1,
                  marginTop: 1,
                }}
              >
                {ticket.ticket_status === "not_paid" ? (
                  <Typography variant="h6" color="red">
                    {" "}
                    Transaction pending{" "}
                  </Typography>
                ) : (
                  <Typography variant="h6">{ticket.ticket_status}</Typography>
                )}
              </Box>
            </Box>
          </Box>
          {/* Card Content */}
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid gray",
                borderBottom: "1px solid gray",
                paddingY: 1,
              }}
            >
              <Typography component="span">{day}</Typography>
              <Typography component="span" className="june-29" color="#d83565">
                {month} {dayOfMonth}
              </Typography>
              <Typography component="span">{year}</Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="h4"
                  style={{ fontFamily: "'Nanum Pen Script', cursive" }}
                >
                  {eventdata.event_name}
                </Typography>
              </Box>

              <Typography variant="h5" align="center" color="#d83565">
                {eventdata.category}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="body1" color="#4a437e">
                  {formattedTime} <span>TO</span> {formattedEndTime}
                </Typography>
                <Typography variant="body1" color="#4a437e">
                  DOORS <span>@</span> {allowedEndTime}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderTop: "1px solid gray",
                  paddingY: 1,
                }}
              >
                <Box
                  sx={{
                    fontSize: 20,
                    paddingX: 1,
                  }}
                >
                  <i className="far fa-smile"></i>
                </Box>
                <Typography component="span">
                  Number of People :{" "}
                  <strong style={{ fontSize: 25 }}>{ticket.num_people}</strong>
                </Typography>
                <Typography component="span" sx={{ pl: 2 }}>
                  <a
                    href={locationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <LocationOnIcon />
                  </a>
                </Typography>
                {ticket.ticket_status === "success" && stime > currentTime && (
                  <Button onClick={() => handleCancel(ticket)}>
                    Cancel Ticket
                  </Button>
                )}
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Paper>
  );
};

export default Ticket;

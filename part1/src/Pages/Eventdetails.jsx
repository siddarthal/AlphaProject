import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Services/service";
import WalletIcon from "@mui/icons-material/Wallet";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  Box,
  Button,
} from "@mui/material";
import image from "../Images/R.jpg";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EventMap from "../components/EventMap";
import ChatBox from "../components/ChatBox";
export default function EventDetails() {
  const { id } = useParams();
  const [val, setVal] = useState(true);
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: "Sample Event Authorised NCC unit of usa",
    description: "This is a sample event description.",
    medium: "offline",
    price: 10,
    category: "Workshop",
    startDate: "2023-01-01T10:00:00+00:00",
    endDate: "2023-01-01T14:00:00+00:00",
    location: ["Higrave maddox mall ,Siddacity", 37.7749, 122.4194],
    image: "https://example.com/sample-image.jpg",
    meet: "online",
    tnc: [
      "You may not be able to attend the live session if you are late.",
      "You may face interruptions during the course of the live stream due to internet connectivity issues.",
      "Show details and the artist lineup are subject to change as per the artist’s discretion.",
      "No refunds on purchased tickets are possible, even in case of any rescheduling.",
    ],
    language: "English",
    duration: "02:00",
    otherField: "This is an additional field if needed",
  });

  useEffect(() => {
    api
      .fetchEvent(id)
      .then((res) => {
        console.log("response", res.data);
        setEvent(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]); // Added id as a dependency for useEffect
  // const startDateString = event.startDate || "2023-01-01T10:00:00+00:00";
  // const startDate = new Date(startDateString);
  const handleChannel = () => {
    setVal(false);
  };
  const handleBuyTicket = () => {
    console.log("clicked buy");
    navigate(`/events/tickets/${id}`);
  };
  // const options = {
  //   weekday: "short",
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   timeZoneName: "short",
  // };

  // const formattedDate = startDate.toLocaleDateString("en-US", options);

  // console.log(formattedDate);
  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid container spacing={2}>
        {/* Part 1 - Event Image */}
        <Grid item xs={8}>
          <Paper elevation={3} style={{ height: "50vh" }}>
            <img
              src={event.poster}
              alt="poster.jpg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 9,
              }}
            />
          </Paper>
        </Grid>

        {/* Part 2 - Maps */}
        <Grid item xs={4}>
          <Paper elevation={6} style={{ height: "50vh" }}>
            <Container>
              <Stack spacing={2}>
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Arial, sans-serif",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {event.event_name}
                </Typography>
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    <CategoryOutlinedIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body1">{event.category}</Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    <CalendarMonthOutlinedIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body1">{event.startDate}</Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    <LocationOnOutlinedIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body1">{event.location}</Typography>
                  </Grid>
                </Grid>
                <EventMap
                  latitude={event.latitude}
                  longitude={event.longitude}
                />
                <Box sx={{ paddingTop: 3, paddingLeft: 3 }}>
                  <Grid container alignItems="center">
                    <Grid item xs={6} container allignItems="center">
                      <WalletIcon />
                      <CurrencyRupeeIcon />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", lineHeight: "inherit" }}
                      >
                        {event.ticket_cost}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Button variant="contained" onClick={handleBuyTicket}>
                        Buy Ticket
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Container>
          </Paper>
        </Grid>

        {/* Part 3 - About */}
        <Grid item xs={8}>
          <Paper elevation={3} style={{ height: "40vh", padding: "20px" }}>
            <Typography
              sx={{ marginLeft: 3, marginBottom: 2 }}
              variant="h5"
              component="h6"
            >
              <b>About</b>
            </Typography>
            <Container>
              <Stack spacing={2}>
                <Typography
                  variant="body"
                  sx={{ lineHeight: 1.6, marginBottom: 2 }}
                >
                  {event.description}
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 1 }}>
                  Terms and Conditions
                </Typography>
                <Typography variant="body" sx={{ marginBottom: 2 }}>
                  <ul style={{ paddingLeft: "20px" }}>
                    <li style={{ marginBottom: "5px" }}>
                      You may not be able to attend the live session if you are
                      late.
                    </li>
                    <li style={{ marginBottom: "5px" }}>
                      You may face interruptions during the course of the live
                      stream due to internet connectivity issues.
                    </li>
                    <li style={{ marginBottom: "5px" }}>
                      Show details and the artist lineup are subject to change
                      as per the artist’s discretion.
                    </li>
                    <li style={{ marginBottom: "5px" }}>
                      No refunds on purchased tickets are possible, even in case
                      of any rescheduling.
                    </li>
                  </ul>
                </Typography>
              </Stack>
            </Container>
          </Paper>
        </Grid>
        {/* <Grid item xs={4}>
          {val ? (
            <Paper elevation={3} style={{ height: "400px" }}>
              <Container>
                <Typography variant="h5">
                  Want volunteer pls join the announcement channel for further
                  instructions
                </Typography>
                <Button variant="contained" onClick={handleChannel}>
                  Join channel
                </Button>
              </Container>
            </Paper>
          ) : (
            <Container>
              <ChatBox />
            </Container>
          )}
        </Grid> */}
      </Grid>
    </Container>
  );
}

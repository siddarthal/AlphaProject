import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Services/service";
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
        console.log("response", res.data[0]);
        setEvent(res.data[0]);
      })
      .catch((error) => console.log(error));
  }, [id]); // Added id as a dependency for useEffect
  const startDateString = event.startDate || "2023-01-01T10:00:00+00:00";
  const startDate = new Date(startDateString);
  const handleChannel = () => {
    setVal(false);
  };
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  const formattedDate = startDate.toLocaleDateString("en-US", options);

  console.log(formattedDate);
  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid container spacing={2}>
        {/* Part 1 - Event Image */}
        <Grid item xs={8}>
          <Paper elevation={3} style={{ height: "60vh" }}>
            <img
              src={image}
              alt=""
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
          <Paper elevation={6} style={{ height: "60vh" }}>
            <Container>
              <Stack spacing={2}>
                <Typography variant="h5" component="h5">
                  <b>{event.title}</b>
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
                    <Typography variant="body1">{formattedDate}</Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    <LocationOnOutlinedIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body1">{event.location[0]}</Typography>
                  </Grid>
                </Grid>
                <EventMap
                  latitude={event.location[1]}
                  longitude={event.location[2]}
                />
              </Stack>
            </Container>
          </Paper>
        </Grid>

        {/* Part 3 - About */}
        <Grid item xs={8}>
          <Paper elevation={3} style={{ height: "400px" }}>
            <Typography sx={{ marginLeft: 3 }} variant="h5" component="h6">
              <b>About</b>
            </Typography>
            <Container>
              <Stack spacing={2}>
                <Typography variant="body">
                  Prepare to loosen up for an extravagant, exclusive show where
                  fans get to dive into the vibrant world of Vikram! Join in the
                  live interaction, fire away your questions, and indulge in
                  delightful chitchat with your beloved star! Youtube video -
                  https://youtube.com/shorts/X6opPQpwMfI?feature=share
                </Typography>
                <Typography variant="h5">Terms and Conditions</Typography>
                <Typography variant="body">
                  {console.log("t and c", event.tnc[0])}
                  {event.tnc.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </Typography>
              </Stack>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={4}>
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
        </Grid>
      </Grid>
    </Container>
  );
}

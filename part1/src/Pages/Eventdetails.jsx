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
  useMediaQuery,
} from "@mui/material";
import { useTheme, createTheme } from "@mui/material/styles";

import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EventMap from "../components/EventMap";

export default function EventDetails({ token }) {
  const { id } = useParams();

  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    api
      .fetchEvent(id)
      .then((res) => {
        if (res.status === 200) {
          console.log("response", res.data);
          setEvent(res.data);
        } else {
          alert("problem in fetching data please try again");
        }
      })
      .catch((error) => console.log(error));
  }, [id]);
  useEffect(() => {
    api.userAccountDatails(token).then((res) => {
      if (res.status === 200) {
        setUserId(res.data.id);
      }
    });
  }, [token]);

  const handleChannel = () => {
    const result = window.confirm("Are you sure to become a volunteer?");
    if (result) {
    const eventName = event.event_name + " Broadcast";
    if (token !== null) {
      api
        .handleChannelSubscribe(userId, id, token)
        .then((res) => {
          console.log("res", res);
          if (res.status === 201) {
            navigate("/events/channels");
          }
        })
        .catch((error) => {
          // console.log("error", error);
          console.log(error.code);
          if (error.code === "ERR_BAD_REQUEST") {
            alert(
              "already party of this channel press okay to continue to the channel"
            );
            navigate(`/events/channels/ind/${id}/${eventName}`);
          } else {
            alert("error in subscribing to the channel");
          }
        });
    }
    }
  };
  const handleBuyTicket = () => {
    console.log("clicked buy");
    navigate(`/events/tickets/${id}`);
  };
  const stime = new Date(event.startDate);
  const currentTime = new Date();
  // const formattedDate = startDate.toLocaleDateString("en-US", options);

  // console.log(formattedDate);
  const theme1 = useTheme();
  const isWideScreen = useMediaQuery(theme1.breakpoints.between("xs","md"));
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        custom: 1000,
        cm1: 1111,
        lg: 1190,
        xl: 1536,
      },
    },
  });
  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid container spacing={2}>
        {/* Part 1 - Event Image */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              height: "55vh",
              // [theme.breakpoints.up("cm1")]: { height: "50vh" },
              // [theme.breakpoints.down("cm1")]: { height: "60vh" },
            }}
          >
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
        <Grid item xs={12} md={4}>
          <Paper
            elevation={6}
            sx={
              {
                // height:"50vh"
                height: isWideScreen?("54vh"):("55vh") ,
                // [theme.breakpoints.up("cm1")]: { height: "50vh" },
                // [theme.breakpoints.down("cm1")]: { height: "40vh" },
              }
            }
          >
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
                <Box
                  sx={{
                    paddingTop: 3,
                    paddingLeft: 3,
                    [theme.breakpoints.up("md")]: { paddingBottom: 3 },
                  }}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={6} container alignItems="center">
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
                      {stime > currentTime ? (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleBuyTicket}
                        >
                          Buy Ticket
                        </Button>
                      ) : (
                        <Typography style={{ color: "red" }}>
                          Event has ended
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Container>
          </Paper>
        </Grid>

        {/* Part 3 - About */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            style={{
              [theme.breakpoints.up("cm1")]: { height: "40vh" },
              [theme.breakpoints.down("cm1")]: { height: "60vh" },
              padding: "20px",
            }}
          >
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
        {event.require_volunteers === true && (
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center" >
              <Button
                variant="contained"
                onClick={handleChannel}
                sx={{ width: isWideScreen ? ("100%"):("50%") }}
              >
                Join channel
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

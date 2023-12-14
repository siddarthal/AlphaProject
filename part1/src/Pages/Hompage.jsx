import { Box, Container, Grid, Typography, Stack, Button } from "@mui/material";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <Box sx={{ marginTop: 5 }}>
      <Container>
        <Stack>
          <Grid container spacing={2} alignItems="center">
            <Grid container alignItems="center" item xs={4}>
              <EventAvailableRoundedIcon fontSize="large" />
              <Typography
                variant="h4"
                component={Link}
                to="/"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                  fontFamily: " sans-serif",
                }}
              >
                RelEvent
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography
                variant="h7"
                component={Link}
                to="/events"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                  fontFamily: " sans-serif",
                  marginLeft: "75px",
                }}
              >
                Explore
              </Typography>
              <Typography
                variant="h7"
                component={Link}
                to="/event"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                  fontFamily: " sans-serif",
                  marginLeft: "60px",
                }}
              >
                CreateEvents
              </Typography>
              <Typography
                variant="h7"
                component={Link}
                to="/signin"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                  fontFamily: " sans-serif",
                  marginLeft: "60px",
                }}
              >
                Signin
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginLeft: 9, marginTop: 15 }}>
            <Container>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", fontFamily: " sans-serif" }}
              >
                Elevate Your Events with Effortless RSVP
              </Typography>
            </Container>
          </Box>
          <Box sx={{ marginLeft: 22, marginTop: 4 }}>
            <Container>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", fontFamily: " sans-serif" }}
              >
                Seamless Creator Management
              </Typography>
            </Container>
          </Box>
          <Box sx={{ marginTop: 10 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Box sx={{ paddingLeft: 47}}>
                  <Button variant="contained" sx={{borderRadius:7}} component={Link} size='large' to="/events">
                    Explore Events
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" sx={{borderRadius:7}} component={Link} size='large' to="/dashboard">
                  Create  Events
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
export default Homepage;

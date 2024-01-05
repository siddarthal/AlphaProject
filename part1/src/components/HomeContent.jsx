import { Box, Grid, Stack, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

const HomeContent = () => {
  return (
    <>
    <Stack>
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
            <Box sx={{ paddingLeft: 47 }}>
              <Button
                variant="contained"
                sx={{ borderRadius: 7 }}
                component={Link}
                size="large"
                to="/events"
              >
                Explore Events
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{ borderRadius: 7 }}
              component={Link}
              size="large"
              to="/dashboard"
            >
              Create Events
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* add content from below */}
      <Box paddingTop={3}>
        <Grid container alignContent="center">
          <Grid item xs={6}>
            Hi
          </Grid>
          <Grid item xs={6}>
          Bye
          </Grid>
        </Grid>
      </Box>
      <Box paddingTop={3}>
        <Grid container alignContent="center">
          <Grid item xs={6}>
            Hi
          </Grid>
          <Grid item xs={6}>
          Bye
          </Grid>
        </Grid>
      </Box>
      </Stack>
    </>
  );
};

export default HomeContent;

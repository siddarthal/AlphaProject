import { Box, Grid, Stack, Typography, Container, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import image from "../Images/home.jpg";


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
                sx={{ borderRadius: 7,backgroundColor:"#CC785C",'&:hover': {
                  backgroundColor: "#CC785C", // Set the hover background color to the same color
                },}}
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
              sx={{ borderRadius: 7,backgroundColor:"#CC785C",'&:hover': {
                backgroundColor: "#CC785C", // Set the hover background color to the same color
              },}}
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
      {/* <Box paddingTop={3}>
        <Grid container alignContent="center">
          <Grid item xs={6}>
            Hi
          </Grid>
          <Grid item xs={6}>
          Bye
          </Grid>
        </Grid>
      </Box> */}
      <Grid container justifyContent="space-between" spacing={8} marginTop={5} style={{ width: '100%', maxWidth: '100%', padding: 0}}>
      <Grid item xs={12} md={6} sx={{ py: 8, md: { py: 16, pt: 16 } }}>
        <img src={image} alt="Hero Image" width="100%" />
      </Grid>
      <Grid item xs={12} md={6} sx={{ py: 8, md: { pl: 16 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="secondary" fontWeight="semibold" sx={{ tracking: 1 }}>
              
            </Typography>
            <Divider orientation="horizontal" sx={{ width: 200, height: 5, bgcolor: 'red' }} />
          </Box>
          <Typography variant="h3">
            Unlock Your Creative Potential
          </Typography>
          <Divider orientation="horizontal" sx={{ width: 500, height: 2, bgcolor: 'cyan' }} />
          <Typography variant="body1" sx={{ maxWidth: '90%', lineHeight: 1.4, py: 4, color: 'text.secondary' }}>
            Our app empowers individual contributors and artists like you to unleash your creativity and organize remarkable events. Whether you're planning a solo exhibition, a live performance, or a collaborative workshop, our platform provides the tools and features you need to make your events a resounding success.
          </Typography>
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{ borderRadius: 7 ,backgroundColor:"#CC785C",'&:hover': {
                backgroundColor: "#CC785C", }}}
              component={Link}
              size="large"
              to="/dashboard"
            >
              Get Started
            </Button>
          </Grid>
        </Box>
      </Grid>
      </Grid>
      {/* <Box paddingTop={3}>
        <Grid container alignContent="center">
          <Grid item xs={6}>
            Hi
          </Grid>
          <Grid item xs={6}>
          Bye
          </Grid>
        </Grid>
      </Box> */}
      <Grid container justifyContent="space-between" spacing={8} marginTop={5}>
      <Grid item xs={12} md={6} sx={{ py: 8, md: { pl: 16 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="secondary" fontWeight="semibold" sx={{ tracking: 1 }}>
              
            </Typography>
            <Divider orientation="horizontal" sx={{ width: 200, height: 5, bgcolor: 'red' }} />
          </Box>
          <Typography variant="h3">
          Security and Reliability
          </Typography>
          <Divider orientation="horizontal" sx={{ width: 500, height: 2, bgcolor: 'cyan' }} />
          <Typography variant="body1" sx={{ maxWidth: '90%', lineHeight: 1.4, py: 4, color: 'text.secondary' }}>
            Rest assured that your event data is safe and secure with our web app. We prioritize data protection and employ industry-standard security measures to safeguard your information. Our reliable infrastructure ensures that your event management process remains uninterrupted, allowing you to focus on what matters most – creating exceptional events.
          </Typography>
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{ borderRadius: 7 ,backgroundColor:"#CC785C",'&:hover': {
                backgroundColor: "#CC785C",}}}
              component={Link}
              size="large"
              to="/dashboard"
            >
              Get Started
            </Button>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ py: 8, md: { py: 16, pt: 16 } }}>
        <img src={image} alt="Hero Image" width="100%" />
      </Grid>
      </Grid>
      </Stack>
    </>
  );
};

export default HomeContent;

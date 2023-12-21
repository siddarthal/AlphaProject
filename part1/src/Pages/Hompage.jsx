import { Box, Container, Grid, Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <Container>
          <NavBar />
        </Container>
      </Box>

      <Container>
        <Stack>
          <Outlet />
        </Stack>
      </Container>

      <Footer />
    </Box>
  );
};
export default Homepage;

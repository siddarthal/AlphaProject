import { Box, Container, Grid, Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <Box
      sx={{
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#3f51b5",
          height: "12vh",
          paddingTop: "25px",
        }}
      >
        <Container>
          <NavBar />
        </Container>
      </Box>
      <Container>
        <Stack>
          <Outlet />
        </Stack>
      </Container>

      {/* <Footer /> */}
    </Box>
  );
};
export default Homepage;

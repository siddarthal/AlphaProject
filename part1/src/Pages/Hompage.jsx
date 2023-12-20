import { Box, Container, Grid, Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const Homepage = () => {
  return (
    <Box sx={{ marginTop: 5 }}>
      <Container>
        <Stack>
          <NavBar/>
          <Outlet/>
        </Stack>
      </Container>
    </Box>
  );
};
export default Homepage;

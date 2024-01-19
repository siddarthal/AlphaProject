import { Box, Container, Grid, Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";


const Homepage = () => {
  return (
    <Box sx={{ backgroundColor:"#F9F5F6"}}>  
      <Box sx={{ width: "100%" ,backgroundColor: '#0D162E', height:"12vh", paddingTop:"25px"}}>
        {/* <Box sx={{bgcolor:"yellow"}}> */}
        <Container>
          <NavBar />
        </Container>

      </Box>
      <Container >
     

        <Stack>
          <Outlet />
        </Stack>
      </Container >

      <Footer />
    </Box>
  );
};
export default Homepage;

import React from "react";
import { Box, Grid, Stack, Typography, Container, Button } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import image from "../Images/home.jpg";
import api from "../Services/service";
import RightSideEvents from "./RighsideEvents";
import DateOnDashboard from "./Creator/DateOnDashboard";
const RightSide = ({ token }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("useeffect");
    const fetchData = async () => {
      try {
        const response = await api.userSpecificEvent(token);
        console.log(response.data, "hi ");
        if (response.status === 200) {
          setData(response.data);
        } else {
          alert("unable to fetch data now try again later");
        }
      } catch {
        console.log("unable to fetch data");
      }
    };
    fetchData();
  }, [token]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/add");
  };


  return (
    <Box>
      <Stack spacing={2}>
        <Grid container spacing={2} sx={{paddingRight:3}}>
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Dashboard
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                startIcon={<CreateOutlinedIcon />}
                onClick={handleClick}
              >
                Create
              </Button>
            </Box>
          </Grid>
          <DateOnDashboard />
        </Grid>

        {data.length ===0 ? (
          <>
            <Box style={{ textAlign: "center", paddingTop: 74 }}>
              <Typography
                variant="h6"
                sx={{ align: "center" }}
                fontWeight="bold"
                color="textSecondary"
              >
                No events found. Add your first event.
              </Typography>
            </Box>
            <Container>
              <Box sx={{ paddingLeft: 30 }}>
                <img src={image} sx={{ width: "100%" }} alt="event.jpg" />
              </Box>
            </Container>
          </>
        ) : (
          <RightSideEvents requiredData={data} />
        )}
      </Stack>
    </Box>
  );
};
export default React.memo(RightSide);

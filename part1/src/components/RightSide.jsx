import React from "react";
import { Box, Grid, Stack, Typography, Container, Button } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import image from "../Images/home.jpg";
import api from "../Services/service";
import RightSideEvents from "./RighsideEvents";
import DateOnDashboard from "./Creator/DateOnDashboard";
const RightSide = () => {
  const [data,setData] = useState([]);
  useEffect(() => {
    
    const fetchData = async () => {
      try{
        const response=await api.userSpecificEvent();
        console.log(response.data,"hi ra pumka");
        setData(response.data);
      }
      catch{
       console.log("unable to fetch data");

      }
     
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/dashboard/add");
  };

  
  return (
    <Box>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Dashboard
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ paddingLeft: 65 }}>
              <Button
                variant="contained"
                startIcon={<CreateOutlinedIcon />}
                onClick={handleClick}
              >
                Create
              </Button>
            </Box>
          </Grid>
          <DateOnDashboard/>
        
        </Grid>

        {(data.length===0) ? (
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
          <RightSideEvents requiredData={data}/>
        )}
      </Stack>
    </Box>
  );
};
export default RightSide;

import React from "react";
import { Box, Grid, Stack, Typography, Container, Button } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import image from "../Images/home.jpg";
const RightSide = () => {
  const [date, setDate] = useState(new Date());
  const [] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  const handleClick = () => {
    navigate("/dashboard/add");
  };

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const formattedTime = date.toLocaleString(undefined, options);
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
          <Box sx={{ paddingLeft: 2 }}>
            <Typography variant="body" fontWeight="light" color="textSecondary">
              {formattedTime} (Indian Standard Time)
            </Typography>
          </Box>
        </Grid>

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
      </Stack>
    </Box>
  );
};
export default RightSide;

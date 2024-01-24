import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Services/service";
import img from "../../Images/R.jpg";
import React from "react";
import { Button, Stack, Box, Typography, Grid, Paper } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Iframe from "react-iframe";
import ChatBox from "../ChatBox";
import AnnouncementChannelCreator from "../ChattNew/AnnouncementChannelCreator ";
export default function UserEventDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [affirmation, setAffirmation] = [];
  console.log(id);
  useEffect(() => {
    api.fetchParticularEvent(id).then((res) => {
      console.log(res);
      setDetails(res);
    });
  }, []);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dashboard/edit/${id}`);
  };
  const handleCopyId = () => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        console.log("ID copied to clipboard:", eventId);
      })
      .catch((error) => {
        console.error("Error copying ID to clipboard:", error);
      });
  };
  const handleDeleteEvent = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDeletion) {
      try {
        const response = await api.deleteParticularEvent(id);
        if (response.status === 204) {
          // Event deletion successful
          console.log(`Event with ID  deleted successfully.`);
          navigate("/dashboard/events");
        } else {
          console.error(`Failed to delete event with ID `);
        }
      } catch (error) {
        // Handle error from API request
        console.error("Error deleting event:", error);
      }
    }
  };
  const handelGoBack = () => {
    navigate(`/dashboard/events/`);
  };
  const googleMapsUrl = `https://maps.google.com/maps?q=${details.latitude},${details.longitude}&hl=en&output=embed`;
  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" color="success" onClick={handleEdit}>
              Edit Event
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteEvent}
            >
              Delete Event
            </Button>
            <Button variant="contained" color="primary" onClick={handleCopyId}>
              Copy Invite ID
            </Button>
            <Button variant="outlined" color="inherit" onClick={handelGoBack}>
              Go Back
            </Button>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper elevation={6} sx={{height:"35vh" , bgcolor: "primary.light",borderRadius: "7px"}} >
              <Box
                sx={{
                  bgcolor: "primary.light",
                  borderRadius: 2,
                  padding:2
                }}
              >
                <Typography variant="h4">{details.title}</Typography>
                <Typography
                  variant="body1"
                  color="common.white"
                  sx={{ paddingTop: 2 }}
                >
                  {details.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
          <Paper elevation={6} sx={{height:"35vh", borderRadius: "7px"}}>
              <img
                src={details.poster}
                alt="Event"
                width="100%"
                style={{
                  objectFit: "cover",
                  height: "100%",
                  borderRadius: "7px",
                }}
              />
            </Paper>
          </Grid>
        </Grid>
        <Stack direction="row" gap={1}>
          <Box flex={1}>
            <AnnouncementChannelCreator idx={id}/>
          </Box>
          <Box
            sx={{
              width: 300,
              p: 2,
              bgcolor: "error.main",
              color: "white",
              borderRadius: 2,
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Iframe
                url={googleMapsUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              <PlaceIcon />
              <Typography>1234 Example Street</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <AttachMoneyIcon />
              <Typography>Free</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <GroupIcon />
              <Typography>No members</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <CheckCircleIcon />
              <Typography>No max participation limit</Typography>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

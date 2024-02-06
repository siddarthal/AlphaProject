import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Services/service";
import img from "../../Images/R.jpg";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import React from "react";
import { Button, Stack, Box, Typography, Grid, Paper } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Iframe from "react-iframe";
import ChatBox from "../ChatBox";
import AnnouncementChannelCreator from "../ChattNew/AnnouncementChannelCreator ";
export default function UserEventDetails({ token }) {
  const { id } = useParams();
  const [details, setDetails] = useState({});

  console.log(id);
  useEffect(() => {
    api.fetchParticularEvent(id, token).then((res) => {
      console.log(res);
      setDetails(res);
    });
  }, [token]);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/dashboard/edit/${id}`);
  };
  const handleCopyId = () => {
    const url = window.location.origin + `/events/${id}`;
    console.log("inside copy id", url);

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("url copied to clipboard");
          console.log("url copied to clipboard", url);
        })
        .catch((error) => {
          console.log(error, "error in copying");
          alert("Error copying ID to clipboard:", error);
        });
    } else if (document.execCommand) {
      const textarea = document.createElement("textarea");
      textarea.textContent = url;
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        alert("url copied to clipboard");
        console.log("url copied to clipboard", url);
      } catch (error) {
        console.log(error, "error in copying");
        alert("Error copying ID to clipboard:", error);
      }

      document.body.removeChild(textarea);
    } else {
      alert("Your browser does not support clipboard operations");
    }
  };
  const handleDeleteEvent = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDeletion) {
      try {
        const response = await api.deleteParticularEvent(id, token);
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
              Copy Invite url
            </Button>
            <Button variant="outlined" color="inherit" onClick={handelGoBack}>
              Go Back
            </Button>
          </Box>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Paper elevation={6} sx={{ height: "40vh", borderRadius: "7px" }}>
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
          <Grid item xs={12} md={4}>
            <Paper elevation={6} sx={{ height: "40vh", borderRadius: "7px" }}>
              <Box
                sx={{
                  borderRadius: 2,
                  padding: 2,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    paddingTop: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {details.event_name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    paddingTop: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {details.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <AnnouncementChannelCreator idx={id} token={token} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 2,
                bgcolor: "error.main",
                color: "white",
                borderRadius: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
              >
                <PlaceIcon />
                <Typography>{details.location}</Typography>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <CurrencyRupeeIcon />
                <Typography>{details.ticket_cost}</Typography>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <GroupIcon />
                <Typography>
                  {details.require_volunteers ? "Volunteers" : "Not Required"}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <CheckCircleIcon />
                <Typography>No max participation limit</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

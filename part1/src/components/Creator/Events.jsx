import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Events = ({ eventdata }) => {
  const navigate = useNavigate();

  const maxDescriptionHeight = 400;
  const imgUrl = "http://127.0.0.1:8000" + eventdata.poster;
  const boxStyle = {
    position: "absolute",
    bottom: 8,
    right: 8,
    background: "#fff",
    padding: "12px 24px",
    borderRadius: 4,
    zIndex: 1,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Added a box shadow for better visibility
  };
  const typoStyle = {
    maxHeight: maxDescriptionHeight,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };
  const dateObj = new Date(eventdata.startDate);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const date = dateObj.getDate();

  const monthStyle = {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 4,
    color: "#333", 
  };

  const dateStyle = {
    fontSize: 16,
    color: "#555", 
  };

  return (
    <Box sx={{ paddingRight: 1 }}>
      <Card sx={{ position: "relative" }}>
        <Box sx={boxStyle}>
          <Box>
            <Typography variant="body1" sx={monthStyle}>
              {month}
            </Typography>
            <Typography variant="body1" sx={dateStyle}>
              {date}
            </Typography>
          </Box>
        </Box>
        <CardMedia
          sx={{
            position: "relative",
            height: 200,
          }}
          image={imgUrl}
          title={eventdata.title}
          alt={eventdata.title}
        >
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              background: "#fff",
              padding: "8px 16px",
              borderRadius: 4,
              zIndex: 1,
            }}
          >
            <Typography variant="body1">{eventdata.category}</Typography>
          </Box>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={typoStyle}>
            {eventdata.event_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={typoStyle}>
            {eventdata.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => navigate(`/dashboard/events/${eventdata.EID}`)}
          >
            More Details
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Events;

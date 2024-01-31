import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TicketEvents = ({ eventdata, ticket }) => {
  const navigate = useNavigate();

  const maxDescriptionHeight = 400;
  const imgUrl = "http://127.0.0.1:8000" + eventdata.poster;
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
      <Paper elevation={10} sx={{ height: "20vh" }}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <img
              src={imgUrl}
              alt={eventdata.title}
              style={{
                padding: 10,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={typoStyle}
            >
              {eventdata.event_name}
            </Typography>
            <Typography variant="body1" sx={monthStyle}>
              {month}
            </Typography>
            <Typography variant="body1" sx={dateStyle}>
              {date}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={typoStyle}
            >
              {ticket.attending}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={typoStyle}
            >
              {ticket.num_people}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default TicketEvents;

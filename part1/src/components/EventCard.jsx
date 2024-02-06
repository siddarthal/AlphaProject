import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import { useNavigate } from "react-router-dom";
export default function EventCard({ event }) {
  const navigate = useNavigate();
  const handleClickOpen = () => {
    console.log(event.EID, "idz");
    navigate(`/events/${event.EID}`);
  };
  const dateObj = new Date(event.startDate);
  const month = dateObj.toLocaleString("default", { month: "short" });
  const date = dateObj.getDate();

  const overlayTopRightStyle = {
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "8px",
    borderRadius: "4px",
  };

  const overlayBottomLeftStyle = {
    position: "absolute",
    bottom: "8px",
    left: "8px",
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "8px",
    borderRadius: "4px",
  };

  const monthDateStyle = {
    fontSize: "18px",
    lineHeight: "24px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    textTransform: "capitalize",
  };

  const categoryStyle = {
    fontSize: "14px",
    lineHeight: "20px",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div style={{ paddingLeft: 16 }}>
      <Card sx={{ maxWidth: 345, marginTop: 6 }}>
        <CardActionArea onClick={handleClickOpen}>
          <div style={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="140"
              image={event.poster}
              alt={event.event_name}
            />
            <div style={overlayTopRightStyle}>
              <Typography variant="body1" sx={monthDateStyle}>
                {month}
              </Typography>
              <Typography variant="body1" sx={monthDateStyle}>
                {date}
              </Typography>
            </div>
            <div style={overlayBottomLeftStyle}>
              <Typography variant="body2" sx={categoryStyle}>
                {event.category}
              </Typography>
            </div>
          </div>

          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {event.event_name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

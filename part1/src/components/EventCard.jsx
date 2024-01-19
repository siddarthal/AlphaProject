import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import image from "../Images/R.jpg";
import { useNavigate } from "react-router-dom";
export default function EventCard({ event }) {
  const navigate = useNavigate();
  const handleClickOpen = () => {
    console.log(event.EID,"idz");
    navigate(`/events/${event.EID}`);
  };
  return (
    <div>
      <Card sx={{ maxWidth: 345, marginTop: 6, backgroundColor: "#F9F5F6", boxShadow: 0}}>
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component="img"
            height="220"
            image={image}
            alt="song music"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="#000000"  fontWeight= "bold">
              {event.event_name}
            </Typography>
            <Typography variant="body2" color="#000000" fontFamily="sans-serif">
              Pls Join us for competition
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

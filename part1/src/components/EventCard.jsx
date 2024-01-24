import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
// import image from "../Images/R.jpg";
import { useNavigate } from "react-router-dom";
export default function EventCard({ event }) {
  const navigate = useNavigate();
  const handleClickOpen = () => {
    console.log(event.EID,"idz");
    navigate(`/events/${event.EID}`);
  };
  // const image = "http://127.0.0.1:8000/media/event_posters/Screenshot_8.png"
  return (
    <div>
      <Card sx={{ maxWidth: 345, marginTop: 6 }}>
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component="img"
            height="140"
            image={event.poster}
            alt="song music"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.event_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pls Join us for competition
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

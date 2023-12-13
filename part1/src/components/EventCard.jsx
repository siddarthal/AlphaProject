import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import image from "../Images/R.jpg";
import { useNavigate } from "react-router-dom";
export default function EventCard({ idx }) {
  const navigate = useNavigate();
  const handleClickOpen = () => {
    navigate(`/events/${idx}`);
  };
  return (
    <div>
      <Card sx={{ maxWidth: 345 ,marginTop: 6}}>
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt="song music"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Music
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

import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Stack
} from "@mui/material";
import image from "../../Images/R.jpg";
const Events = ({ eventData }) => {
  console.log(eventData);
  return (
    <Box>
      <Card sx={{ maxWidth: "40%", maxHeight: "15%" }}>
        <CardMedia sx={{ height: 140 }} image={image} title={eventData.title} />
        <CardContent>
          <Grid conatner>
            <Grid item xs={9}>
              <Typography gutterBottom variant="h5" component="div">
                {eventData.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {eventData.description}
              </Typography>
            </Grid>
            <Grid item xs={3}>
                <Stack spacing={1}>
                   <Box>

                   </Box>
                   <Box>

                   </Box>
                </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
        </CardActions>
      </Card>
    </Box>
  );
};
export default Events;

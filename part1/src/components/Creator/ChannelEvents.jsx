

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
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import image from "../../Images/R.jpg";

const ChannelEvents = ({ eventdata }) => {
  console.log(eventdata,"hi");
  const navigate = useNavigate();

  const maxDescriptionHeight = 400; 

  return (
    <Box sx={{paddingRight:1}}>
      <Card sx={{}}>
        <CardMedia sx={{ height: 200 }} image={image} title={eventdata.title} />
        <CardContent>
          <Grid container>
            <Grid item xs={9}>
              <Typography gutterBottom variant="h5" component="div">
                {eventdata.event_name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  maxHeight: maxDescriptionHeight,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {eventdata.description}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={1}>
                <Box></Box>
                <Box></Box>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate(`/dashboard/channels/${eventdata.EID}`)}>
            View Channel
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ChannelEvents;


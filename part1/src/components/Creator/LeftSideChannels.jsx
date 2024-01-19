

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


const LeftSideChannels = ({ eventdata }) => {
  console.log(eventdata,"hi");
  const navigate = useNavigate();


  return (
    <Box sx={{paddingRight:1}}>
          {eventdata.map((item,idx)=>{
            return
             <Typography key={idx}>
                {item.event_name}
            </Typography>
          })}
    </Box>
  );
};

export default LeftSideChannels;


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
import { red } from "@mui/material/colors";

const LeftSideChannels = ({ eventdata }) => {
  console.log(eventdata, "hi");
  const navigate = useNavigate();
  const handleClick=(id)=>{
    console.log(`clicked ${id}`);
    navigate(`ind/${id}`)
  }
  return (
    <Box sx={{ paddingRight: 1, bgcolor:"" }}>
        <Typography sx={{paddingBottom:3}}>
            CHANNELS
        </Typography>
      <ul className="unorderedList">
        {eventdata.map((item, idx) => {
          return (
            <li key={idx} className="listInside">
              <Button onClick={()=>handleClick(item.EID)}>{item.event_name}</Button>
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

export default LeftSideChannels;

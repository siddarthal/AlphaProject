import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LeftSideChannels = ({ eventdata, token, tracker, setTracker }) => {
  console.log(eventdata, "hi");
  const navigate = useNavigate();
  const handleClick = (id, eventName, idx) => {
    console.log(`clicked ${id}`);
    navigate(`ind/${id}/${eventName}`);
    const arr = new Array(13).fill(false);
    arr[idx] = true;
    setTracker(arr);
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Box>
        <Typography
          sx={{
            paddingBottom: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          variant="h5"
        >
          CHANNELS
        </Typography>
      </Box>

      <Stack direction="column" spacing={2}>
        {eventdata.map((item, idx) => {
          return (
            <Button
              sx={{
                color: tracker[idx] ? "black" : "black",
                onHover: {color: "black"},  
                backgroundColor: tracker[idx] ? "#a8c2d1" : "white",
              }}
              variant={tracker[idx] ? "contained" : "text"}
              key={idx}
              onClick={() => handleClick(item.BID, item.broadcast_name, idx)}
            >
              {item.broadcast_name.replace("Broadcast", "")}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default LeftSideChannels;

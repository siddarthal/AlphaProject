import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LeftSideChannels = ({ eventdata, token }) => {
  console.log(eventdata, "hi");
  const navigate = useNavigate();
  const handleClick = (id, eventName) => {
    console.log(`clicked ${id}`);
    navigate(`ind/${id}/${eventName}`);
  };

  return (
    <Box sx={{ paddingRight: 1 }}>
      <Typography sx={{ paddingBottom: 3 ,pl:3 }} variant="h5">CHANNELS</Typography>
        <Stack direction="column" spacing={2}>
          {eventdata.map((item, idx) => {
            return (
              <Button sx={{color: "black",}}
                key={idx}
                onClick={() => handleClick(item.BID, item.broadcast_name)}
              >
                {item.broadcast_name.replace('Broadcast', '')}
              </Button>
            );
          })}
        </Stack>
    </Box>
  );
};

export default LeftSideChannels;

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LeftSideChannels = ({ eventdata,token }) => {
  console.log(eventdata, "hi");
  const navigate = useNavigate();
  const handleClick = (id,eventName) => {
    console.log(`clicked ${id}`);
    navigate(`ind/${id}/${eventName}`);
  };
  console.log(token);
  return (
    <Box sx={{ paddingRight: 1, bgcolor: "" }}>
      <Typography sx={{ paddingBottom: 3 }}>CHANNELS</Typography>
      <ul className="unorderedList">
        {eventdata.map((item, idx) => {
          return (
            <li key={idx} className="listInside">
              <Button onClick={() => handleClick(item.BID,item.broadcast_name)}>
                {item.broadcast_name}
              </Button>
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

export default LeftSideChannels;

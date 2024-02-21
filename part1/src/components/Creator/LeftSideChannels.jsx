import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LeftSideChannels = ({ eventdata, token, tracker, setTracker }) => {
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(
    eventdata.length > 0 ? eventdata[0].BID : ""
  );

  const handleClick = (id, eventName, idx) => {
    setSelectedCategory(id);
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

      {!isWideScreen ? (
        <Select
          fullWidth
          value={selectedCategory}
          onChange={(event) => {
            const idx = eventdata.findIndex(
              (item) => item.BID === event.target.value
            );
            if (idx !== -1) {
              handleClick(
                eventdata[idx].BID,
                eventdata[idx].broadcast_name,
                idx
              );
            }
          }}
        >
          {eventdata.map((item, idx) => (
            <MenuItem
              key={item.BID}
              value={item.BID}
              sx={{
                color: tracker[idx] ? "black" : "black",
                backgroundColor: tracker[idx] ? "#a8c2d1" : "white",
              }}
            >
              {item.broadcast_name.replace("Broadcast", "")}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Stack direction="column" spacing={2}>
          {eventdata.map((item, idx) => (
            <Button
              sx={{
                color: tracker[idx] ? "black" : "black",
                onHover: { color: "black" },
                backgroundColor: tracker[idx] ? "#a8c2d1" : "white",
              }}
              variant={tracker[idx] ? "contained" : "text"}
              key={idx}
              onClick={() => handleClick(item.BID, item.broadcast_name, idx)}
            >
              {item.broadcast_name.replace("Broadcast", "")}
            </Button>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default LeftSideChannels;

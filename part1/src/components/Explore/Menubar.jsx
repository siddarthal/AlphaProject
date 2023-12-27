import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Menubar = () => {
  const categories = [
    "All",
    "Music",
    "Games",
    "Sports",
    "Arts",
    "Film",
    "Tech",
    "Fashion",
    "Lifestyle",
    "Culture",
    "Charity",
    "Kids",
    "Other",
  ];
  const navigate = useNavigate();
  const [pressedItem, setPressedItem] = useState(null);
  const handleClick = (idx) => {
    setPressedItem(idx);
    if (idx === 0) {
      navigate("/events");
    }
    
  };
  return (
    <Box>
      <Grid container spacing={0.01} alignContent="center">
        {categories.map((items, idx) => (
          <Grid item xs={0.9} key={idx}>
            <Typography
              variant="body"
              className={
                pressedItem === idx ? "customLinkPressed" : "customLink"
              }
              sx={{ fontWeight: "light" }}
              onClick={() => handleClick(idx)}
            >
              {items}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Menubar;

import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Menubar = () => {
  const categories = [
    "All",
    "music",
    "games",
    "sports",
    "arts",
    "film",
    "technology",
    "literature",
    "fashion",
    "lifestyle",
    "other",
  ];
  const navigate = useNavigate();
  const [pressedItem, setPressedItem] = useState(null);
  const handleClick = (idx) => {
    setPressedItem(idx);
    if (idx === 0) {
      navigate("/events/all");
    } else {
      navigate(`/events/eventName/${categories[idx]}`);
    }
  };
  return (
    <Box sx={{ paddingLeft: 0 }}>
      <Grid container spacing={3} alignItems="center">
        {categories.map((items, idx) => (
          <Grid
            item
            key={idx}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography
              variant="body"
              className={
                pressedItem === idx ? "customLinkPressed" : "customLink"
              }
              sx={{
                fontWeight: "light",
                cursor: "pointer",
                fontFamily: "Arial, sans-serif",
                textDecoration: "none", // Remove text decoration
                color: pressedItem === idx ? "blue" : "inherit", // Change color to blue if pressed
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
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

import { Grid, Button } from "@mui/material";
import { useState } from "react";
const ButtonGrouping = ({ tracker, setTracker, handleClick }) => {
  const categories = [
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

  return (
    <Grid container spacing={0.2}>
      {categories.map((item, idx) => (
        <Grid item xs={12} md={1} key={idx}>
          <Button
            name={item}
            sx={{ width: "100%" }}
            variant={tracker[idx] ? "contained" : "outlined"}
            onClick={() => handleClick(item, idx)}
          >
            {item}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default ButtonGrouping;

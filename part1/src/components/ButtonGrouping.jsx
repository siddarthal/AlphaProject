import { Grid, Button } from "@mui/material";
import { useState } from "react";
const ButtonGrouping = () => {
  const [tracker, setTracker] = useState(new Array(12).fill(false));
  const categories = [
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
  const handleClick = (idx) => {
    const arr = new Array(13).fill(false);
    arr[idx] = true;
    setTracker(arr);
  };
  return (
    <Grid container spacing={0.2}>
      {categories.map((item, idx) => (
        <Grid item xs={1} key={idx}>
          <Button
            sx={{ width: "100%" }}
            variant={tracker[idx] ? "contained" : "outlined"}
            onClick={() => handleClick(idx)}
          >
            {item}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default ButtonGrouping;

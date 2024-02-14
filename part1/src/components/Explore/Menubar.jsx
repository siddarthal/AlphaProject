import { Box, Grid, Typography, Container, useMediaQuery, MenuItem, Select, useTheme } from "@mui/material";
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
    "Technology",
    "Literature",
    "Fashion",
    "Lifestyle",
    "Other",
  ];
  const navigate = useNavigate();
  const [pressedItem, setPressedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const handleClick = (idx, categoryName) => {
    setPressedItem(idx);
    setSelectedCategory(categoryName);
    if (idx === 0) {
      navigate("/events/all");
    } else {
      navigate(`/events/eventName/${categoryName}`);
    }
  };

  if (!isWideScreen) {
    return (
      <Container>
        <Box sx={{ textAlign: 'center', paddingBottom: 2 }}>
          <Select value={selectedCategory} onChange={(e) => handleClick(categories.indexOf(e.target.value), e.target.value)}>
            {categories.map((category, idx) => (
              <MenuItem key={idx} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ overflowX: 'auto', paddingLeft: 0 }}>
      <Grid container spacing={3} alignItems="center">
        {categories.map((category, idx) => (
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
                textDecoration: "none",
                color: pressedItem === idx ? "blue" : "inherit",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => handleClick(idx, category)}
            >
              {category}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Menubar;

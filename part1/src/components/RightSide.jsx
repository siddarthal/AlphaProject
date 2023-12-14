import React from "react";
import { Box, Grid, Stack, Typography, Container, Button } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useNavigate } from "react-router-dom";
const RightSide = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard/add");
  };
  return (
    <Box>
      <Stack>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Dashboard
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ paddingLeft: 65 }}>
              <Button
                variant="contained"
                startIcon={<CreateOutlinedIcon />}
                onClick={handleClick}
              >
                Create
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};
export default RightSide;

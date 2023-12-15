import * as React from "react";
import { Box, Stack, Button, TextField, Typography, Grid } from "@mui/material";
import { useState } from "react";
import StartDateTime from "../components/StartDateTime";
import EndDateTime from "../components/EndDateTime";
import ButtonGrouping from "../components/ButtonGrouping";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
const AddEvent = () => {
  const [privacy, setPrivacy] = useState(true);
  const [medium, setMedium] = useState(true);
  const locationdata = ["location ", "latitude", "longitude"];
  const handlePrivacy = (value) => {
    setPrivacy(value);
  };
  const handleMedium = (value) => {
    setMedium(value);
  };
  return (
    <Box>
      <Stack spacing={2.5}>
        <Box></Box>
        <Box></Box>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Create Event
          </Typography>
        </Box>
        <Box>
          <TextField
            sx={{ width: "100%" }}
            required
            id="outlined-basic"
            label="EventTitle"
            variant="outlined"
          />
        </Box>
        <Box>
          <TextField
            sx={{ width: "100%", borderRadius: "8px" }}
            required
            multiline
            rows={2}
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
        </Box>
        <Box>
          <Typography variant="h6">Privacy *</Typography>
        </Box>

        <Box>
          <Box>
            <Grid container spacing={0.2}>
              <Grid item xs={1}>
                <Button
                  variant={privacy ? "contained" : "outlined"}
                  onClick={() => handlePrivacy(true)}
                >
                  Private
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant={privacy ? "outlined" : "contained"}
                  onClick={() => handlePrivacy(false)}
                >
                  Public
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6">Medium *</Typography>
        </Box>

        <Box>
          <Box>
            <Grid container spacing={0.2}>
              <Grid item xs={1}>
                <Button
                  variant={medium ? "contained" : "outlined"}
                  onClick={() => handleMedium(true)}
                >
                  Online
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant={medium ? "outlined" : "contained"}
                  onClick={() => handleMedium(false)}
                >
                  Inperson
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6">Sart Date-Time *</Typography>
        </Box>
        <Box>
          <StartDateTime />
        </Box>
        <Box>
          <Typography variant="h6">End Date-Time *</Typography>
        </Box>
        <Box>
          <EndDateTime />
        </Box>
        <Box>
          <TextField
            sx={{ width: "100%", borderRadius: "8px" }}
            required
            id="outlined-basic"
            label="Duration"
            variant="outlined"
          />
        </Box>
        <Box>
          <TextField
            sx={{ width: "100%", borderRadius: "8px" }}
            id="outlined-basic"
            label="Language"
            variant="outlined"
          />
        </Box>
        <Box>
          <TextField
            sx={{ width: "100%", borderRadius: "8px" }}
            id="outlined-basic"
            label="Max Participants (i.e. RSVPs)"
            variant="outlined"
          />
        </Box>
        <Box>
          <Typography variant="h6">Category *</Typography>
        </Box>
        <Box>
          <ButtonGrouping />
        </Box>
        <Box>
          <TextField
            sx={{ width: "100%", borderRadius: "8px" }}
            required
            multiline
            rows={2}
            id="outlined-basic"
            label="Terms and Conditions"
            variant="outlined"
          />
        </Box>
        {locationdata.map((item, idx) => (
          <TextField
            key={idx}
            sx={{ width: "100%", borderRadius: "8px" }}
            required
            id="outlined-basic"
            label={item}
            variant="outlined"
          />
        ))}
        <Button
          sx={{ width: "20%" }}
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload Image
        </Button>
        <Button sx={{ width: "20%" }} variant="contained" >
          Create 
        </Button>
      </Stack>
    </Box>
  );
};
export default AddEvent;

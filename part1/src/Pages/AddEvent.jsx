import * as React from "react";
import dayjs from "dayjs";
import api from "../Services/service";
import { Box, Stack, Button, TextField, Typography, Grid } from "@mui/material";
import { useState } from "react";
import StartDateTime from "../components/StartDateTime";
import EndDateTime from "../components/EndDateTime";
import ButtonGrouping from "../components/ButtonGrouping";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
// import { styled } from '@mui/material/styles';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const AddEvent = () => {
  const [privacy, setPrivacy] = useState(true);
  const [medium, setMedium] = useState(true);
  const locationdata = ["location", "latitude", "longitude"];
  const [sdate, setsDate] = useState(dayjs("2022-04-17T15:30"));
  const [edate, seteDate] = useState(dayjs("2022-04-17T15:30"));
  const [tracker, setTracker] = useState(new Array(12).fill(false));
  const [isHovered, setHovered] = useState(true);
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: "",
    description: "",
    privacy: true,
    medium: true,
    startDate: sdate,
    endDate: edate,
    duration: "",
    language: "",
    categories: "",
    location: "",
    latitude: "",
    longitude: "",
  });
  const handlePrivacy = (value) => {
    setPrivacy(value);
  };
  const handleMedium = (value) => {
    setMedium(value);
  };
  const handleClick = (item, idx) => {
    const arr = new Array(13).fill(false);
    arr[idx] = true;
    console.log(item);
    setEvent({ ...event, categories: item });
    setTracker(arr);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setEvent({ ...event, [e.target.name]: e.target.value });
  };
  const handleCreate = () => {
    console.log("clicked");
    api
      .submitEvent(event)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const handleHover = () => {
    setHovered(true);
    // console.log("hovered", isHovered);
  };

  const handleLeave = () => {
    setHovered(false);
    // console.log("left overed", isHovered);
  };

  const handlePress = () => {
    // Handle click action here
    navigate("/dashboard");
    console.log("Button clicked!");
  };
  return (
    <Box>
      <Stack spacing={2.5}>
        <Box>
          <Grid
            container
            spacing={1}
            alignItems="center"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handlePress}
          >
            {isHovered ? (
              <Grid item xs={3}>
                <ArrowBackRoundedIcon />
              </Grid>
            ) : (
              <Grid item xs={6}>
                <ArrowBackRoundedIcon fontSize="small" />
                <Typography variant="h6">Go back</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
        <Box></Box>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Create Event
          </Typography>
        </Box>
        <Box>
          <TextField
            onChange={handleChange}
            name="title"
            sx={{ width: "100%" }}
            required
            id="outlined-basic"
            label="EventTitle"
            variant="outlined"
          />
        </Box>
        <Box>
          <TextField
            onChange={handleChange}
            name="description"
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
          <StartDateTime value={sdate} setValue={setsDate} />
        </Box>
        <Box>
          <Typography variant="h6">End Date-Time *</Typography>
        </Box>
        <Box>
          <EndDateTime value={edate} setValue={seteDate} />
        </Box>
        <Box>
          <TextField
            onChange={handleChange}
            name="duration"
            sx={{ width: "100%", borderRadius: "8px" }}
            required
            id="outlined-basic"
            label="Duration"
            variant="outlined"
          />
        </Box>
        <Box>
          <TextField
            onChange={handleChange}
            name="language"
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
          <ButtonGrouping
            tracker={tracker}
            setTracker={setTracker}
            handleClick={handleClick}
          />
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
            onChange={handleChange}
            name={item}
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
        <Button
          sx={{ width: "20%" }}
          variant="contained"
          onClick={handleCreate}
        >
          Create
        </Button>
      </Stack>
    </Box>
  );
};
export default AddEvent;

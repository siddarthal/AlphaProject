import * as React from "react";
import dayjs from "dayjs";
import api from "../Services/service";
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Grid,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import StartDateTime from "../components/StartDateTime";
import EndDateTime from "../components/EndDateTime";
import ButtonGrouping from "../components/ButtonGrouping";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate, Link } from "react-router-dom";
const AddEvent = () => {
  const [privacy, setPrivacy] = useState(true);
  const [medium, setMedium] = useState(true);
  const locationdata = ["location", "latitude", "longitude"];
  const [sdate, setsDate] = useState(dayjs("2022-04-17T15:30"));
  const [edate, seteDate] = useState(dayjs("2022-04-17T15:30"));
  const [tracker, setTracker] = useState(new Array(12).fill(false));
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // const [event, setEvent] = useState({
  //   event_name: "",
  //   startDate: "2024-01-16",
  //   endDate: "2024-01-17",
  //   location: "",
  //   latitude: "",
  //   longitude: "",
  //   time: "09:58:00",
  //   require_volunteers: true,
  //   poster: null,
  //   ticket_cost: "",
  //   description: "T",
  //   medium: "",
  //   category: "",
  //   duration: "",
  //   privacy: false,
  //   user: 1,
  // });
  const [event, setEvent] = useState({
    event_name: "",
    startDate: "2024-01-16",
    endDate: "2024-01-17",
    location: "",
    latitude: "",
    longitude: "",
    time: "09:58:00",
    require_volunteers: true,
    poster: null,
    ticket_cost: "",
    description: "",
    medium: "",
    category: "",
    duration: "",
    privacy: false,
    user: 1,
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
    setEvent({ ...event, category: item });
    setTracker(arr);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    setEvent({ ...event, [e.target.name]: e.target.value });
  };
  const formValidation = () => {
    setOpen(true);
    const newErrors = {};
    if (!event.event_name) {
      newErrors.event_name = " Title is required";
    }
    if (!event.description) {
      newErrors.description = " Description is required";
    }
    if (!event.duration) {
      newErrors.duration = "Duration is required";
    }
    // if (!event.language) {
    //   newErrors.language = "Language is required";
    // }
    if (!event.category) {
      newErrors.categories = "Selecting one category is mandatory";
    }
    if (!event.location) {
      newErrors.location = "Enter  location";
    }
    if (!event.latitude) {
      newErrors.location = "Enter  latitude";
    }
    if (!event.longitude) {
      newErrors.location = "Enter  longitude";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleCreate = () => {
    console.log("clicked");
    if (formValidation()) {
      setErrors({});
      api
        .submitEvent(event)
        .then((res) => {
          console.log("succesfully data posted");
          console.log(res);
          console.log(event);
          // setEvent({
          //   event_name: "",
          //   description: "",
          //   privacy: true,
          //   medium: "",
          //   require_volunteers:true,
          //   startDate: sdate,
          //   endDate: edate,
          //   duration: "",
          //   poster: null,
          //   ticket_cost: "",
          //   language: "",
          //   category: "",
          //   time:"",
          //   location: "",
          //   latitude: "",
          //   longitude: "",
          // });
          // navigate("/dashboard");
        })
        .catch((error) => console.log(error));
    } else {
      console.log("cannot validate", errors.event_name);
    }
  };

  const handlePress = () => {
    // Handle click action here
    navigate("/dashboard");
    console.log("Button clicked!");
  };
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const generateAlert = () => {
    for (let key in errors) {
      if (errors.hasOwnProperty(key) && errors[key] !== null) {
        return (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errors[key]}
            </Alert>
          </Snackbar>
        );
      }
    }
  };
  return (
    <Box>
      {generateAlert()}
      <Stack spacing={2.5}>
        <Box>
          <ArrowBackRoundedIcon fontSize="small" />
          <Link
            to="/dashboard"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Typography variant="h6">Go back</Typography>
          </Link>
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
            name="event_name"
            sx={{ width: "100%" }}
            required
            value={event.event_name}
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
            value={event.description}
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
          <Typography variant="h6">Require_volunteers *</Typography>
        </Box>

        <Box>
          <Box>
            <Grid container spacing={0.2}>
              <Grid item xs={1}>
                <Button
                  variant={medium ? "contained" : "outlined"}
                  onClick={() => handleMedium(true)}
                >
                  TRUE
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant={medium ? "outlined" : "contained"}
                  onClick={() => handleMedium(false)}
                >
                  FALSE
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
            value={event.duration}
            id="outlined-basic"
            label="Duration"
            variant="outlined"
          />
        </Box>
        <Box>
          <TextField
            onChange={handleChange}
            name="medium"
            value={event.medium}
            sx={{ width: "100%", borderRadius: "8px" }}
            id="outlined-basic"
            label="Medium"
            variant="outlined"
          />
        </Box>
        <Box>
          <TextField
            onChange={handleChange}
            name="ticket_cost"
            value={event.ticket_cost}
            sx={{ width: "100%", borderRadius: "8px" }}
            id="outlined-basic"
            label="ticket_cost"
            variant="outlined"
          />
        </Box>
        {/* <Box>
          <TextField
            onChange={handleChange}
            name="language"
            value={event.language}
            sx={{ width: "100%", borderRadius: "8px" }}
            id="outlined-basic"
            label="language"
            variant="outlined"
          />
        </Box> */}
        <Box>
          <Typography variant="h6">Category *</Typography>
        </Box>
        <Box>
          <ButtonGrouping
            tracker={tracker}
            // value={event.}
            setTracker={setTracker}
            handleClick={handleClick}
          />
        </Box>
        {/* <Box>
          <TextField
            sx={{ width: "100%", borderRadius: "8px" }}
            required
            multiline
            rows={2}
            // value={event.title}
            id="outlined-basic"
            label="Terms and Conditions"
            variant="outlined"
          />
        </Box> */}
        {locationdata.map((item, idx) => {
          console.log(item);
          console.log(event);
          const obj = item;
          console.log(event[item], "event item name");
          return (
            <TextField
              onChange={handleChange}
              name={item}
              key={idx}
              sx={{ width: "100%", borderRadius: "8px" }}
              required
              value={event[item]}
              id="outlined-basic"
              label={item}
              variant="outlined"
            />
          );
        })}
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

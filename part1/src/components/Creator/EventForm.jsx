import * as React from "react";
import dayjs from "dayjs";
import api from "../../Services/service";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
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
import StartDateTime from "../StartDateTime";
import EndDateTime from "../EndDateTime";
import ButtonGrouping from "../ButtonGrouping";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
const EventForm = () => {
  const [privacy, setPrivacy] = useState(true);
  const [medium, setMedium] = useState(true);
  const locationdata = ["location", "latitude", "longitude"];
  const [sdate, setsDate] = useState(dayjs("2027-04-17T19:50"));
  const [edate, seteDate] = useState(dayjs("2022-04-17T15:30"));
  const [tracker, setTracker] = useState(new Array(12).fill(false));
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState({
    event_name: "",
    description: "",
    privacy: true,
    medium: "",
    require_volunteers: true,
    startDate: "2024-9-11",
    endDate: "2024-10-10",
    duration: "",
    poster: null,
    ticket_cost: "",
    category: "",
    time: "9:30",
    location: "",
    latitude: "",
    longitude: "",
    user: "1",
  });
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
  useEffect(() => {
    api.fetchParticularEvent(id).then((res) => {
      console.log(res);
      setEvent(res);
      setPrivacy(res.privacy);
      setMedium(res.medium);
      const index = categories.indexOf(res.category);
      const arr = tracker;
      arr[index] = true;
      setTracker(arr);
      const formattedStartDate = dayjs(res.startDate + " " + res.time).format(
        "YYYY-MM-DDTHH:mm"
      );
      const formattedEndDate = dayjs(res.endDate + " " + res.time).format(
        "YYYY-MM-DDTHH:mm"
      );

      setsDate(dayjs(formattedStartDate));
      seteDate(dayjs(formattedEndDate));
      console.log(formattedStartDate, "formattedStartDate");
    });
  }, [id]);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handlePrivacy = (value) => {
    setPrivacy(value);
    setEvent({ ...event, privacy: privacy });
  };
  const handleMedium = (value) => {
    setMedium(value);
    setEvent({ ...event, require_volunteers: !medium });
  };
  const handleClick = (item, idx) => {
    const arr = new Array(13).fill(false);
    arr[idx] = true;
    console.log(item);
    setEvent({ ...event, category: item });
    setTracker(arr);
  };
  const handelDateChange = (value, name) => {
    console.log(value, "value");
    console.log(name, "name");
    const dateValue = dayjs(value);
    const formattedDate = dateValue.format("YYYY-MM-DD");
    const formattedTime = dateValue.format("HH:mm:ss");
    if (name === "endDate") {
      setEvent({
        ...event,
        [name]: formattedDate,
      });
    } else {
      setEvent({
        ...event,
        [name]: formattedDate,
        time: formattedTime,
      });
    }
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    if (e.target.name === "poster") {
      console.log("uploaded");
      setSelectedFile(e.target.files[0]);
      console.log("uploaded");
    } else {
      setEvent({ ...event, [e.target.name]: e.target.value });
    }
  };
  const formValidation = () => {
    setOpen(true);
    const newErrors = {};
    if (!event.event_name) {
      newErrors.title = " Title is required";
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
      const formData = new FormData();
      for (const key in event) {
        formData.append(key, event[key]);
      }
      if (selectedFile) {
        formData.append("poster", selectedFile);
      }
      console.log(formData);
      setErrors({});
      api
        .editParticularEvent(id, formData)
        .then((res) => {
          console.log("succesfully data posted");
          console.log(res);
          // setEventPresent(eventPresent + 1);
          setEvent({
            event_name: "",
            description: "",
            privacy: true,
            medium: "",
            require_volunteers: true,
            // startDate: sdate,
            // endDate: edate,
            startDate: "2024-1-3",
            endDate: "2024-1-3",
            duration: "",
            poster: null,
            ticket_cost: "",
            language: "",
            category: "",
            time: "",
            location: "",
            latitude: "",
            longitude: "",
          });
          navigate(`/dashboard/events/${id}`);
        })
        .catch((error) => console.log(error));
    } else {
      console.log("cannot validate", errors.title);
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
            to="/dashboard/events"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Typography variant="h6">Go back</Typography>
          </Link>
        </Box>
        <Box></Box>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Edit Event{" "}
          </Typography>
        </Box>
        <Box>
          <TextField
            onChange={handleChange}
            name="title"
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
          <StartDateTime value={sdate} handelDateChange={handelDateChange} />
        </Box>
        <Box>
          <Typography variant="h6">End Date-Time *</Typography>
        </Box>
        <Box>
          <EndDateTime value={edate} handelDateChange={handelDateChange} />
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
            label="medium"
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
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload new file
          <VisuallyHiddenInput
            type="file"
            name="poster"
            onChange={handleChange}
          />
        </Button>
        {selectedFile === null ? (
          <div style={{ marginTop: "20px", position: "relative" }}>
            <Typography variant="body1">File uploaded:</Typography>
            <img
              src={event.poster}
              alt="Uploaded File"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                marginTop: "10px",
              }}
            />
          </div>
        ) : (
          <div style={{ marginTop: "20px", position: "relative" }}>
            <Typography variant="body1">File uploaded:</Typography>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Uploaded File"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                marginTop: "10px",
              }}
            />
            <IconButton
              onClick={() => {
                setSelectedFile(null);
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 1,
              }}
            >
              <CancelIcon />
            </IconButton>
          </div>
        )}
        <Button
          sx={{ width: "20%" }}
          variant="contained"
          onClick={handleCreate}
        >
          Edit Event
        </Button>
      </Stack>
    </Box>
  );
};
export default EventForm;

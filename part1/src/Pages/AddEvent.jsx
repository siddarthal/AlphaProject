import * as React from "react";
import dayjs from "dayjs";
import api from "../Services/service";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "../components/Explore/Loader";
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Grid,
  Alert,
  AlertTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState, useEffect } from "react";
import StartDateTime from "../components/StartDateTime";
import EndDateTime from "../components/EndDateTime";
import ButtonGrouping from "../components/ButtonGrouping";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate, Link } from "react-router-dom";
const AddEvent = ({ token }) => {
  const [privacy, setPrivacy] = useState(false);
  const [medium, setMedium] = useState(true);
  const locationdata = ["location", "latitude", "longitude"];
  const [sdate, setsDate] = useState("");
  const [edate, seteDate] = useState("");
  const [tracker, setTracker] = useState(new Array(12).fill(false));
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [event, setEvent] = useState({
    event_name: "",
    startDate: sdate,
    endDate: "2024-02-08",
    location: "",
    latitude: "",
    longitude: "",
    time: "09:58:00",
    require_volunteers: true,
    ticket_cost: "",
    description: "",
    medium: "",
    category: "",
    duration: "",
    privacy: privacy,
    user: 8,
  });
  useEffect(() => {
    api
      .userAccountDatails(token)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          setEvent({ ...event, user: res.data.id });
        } else {
          alert("cant fetch user id");
        }
      })
      .catch((error) => console.log(error));
  }, [token]);
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
    setEvent({ ...event, privacy: value });
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
    console.log(formattedDate, "formattedDate");
    if (name === "endDate") {
      setEvent({
        ...event,
        [name]: formattedDate,
      });
    } else {
      const formattedTime = dateValue.format("HH:mm:ss");
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
      newErrors.event_name = "Title is required";
    }
    if (!event.description) {
      newErrors.description = "Description is required";
    }
    if (!event.duration) {
      newErrors.duration = "Duration is required";
    }
    if (!event.category) {
      newErrors.categories = "Selecting one category is mandatory";
    }
    if (!event.location) {
      newErrors.location = "Enter location";
    }
    if (!event.latitude) {
      newErrors.location = "Enter latitude";
    }
    if (!event.longitude) {
      newErrors.location = "Enter longitude";
    }
    if (!selectedFile) {
      newErrors.poster = "Image is required";
    }

    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const currentTime = new Date();

    if (startDate <= currentTime) {
      newErrors.start_date = "Start date must be atleast one day ahead";
    }
    // if (startDate >= endDate) {
    //   newErrors.start_date = "Start date must be less than end date";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleCreate = () => {
    console.log("clicked");
    if (formValidation()) {
      setErrors({});
      const formData = new FormData();
      for (const key in event) {
        formData.append(key, event[key]);
      }
      if (selectedFile) {
        formData.append("poster", selectedFile);
        console.log("hi name");
      }
      console.log(formData);
      redirectSubmit(formData);
    } else {
      console.log("cannot validate", errors.event_name);
    }
  };
  const redirectSubmit = (formData) => {
    setLoader(true);
    console.log("redirect submit is called");
    console.log(token, "token");
    console.log(formData, "formdata");
    api
      .submitEvent(formData, token)
      .then((res) => {
        if (res.status === 201) {
          console.log("succesfully data posted");
          console.log(res);
          console.log(event);
          setLoader(false);
          setEvent({
            event_name: "",
            description: "",
            privacy: false,
            medium: "",
            require_volunteers: true,
            startDate: sdate,
            endDate: edate,
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

          navigate("/dashboard");
        } else {
          setLoader(false);
          alert("issue in submitting the event");
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log("error", error);
      });
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
      <Box sx={{ opacity: loader && 0.2 }}>
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
              <Grid container spacing={1}>
                <Grid item xs={6} sm={2} md={2} lg={1.3}>
                  <Button
                    variant={privacy ? "contained" : "outlined"}
                    onClick={() => handlePrivacy(true)}
                  >
                    Private
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3} md={2} lg={1.3}>
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
                <Grid item xs={6} sm={2} md={2} lg={1.3}>
                  <Button
                    variant={medium ? "contained" : "outlined"}
                    onClick={() => handleMedium(true)}
                  >
                    TRUE
                  </Button>
                </Grid>
                <Grid item xs={6} sm={2} md={2} lg={1.3}>
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
            <Typography variant="h6">Event Date-Time</Typography>
          </Box>
          <Box>
            <StartDateTime value={sdate} handelDateChange={handelDateChange} />
          </Box>
          {/* <Box>
          <Typography variant="h6">End Date-Time *</Typography>
        </Box> */}
          {/* <Box>
          <EndDateTime value={edate} handelDateChange={handelDateChange} />
        </Box> */}
          <Box>
            <TextField
              onChange={handleChange}
              name="duration"
              sx={{ width: "100%", borderRadius: "8px" }}
              required
              value={event.duration}
              id="outlined-basic"
              label="Duration (in hours)"
              variant="outlined"
            />
          </Box>

          <Box>
            <FormControl sx={{ width: "100%", borderRadius: "8px" }}>
              <InputLabel id="medium-label">Medium</InputLabel>
              <Select
                labelId="medium-label"
                id="medium-select"
                name="medium"
                value={event.medium}
                onChange={handleChange}
                label="Medium"
              >
                <MenuItem value="offline">offline</MenuItem>
                <MenuItem value="online">online</MenuItem>
              </Select>
            </FormControl>
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
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Poster
            <VisuallyHiddenInput
              type="file"
              name="poster"
              onChange={handleChange}
            />
          </Button>
          {selectedFile && (
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
            disabled={loader}
          >
            Create
          </Button>
        </Stack>
      </Box>

      {loader && <Loader />}
    </Box>
  );
};
export default AddEvent;

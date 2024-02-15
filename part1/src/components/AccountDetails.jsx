// AccountDetails.js
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  deepOrange,
  deepPurple,
  teal,
  amber,
  pink,
} from "@mui/material/colors";
import { styled } from "@mui/system";
import api from "../Services/service";
const getRandomColor = () => {
  const colors = [
    deepOrange[500],
    deepPurple[500],
    teal[500],
    amber[500],
    pink[500],
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const AccountDetails = ({ token }) => {
  const [avatar, setAvatar] = useState(null);

  const userData = {
    name: "",
    email: "",
    id: 0,
  };
  const [user, setUser] = useState(userData);
  useEffect(() => {
    api.userAccountDatails(token).then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  }, [token]);
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleUsernameChange = (event) => {
    console.log(event.target.value);
    // setUser({ ...event, [event.target.name]: event.target.value });
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = () => {
    api
      .editAccountDetails(user.name, token)
      .then((res) => {
        console.log(res.data.message);
        alert(res.data.message);
      })
      .catch((error) => console.log(error));
  };
  const avatarColor = getRandomColor();
  
  return (
    <Grid container justifyContent="center" alignItems="center" height="85vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Grid container direction="column" alignItems="center">
          <Box
            sx={{ padding: 3, position: "relative", display: "inline-flex" }}
          >
            <Avatar src={avatar} sx={{ width: 90, height: 90 }} />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="upload-button"
              type="file"
              onChange={handleUpload}
            />
            <label htmlFor="upload-button">
              <IconButton
                color="primary"
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
              >
                <EditIcon />
              </IconButton>
            </label>
          </Box>

          <Typography variant="h5" gutterBottom>
            Hello, {user.name}
          </Typography>
          <TextField
            name="name"
            variant="outlined"
            value={user.name}
            onChange={handleUsernameChange}
            fullWidth
            sx={{ marginBottom: 2, width: "80%" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={user.email}
            fullWidth
            disabled
            sx={{ marginBottom: 2, width: "80%" }}
          />
          <TextField
            label="User ID"
            variant="outlined"
            value={user.id}
            fullWidth
            disabled
            sx={{ width: "80%" }}
          />
          <Button sx={{ paddingTop: 3 }} onClick={handleSubmit}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AccountDetails;

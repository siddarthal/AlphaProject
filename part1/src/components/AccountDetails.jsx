// AccountDetails.js
import React, { useEffect, useState } from "react";
import { Grid, Typography, Avatar, TextField, Button } from "@mui/material";
import {
  deepOrange,
  deepPurple,
  teal,
  amber,
  pink,
} from "@mui/material/colors";
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

const AccountDetails = () => {
  const userData = {
    name: "",
    email: "",
    id: 0,
  };
  const [user, setUser] = useState(userData);
  useEffect(() => {
    api.userAccountDatails().then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  }, []);

  const handleUsernameChange = (event) => {
    console.log(event.target.value);
    // setUser({ ...event, [event.target.name]: event.target.value });
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit=()=>{
    api.editAccountDetails(user.name).then((res)=>{
      console.log(res.data.message);
      alert(res.data.message)
    }).catch(error =>
      console.log(error))
  }
  const avatarColor = getRandomColor();

  return (
    <Grid container justifyContent="center" alignItems="center" height="85vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Grid container direction="column" alignItems="center">
          <Avatar
            sx={{
              bgcolor: avatarColor,
              width: 80,
              height: 80,
              fontSize: 36,
              margin: "16px 0",
            }}
          >
            {/* {user.name.charAt(0)} */}
          </Avatar>
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
          <Button sx={{ paddingTop: 3 }} onClick={handleSubmit} >Save Changes</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AccountDetails;

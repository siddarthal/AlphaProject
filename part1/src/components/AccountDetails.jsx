// AccountDetails.js
import React, { useState } from 'react';
import { Grid, Typography, Avatar, TextField } from '@mui/material';
import { deepOrange, deepPurple, teal, amber, pink } from '@mui/material/colors';

const getRandomColor = () => {
  const colors = [deepOrange[500], deepPurple[500], teal[500], amber[500], pink[500]];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const AccountDetails = () => {
  const userData = {
    username: 'rohiti',
    email: 'john.doe@example.com',
    mobile: '123-456-7890',
  };

  const [editableUsername, setEditableUsername] = useState(userData.username);

  const handleUsernameChange = (event) => {
    setEditableUsername(event.target.value);
  };

  const avatarColor = getRandomColor();

  return (
    <Grid container justifyContent="center" alignItems="center" height="85vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Grid container direction="column" alignItems="center">
          <Avatar sx={{ bgcolor: avatarColor, width: 80, height: 80, fontSize: 36, margin: '16px 0' }}>
            {userData.username.charAt(0)}
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Hello, {userData.username}
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            value={editableUsername}
            onChange={handleUsernameChange}
            fullWidth
            sx={{ marginBottom: 2, width: '80%' }}
          />
          <TextField label="Email" variant="outlined" value={userData.email} fullWidth disabled sx={{ marginBottom: 2, width: '80%' }} />
          <TextField label="Mobile Number" variant="outlined" value={userData.mobile} fullWidth disabled sx={{ width: '80%' }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AccountDetails;



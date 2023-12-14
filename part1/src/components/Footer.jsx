// Footer.js
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: '16px',
  backgroundColor: '#3f51b5', // Customize the background color
  color: '#fff', // Customize the text color
  textAlign: 'center',
};

const Footer = () => {
  return (
    <Paper elevation={3} style={footerStyle}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Typography>
    </Paper>
  );
};

export default Footer;

import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, Typography, Link, Container, Divider, Grid, IconButton, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";


const Footer = () => {
  const [isContentOverflowing, setIsContentOverflowing] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      const body = document.body;
      const html = document.documentElement;
      const documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowHeight = window.innerHeight;

      setIsContentOverflowing(documentHeight > windowHeight);
    };

    // Initial check
    checkOverflow();

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    // Observe changes on the footer
    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const footerStyle = {
    top : 'auto',
    bottom: 0,
    left: 0,
    marginTop : '15px',
    width: '100%',
    padding: '16px',
    backgroundColor: '#3f51b5', // Customize the background color
    color: '#fff', // Customize the text color
    textAlign: 'center',
  };

  return (
    <AppBar ref={footerRef} position={isContentOverflowing ? 'static' : 'fixed'} style={footerStyle}>
      <Box width="100%">
        <Container>
          <Toolbar>
          <EventAvailableRoundedIcon fontSize="medium" />
        <Typography
           component={Link}
           to="/"
           style={{
             textDecoration: "none",
             color: "inherit",
             fontWeight: "bold",
             fontFamily: "sans-serif",
           }}
         >
           RelEvent
         </Typography>

            {/* Links in the top-right corner */}
            <div style={{ marginLeft: 'auto' }}>
              <Link href="/events" color="inherit" style={{ marginRight: '20px', fontFamily:"sans-serif" ,textDecoration : "none" }}>
                Events
              </Link>
              <Link href="/dashboard" color="inherit" style={{ marginRight: '20px', fontFamily:"sans-serif",textDecoration:"none" }}>
                Dashboard
              </Link>
            </div>
          </Toolbar>

          {/* Horizontal line */}
          <Divider />

          {/* Logos of Instagram, Twitter, and GitHub in the bottom center */}
          <Grid container justifyContent="center" alignItems="center" style={{ padding: '20px 0' }}>
            <IconButton href="https://instagram.com/" target="_blank" color="inherit">
              <InstagramIcon />
            </IconButton>
            <IconButton href="https://twitter.com/" target="_blank" color="inherit">
              <TwitterIcon />
            </IconButton>
            <IconButton href="https://github.com/" target="_blank" color="inherit">
              <GitHubIcon />
            </IconButton>
          </Grid>

          {/* Copyright text at the bottom, centered */}
          <Box mt={2} mb={2} textAlign="center">
            <Typography variant="caption" color="textSecondary">
              © Rel-Event 2023 | All rights reserved
            </Typography>
          </Box>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Footer;

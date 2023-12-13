import React, { useEffect, useState } from 'react';
import { IconButton, Typography } from '@mui/material';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled to a certain position (e.g., 200 pixels from the top)
      const scrolled = window.scrollY > 200;
      setIsVisible(scrolled);
    };

    // Attach the event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ display: isVisible ? 'block' : 'none', backgroundColor: '#673ab7', color: '#fff', padding: '10px', position: 'fixed', bottom: 0, width: '100%', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        {/* Replace these with your actual social media links/icons */}
        <IconButton color="inherit">
          {/* Your social media icon (e.g., Facebook) */}
          {/* <FacebookIcon /> */}
        </IconButton>
        <IconButton color="inherit">
          {/* Your social media icon (e.g., Twitter) */}
          {/* <TwitterIcon /> */}
        </IconButton>
        <IconButton color="inherit">
          {/* Your social media icon (e.g., Instagram) */}
          {/* <InstagramIcon /> */}
        </IconButton>
      </div>
      <Typography variant="body2">
        &copy; 2023 Your Company Name. All rights reserved.
      </Typography>
    </div>
  );
};

export default Footer;

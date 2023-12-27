import { useEffect, useState } from "react";
import { Box,Typography } from "@mui/material";
const DateOnDashboard = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const formattedTime = date.toLocaleString(undefined, options);
  return (
    <Box sx={{ paddingLeft: 2 }}>
    <Typography variant="body" fontWeight="light" color="textSecondary">
      {formattedTime} (Indian Standard Time)
    </Typography>
    </Box>
  );
};
export default DateOnDashboard;

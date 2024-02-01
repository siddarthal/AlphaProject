import { Box, Grid, Paper, Typography, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RightsideEvents = ({ requiredData ,token}) => {
  const navigate = useNavigate();
  const [arrayDisplay, setArrayDisplay] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const specificGroupFetch = ["events", "private", "public", "offline", "online"];

  useEffect(() => {
    const arr = [
      { count: 0, content: "total events added", data: [] },
      { count: 0, content: "private events added", data: [] },
      { count: 0, content: "public events added", data: [] },
      { count: 0, content: "offline events added", data: [] },
      { count: 0, content: "online events added", data: [] },
    ];
    arr[0].count = requiredData.length;
    requiredData.forEach((element) => {
      if (element.privacy) {
        arr[1].count += 1;
        arr[1].data.push(element);
      }
      if (!element.privacy) {
        arr[2].count += 1;
        arr[2].data.push(element);
      }
      if (element.medium === "offline") {
        arr[3].count += 1;
        arr[3].data.push(element);
      }
      if (element.medium === "online") {
        arr[4].count += 1;
        arr[4].data.push(element);
      }
    });
    setArrayDisplay(arr);
  }, [requiredData]);
  console.log(arrayDisplay,"arr");
  const handleGridItemHover = (index) => {
    setHoveredIndex(index);
  };

  const handleRedirect = (eventId) => {
    console.log(eventId);
    console.log(specificGroupFetch[eventId]);
    if (eventId == 0) {
      navigate(`/dashboard/events`);
    } else {
      navigate(`/dashboard/eventGroupings/${specificGroupFetch[eventId]}`);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {arrayDisplay.map((item, idx) => (
          <Grid
            item
            xs={12}
            md={2.3}
            key={idx}
            onMouseEnter={() => handleGridItemHover(idx)}
            onMouseLeave={() => handleGridItemHover(null)}
          >
            <Paper variant="outlined" sx={{ height: "25vh" }}>
              <Typography variant="h1" style={{ textAlign: "center" }}>
                {item.count}
              </Typography>
              <Typography variant="subtitle1" style={{ textAlign: "center" }}>
                {item.content}
              </Typography>

              {hoveredIndex === idx && (
                <Box sx={{ paddingLeft: "45px" }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleRedirect(idx)}
                  >
                    View Events
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RightsideEvents;

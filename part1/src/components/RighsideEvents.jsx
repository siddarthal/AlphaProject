import { Box, Grid, Paper, Typography } from "@mui/material";

const RightsideEvents = () => {
  const arr = [
    { count: 1, content: "total events added" },
    { count: 0, content: "private events added" },
    { count: 1, content: "public events added" },
    { count: 1, content: "offline events added" },
    { count: 0, content: "online events added" },
  ];
  return (
    <Box>
      <Grid container spacing={2}>
        {arr.map((item, idx) => (
          <Grid item xs={2.3}  key={idx}>
            <Paper variant="outlined">
              <Typography variant="h1" style={{ textAlign: 'center' }}>{item.count}</Typography>
              <Typography variant="subtitle1" style={{ textAlign: 'center' }}>{item.content}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default RightsideEvents;

import { useEffect, useState } from "react";
import api from "../Services/service";
import { Box, Grid, Typography, Button, Stack } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useNavigate } from "react-router-dom";
import Events from "./Creator/Events";
const UserEventDetails = ({ token }) => {
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api
      .userSpecificEvent(token)
      .then((res) => {
        console.log(res.data);
        setEventData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <Box>
        {/* Hi */}
        <Stack spacing={6}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h4" fontSize="bold">
                Your Events
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box
                display="flex"
                justifyContent="flex-end"
                sx={{ paddingRight: 3 }}
              >
                <Button
                  variant="contained"
                  startIcon={<CreateOutlinedIcon />}
                  onClick={() => navigate("/dashboard/add")}
                >
                  Create
                </Button>
              </Box>
            </Grid>
          </Grid>
          {eventData[0] ? (
            <Grid container spacing={4}>
              {eventData.map((item, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                  {" "}
                  <Events eventdata={item} />{" "}
                </Grid>
              ))}
            </Grid>
          ) : (
            // <p></p>
            <Typography variant="body">
              There are no events please add events
            </Typography>
          )}
        </Stack>
      </Box>
    </>
  );
};
export default UserEventDetails;

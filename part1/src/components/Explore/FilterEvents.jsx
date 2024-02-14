import { Box, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../../Services/service";
import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import EventCard from "../EventCard";
const FilterEvents = ({token}) => {
  const [event, setEvent] = useState([]);
  const [user, setUser] = useState(0);

  const { eventName } = useParams();
  useEffect(() => {
    api.userAccountDatails(token).then((res) => {
      console.log(res.data);
      setUser(res.data.id);
    });
    api
      .getEvents()
      .then((res) => {
        console.log(res);
        setEvent(res);
      })
      .catch((error) => console.log("error", error));
  }, [token]);
  console.log(eventName);
  console.log(event);
  const category = { [eventName]: [] };
  const lowerCaseEventName = eventName.toLowerCase();
  console.log(lowerCaseEventName, "LCE")
  event.forEach((item) => {
    if (item.category === lowerCaseEventName) {
      category[eventName].push(item);
    }
  });
  const data = (category[eventName].filter((item) => item.privacy === false)).filter((item) => item.user !== user).reverse();
  console.log(category);
  return (
    <Box>
      <Typography variant="h5" fontStyle="bold">
        {eventName}
      </Typography>
      <Grid container spacing={1} alignItems="center">
        {data.map((item) => {
          console.log("in the blood", item.EID);
          return (
            <Grid item xs={12} md={4} key={item.EID}>
              <EventCard event={item} />
            </Grid>
          );
        })}
      </Grid>
      {/* <Carousel category={category} categoryName={eventName}/> */}
    </Box>
  );
};
export default FilterEvents;

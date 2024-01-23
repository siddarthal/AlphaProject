import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../../Services/service";
import { useEffect, useState } from "react";
import Carousel from "./Carousel";
const FilterEvents = () => {
    const [event, setEvent] = useState([]);
 
  const { eventName } = useParams();
  useEffect(() => {
    api
      .getEvents()
      .then((res) => {
        console.log(res);
        setEvent(res);
      })
      .catch((error) => console.log("error", error));
  }, []);
  console.log(eventName);
  console.log(event);
  const category ={ [eventName]:[]};
  event.forEach((item) => {
    if (item.category === eventName) {
      category[item.category].push(item);
    }
  });
  console.log(category);
  return (
    <Box>

      <Carousel category={category} categoryName={eventName}/>
    </Box>
  );
};
export default FilterEvents;

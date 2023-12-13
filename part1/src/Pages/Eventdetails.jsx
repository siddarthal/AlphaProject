import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Services/service";
import { Container, Grid } from "@mui/material";
import image from "../Images/R.jpg";
export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  useEffect(() => {
    api
      .fetchEvent(id)
      .then((res) => {
        console.log("response", res.data);
        setEvent(event);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Container sx={{ marginTop: 5}}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <img
              src={image}
              alt=""
              style={{ width: "90%", borderRadius: 15 }}
            />
          </Grid>
          <Grid item xs={3}>
            Maps
          </Grid>
          <Grid item xs={4}>
            About
          </Grid>
          <Grid item xs={8}></Grid>
        </Grid>
      </Container>
    </div>
  );
}

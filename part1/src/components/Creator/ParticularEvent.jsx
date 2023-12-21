import { Box, Container, Grid, Paper, Stack ,Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/service";
import img from "../../images/R.jpg";
const ParticularEvent = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  console.log(id);
  useEffect(() => {
    api.fetchParticularEvent(id).then((res) => console.log(res));
  }, []);
  return (
    <>
      <Box sx={{ marginTop: 3 }}>
        <Container>
          <Stack spacing={4}>
            <Grid container>
              <Grid item xs={8}>
                <Paper elevation={6} sx={{alignContent:"center"}}>
                    <Button>
                        Hi
                    </Button>
                  <img
                    src={img}
                    alt="Background"
                    style={{
                      width: "100%",
                      height: "10%",
                      objectFit: "cover",
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  elevation={6}
                  sx={{
                    marginLeft: 2,
                    width: "100%",
                    height: "100%",
                    
                  }}
                >
                  
                </Paper>
              </Grid>
            </Grid>

            <Paper elevation={6}>Hi ra bulle ke ball</Paper>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
export default ParticularEvent;

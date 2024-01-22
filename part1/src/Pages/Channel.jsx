// import { Box, Grid,Stack, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import api from "../Services/service";
// import ChannelEvents from "../components/Creator/ChannelEvents";
// import { Outlet } from "react-router-dom";
// import LeftSideChannels from "../components/Creator/LeftSideChannels";
// const Channel = () => {
//   const [events, setEvents] = useState([]);
//   useEffect(() => {
//     api
//       .getEvents()
//       .then((res) => {
//         console.log(res);
//         setEvents(res);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);
//   return (
//     <Stack spacing={2} sx={{marginTop:3}}>

//     <Box>
//       <Grid container alignContent="center">

//         <Grid item xs={3} >
//           <LeftSideChannels eventdata={events}/>
//         </Grid>
//         <Grid item xs={9}>
//           <Outlet/>
//         </Grid>
//       </Grid>
//     </Box>
//     </Stack>

//   );
// };
// export default Channel;
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../Services/service";
import ChannelEvents from "../components/Creator/ChannelEvents";
import { Outlet } from "react-router-dom";
import LeftSideChannels from "../components/Creator/LeftSideChannels";

const Channel = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api
      .getEvents()
      .then((res) => {
        console.log(res);
        setEvents(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Stack spacing={2} sx={{ marginTop: 3 }}>

      <Box sx={{ overflowY: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
        <Grid container alignContent="center">

          <Grid item xs={3} sx={{ overflowY: 'auto', height: '100vh', '&::-webkit-scrollbar': { display: 'none' } }}>
            <LeftSideChannels eventdata={events} />
          </Grid>

          <Grid item xs={9}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Channel;

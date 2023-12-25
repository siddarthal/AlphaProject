// import { Box, Container, Grid, Paper, Stack ,Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Services/service";
import img from "../../Images/R.jpg";
// const ParticularEvent = () => {
// const { id } = useParams();
// const [details, setDetails] = useState({});
// console.log(id);
// useEffect(() => {
//   api.fetchParticularEvent(id).then((res) => console.log(res));
// }, []);
//   return (
//     <>
//       <Box sx={{ marginTop: 3 }}>
//         <Container>
//           <Stack spacing={4}>
//             <Grid container>
//               <Grid item xs={8}>
//                 <Paper elevation={6} sx={{alignContent:"center"}}>
//                     <Button>

//                     </Button>
//                   <img
//                     src={img}
//                     alt="Background"
//                     style={{
//                       width: "100%",
//                       height: "10%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 </Paper>
//               </Grid>
//               <Grid item xs={4}>
//                 <Paper
//                   elevation={6}
//                   sx={{
//                     marginLeft: 2,
//                     width: "100%",
//                     height: "100%",

//                   }}
//                 >

//                 </Paper>
//               </Grid>
//             </Grid>

//             <Paper elevation={6}>Hi ra bulle ke ball</Paper>
//           </Stack>
//         </Container>
//       </Box>
//     </>
//   );
// };
// export default ParticularEvent;

import React from "react";
import { Button, Box, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Iframe from "react-iframe";
export default function UserEventDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [affirmation,setAffirmation]=([])
  console.log(id);
  useEffect(() => {
    api.fetchParticularEvent(id).then((res) => {
      console.log(res);
      setDetails(res);
    });
  }, []);
  const navigate=useNavigate();

  const handleEdit=()=>{
    navigate(`/dashboard/edit/${id}`)
  }
  const handleCopyId=()=>{

  }
  const handleDelete=()=>{

  }
  const handelGoBack=()=>{

  }
  const googleMapsUrl = `https://maps.google.com/maps?q=${details.latitude},${details.longitude}&hl=en&output=embed`;
  return (
    <Box sx={{ p: 2 }}>
        
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" color="success" onClick={handleEdit}>
            Edit Event
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete} >
            Delete Event
          </Button>
          <Button variant="contained" color="primary" onClick={handleCopyId}>
            Copy Invite ID
          </Button>
          <Button variant="outlined" color="inherit" onClick={handelGoBack}>
            Go Back
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        <Box sx={{ flex: 1 }}>
          <img src={img} alt="Event" width="600" height="400" />
        </Box>

        <Box
          sx={{
            width: 300,
            p: 2,
            bgcolor: "error.main",
            color: "white",
            borderRadius: 2,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Iframe
              url={googleMapsUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
            <PlaceIcon />
            <Typography>1234 Example Street</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <AttachMoneyIcon />
            <Typography>Free</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <GroupIcon />
            <Typography>No members</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <CheckCircleIcon />
            <Typography>No max participation limit</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 2, mt: 2, bgcolor: "primary.light", borderRadius: 2 }}>
        <Typography variant="h4">{details.title}</Typography>
        <Typography variant="body1" color="common.white" sx={{paddingTop:2}}>
          {details.description}
        </Typography>
      </Box>
    </Box>
  );
}

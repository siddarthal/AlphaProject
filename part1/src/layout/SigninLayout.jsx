import { Outlet } from "react-router-dom";
import { Box, Grid } from "@mui/material"
import Image from "../Images/home.jpg"
const SigninLayout = () => {
    return (
        <Box>

            <Grid container spacing={2} style={{ height: "100vh" }}>
                <Grid item xs={4} >
                    <Outlet />
                </Grid>
                <Grid item xs={8}  >
                    <Box sx={{ paddingTop: 5, paddingLeft: 4 }}>
                        <img src={Image} alt="image" />

                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
export default SigninLayout;
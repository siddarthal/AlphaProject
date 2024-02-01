
import { Box, Typography, Grid } from "@mui/material";

const Invites = () => {
  const noInvites=true;
    <Box>
      {noInvites ? (
        <Typography variant="h5">No Invities</Typography>
      ) : (
        <Box>
          Invities
        </Box>
      )}
    </Box>

};

export default Invites;

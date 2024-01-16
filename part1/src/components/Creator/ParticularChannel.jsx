import { Box, Typography, Stack } from "@mui/material";
import ChatBox from "../ChatBox";
const ParticularChannel = () => {
  return (
    <Box>
      <Stack spacing={2}>
        <Typography>Channel</Typography>
        <Box>
          <ChatBox />
        </Box>
      </Stack>
    </Box>
  );
};
export default ParticularChannel;

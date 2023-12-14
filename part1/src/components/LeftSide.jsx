import { Grid, Typography, Box, Container, Stack, Button } from "@mui/material";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
const LeftSide = () => {
  return (
    <div>
      <Stack spacing={4}>
        <Container>
          <Link to="/">
            <EventAvailableRoundedIcon fontSize="large" />
          </Link>
        </Container>
        <Box>
          <Container>
            <Button variant="text" startIcon={<HomeIcon />}>
              Home
            </Button>
          </Container>
        </Box>
        <Box>
          <Container>
            <Button variant="text" startIcon={<EventAvailableOutlinedIcon />}>
              Events
            </Button>
          </Container>
        </Box>

        <Box>
          <Container>
            <Button variant="text" startIcon={<PeopleAltOutlinedIcon />}>
              RSVPS
            </Button>
          </Container>
        </Box>
        <Box>
          <Container>
            <Button variant="text" startIcon={<LocalActivityOutlinedIcon />}>
              Invities
            </Button>
          </Container>
        </Box>
        <Box>
          <Container>
            <Button
              variant="text"
              startIcon={<CircleNotificationsOutlinedIcon />}
            >
              Notifications
            </Button>
          </Container>
        </Box>
        <Box style={{ position: "fixed", bottom: 0 }}>
          <Container>
            <Button variant="text" startIcon={<PersonOutlineOutlinedIcon />}>
              Account
            </Button>
          </Container>
        </Box>
      </Stack>
    </div>
  );
};
export default LeftSide;

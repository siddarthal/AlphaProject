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
import { useNavigate } from "react-router-dom";
const LeftSide = () => {
  const navigate = useNavigate();
  const handleeHome = () => {
    navigate("/dashboard");
  };
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
            <Button
              variant="text"
              startIcon={<HomeIcon />}
              onClick={handleeHome}
            >
              Home
            </Button>
          </Container>
        </Box>
        <Box>
          <Container>
            <Button
              onClick={() => navigate("events")}
              variant="text"
              startIcon={<EventAvailableOutlinedIcon />}
            >
              Events
            </Button>
          </Container>
        </Box>

        <Box>
          <Container>
            <Button variant="text" startIcon={<PeopleAltOutlinedIcon />} onClick={() => navigate("rsvps")}>
              RSVPS
            </Button>
          </Container>
        </Box>
        <Box>
          <Container>
            <Button variant="text" startIcon={<LocalActivityOutlinedIcon />} onClick={() => navigate("invities")}>
              Invities
            </Button>
          </Container>
        </Box>
        <Box>
          <Container>
            <Button
              variant="text"
              startIcon={<CircleNotificationsOutlinedIcon />} onClick={() => navigate("notifications")}
            >
              Notifications
            </Button>
          </Container>
        </Box>
        <Box style={{ bottom: 0 }}>
          <Container>
            <Button
              onClick={() => navigate("accounts")}
              variant="text"
              startIcon={<PersonOutlineOutlinedIcon />}
            >
              Account
            </Button>
          </Container>
        </Box>
      </Stack>
    </div>
  );
};
export default LeftSide;


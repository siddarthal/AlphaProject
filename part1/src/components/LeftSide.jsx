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
            <EventAvailableRoundedIcon fontSize="large" style={{ color: '#F9F5F6' }}/>
          </Link>
        </Container >
        <Box>
          <Container >
            <Button 
              variant="text"
              startIcon={<HomeIcon />}
              onClick={handleeHome}
              sx={{ color: '#F9F5F6', fontFamily: 'sans-serif' }}
            >
              Home
            </Button>
          </Container>
        </Box>
        <Box>
          <Container >
            <Button
              onClick={() => navigate("events")}
              variant="text"
              startIcon={<EventAvailableOutlinedIcon />}
              sx={{ color: '#F9F5F6', fontFamily: 'sans-serif' }}
            >
              Events
            </Button>
          </Container>
        </Box>

        <Box>
          <Container>
            <Button variant="text" startIcon={<PeopleAltOutlinedIcon />} onClick={() => navigate("rsvps")} sx={{ color: '#F9F5F6', fontFamily: 'sans-serif' }}>
              
              RSVPS
            </Button>
          </Container>
        </Box>
        <Box>
          <Container>
            <Button variant="text" startIcon={<LocalActivityOutlinedIcon />} onClick={() => navigate("invities")} sx={{ color: '#F9F5F6', fontFamily: 'sans-serif' }}>
              Invities
            </Button>
          </Container>
        </Box>
        <Box>
          <Container>
            <Button
              variant="text"
              startIcon={<CircleNotificationsOutlinedIcon />} onClick={() => navigate("notifications")}
              sx={{ color: '#F9F5F6', fontFamily: 'sans-serif' }}
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
              sx={{ color: '#F9F5F6', fontFamily: 'sans-serif' }}
            >
              Account
            </Button>
          </Container>
        </Box>
        <Box style={{ bottom: 0 }}>
          <Container>
            <Button
              onClick={() => navigate("channels")}
              variant="text"
              startIcon={<PersonOutlineOutlinedIcon />}
              sx={{ color: '#F9F5F6', fontFamily: 'sans-serif' }}
            >
              Broadcasts
            </Button>
          </Container>
        </Box>
      </Stack>
    </div>
  );
};
export default LeftSide;


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
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
const LeftSide = () => {
  const navigate = useNavigate();
  const handleeHome = () => {
    navigate("/dashboard");
  };
  const theme1 = useTheme();
  const isWideScreen = useMediaQuery(theme1.breakpoints.up("md"));

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
              {isWideScreen && "Home"}
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
              {isWideScreen && "Events"}
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
              {isWideScreen && "Account"}
            </Button>
          </Container>
        </Box>
      </Stack>
    </div>
  );
};
export default LeftSide;

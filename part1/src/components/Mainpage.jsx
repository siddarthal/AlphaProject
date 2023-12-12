import NavBar from "./NavBar";
import Events from "./Events";
// import AddEventButton from "./AddEventButton";
import { Container } from "@mui/material";
const Mainpage = ({ onLogout }) => {
  return (
    <div>
      <NavBar handleLog={onLogout} />
      {/* <AddEventButton/> */}
      <h1>Hi</h1>
      {/* <button onClick={onLogout}>Logout</button> */}
      <Container>
        <Events />
      </Container>
      {/* <EventCard /> */}
    </div>
  );
};
export default Mainpage;

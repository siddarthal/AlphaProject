import NavBar from "./NavBar";
// import AddEventButton from "./AddEventButton";
const Mainpage = ({ onLogout }) => {
  return (
    <div>
      <NavBar handleLog={onLogout}/>
      {/* <AddEventButton/> */}
      <h1>Hi</h1>
      {/* <button onClick={onLogout}>Logout</button> */}
    </div>
  );
};
export default Mainpage;

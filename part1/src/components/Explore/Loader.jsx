import CircularProgress from "@mui/material/CircularProgress";
const Loader = () => {
  return (
    <CircularProgress
      size={24}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-12px",
        marginLeft: "-12px",
      }}
    />
  );
};

export default Loader;
import { Stack } from "@mui/material";
import EventForm from "./EventForm";
const EditExistingEvent = ({token}) => {
  return (
    <Stack spacing={2}>
      <EventForm token={token}/>
    </Stack>
  );
};
export default EditExistingEvent;

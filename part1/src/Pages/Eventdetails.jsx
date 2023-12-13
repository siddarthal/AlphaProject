import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Services/service";
export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  useEffect(() => {
    api
      .fetchEvent(id)
      .then((res) => {
        console.log("response", res.data);
        setEvent(event);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Event Details</h2>
      <h3>{id}</h3>
    </div>
  );
}

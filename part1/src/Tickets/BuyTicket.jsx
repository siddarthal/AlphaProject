import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Services/service";
const BuyTicket = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [numPeople, setNumPeople] = useState(10);
  const [attending, setAttending] = useState(3);
  const [details, setDetails] = useState({
    category: "",
    ticket_cost: 0,
    user: 0,
    event: id,
  });
  const eventName = details.category;
  useEffect(() => {
    api.userAccountDatails().then((res) => {
        console.log(res);
    });
    api
      .fetchParticularEvent(id)
      .then((res) => {
        console.log(res);
        setDetails(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const calculateTotalFare = () => {
    return numPeople * details.ticket_cost + attending * 5;
  };

  const handleConfirmation = () => {
    const totalFare = calculateTotalFare();
    const confirmationDetails = {
      numPeople,
      attending,
      eventName,
      totalFare,
    };
    navigate("/payment", { state: confirmationDetails });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            {eventName}
          </Typography>
          <TextField
            fullWidth
            label="Number of People"
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Number Attending"
            type="number"
            value={attending}
            onChange={(e) => setAttending(e.target.value)}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Total Fare:
          </Typography>
          <Typography variant="h4" color="primary">
            ₹ {calculateTotalFare()} {/* Indian Rupee symbol */}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmation}
            sx={{ marginTop: 2 }}
          >
            Confirm and Proceed to Payment
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default BuyTicket;

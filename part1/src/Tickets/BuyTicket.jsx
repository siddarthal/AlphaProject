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
import axios from "axios";
import useRazorpay from "react-razorpay";

const BuyTicket = ({token}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Razorpay] = useRazorpay();

  const [numPeople, setNumPeople] = useState(10);
  const [attending, setAttending] = useState(3);
  const [details, setDetails] = useState({
    category: "",
    ticket_cost: 0,
    user: 0,
    event: id,
  });
  const [user, setUser] = useState();
  const eventName = details.category;
  useEffect(() => {
    api.userAccountDatails(token).then((res) => {
      console.log("uid", res.data.id);
      setUser(parseInt(res.data.id));
    });
    api
      .fetchParticularEvent(id,token)
      .then((res) => {
        console.log(res);
        setDetails(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const calculateTotalFare = () => {
    return numPeople * details.ticket_cost ;
  };

  const handleConfirmation = () => {
    const totalFare = calculateTotalFare();
    const confirmationDetails = {
      num_people: numPeople,
      attending: attending,
      user: user,
      event: id,
      amount: totalFare,
      order_id: "temp",
    };
    // const confirmationDetails = {
    //   amount: totalFare,
    //   ticket:1,
    //   status: "success"
    // }
    console.log("confirmationDetails", confirmationDetails);
    // api.buyTicketUrl(confirmationDetails).then((res)=>{
    //   console.log("res",res)
    // })

    axios
      .post("http://127.0.0.1:8000/api/tickets/", confirmationDetails)
      .then(function (response) {
        console.log(response);
        const order_id = response.data.order_id;
        const options = {
          key: "rzp_test_6gVqKVhbGkiCBm",
          name: "RelEvent",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order_id,
          handler: function (response1) {
            // alert(response1.razorpay_payment_id);
            // alert(response1.razorpay_order_id);
            // alert(response1.razorpay_signature);
            console.log("re", response);
            const data = {
              PID: response1.razorpay_payment_id,
              ticket: response.data.TID,
              amount: totalFare,
              status: "success",
            };
            console.log(data, "data");
            axios
              .post("http://127.0.0.1:8000/api/payments/", data)
              .then(function (response2) {
                if ((response2.status = 200)) {
                  navigate("/events/tickets");
                } else {
                  console.log("res status", response2.status);
                }
                console.log(response2);
              })
              .catch(function (error) {
                console.log(error);
              });
          },
          prefill: {
            name: "Piyush Garg",
            email: "youremail@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        rzp1.open();
      })
      .catch(function (error) {
        console.log(error);
      });
    // navigate("/payment", { state: confirmationDetails });
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
            onChange={(e) =>{ setNumPeople(e.target.value);setAttending(e.target.value);}}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          {/* <TextField
            fullWidth
            label="Number Attending"
            type="number"
            value={attending}
            onChange={(e) => }
            variant="outlined"
            sx={{ marginBottom: 2 }}
          /> */}
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

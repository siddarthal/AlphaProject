import React, { useEffect, useState } from "react";
import api from "../Services/service";
import {
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import useRazorpay from "react-razorpay";
import Loader from "../components/Explore/Loader";

const BuyTicket = ({ token }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Razorpay] = useRazorpay();
  const [loader, setLoader] = useState(false);
  const [numPeople, setNumPeople] = useState(1);
  const [details, setDetails] = useState({
    category: "",
    ticket_cost: 0,
    user: 0,
    event: id,
  });
  const [user, setUser] = useState();
  const eventName = details.event_name;
  useEffect(() => {
    api.userAccountDatails(token).then((res) => {
      console.log("uid", res.data.id);
      setUser(parseInt(res.data.id));
    });
    api
      .fetchParticularEvent(id, token)
      .then((res) => {
        console.log(res);
        setDetails(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  const calculateTotalFare = () => {
    var amt = 0;
    if (details.ticket_cost == 0) {
      amt = 1;
    }else{
      amt = details.ticket_cost;
    }
    return numPeople * amt;
  };

  const handleConfirmation = () => {
    const totalFare = calculateTotalFare();
    const confirmationDetails = {
      num_people: numPeople,
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
    setLoader(true);

    api
      .postTicketDetails(confirmationDetails, token)
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
            console.log("re", response1);
            const data = {
              PID: response1.razorpay_payment_id,
              ticket: response.data.TID,
              amount: totalFare,
              status: "success",
              order_id: response1.razorpay_order_id,
              signature: response1.razorpay_signature,
            };
            console.log(data, "data");
            api
              .postPaymentDetails(data, token)
              .then(function (response2) {
                if ((response2.status = 200)) {
                  setLoader(false);
                  navigate("/events/tickets");
                } else {
                  console.log("res status", response2.status);
                  setLoader;
                }
                console.log(response2);
              })
              .catch(function (error) {
                console.log(error);
                setLoader(false);
              });
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: function () {
              alert("Payment Pending going tickets page");
              setLoader(false);
              navigate("/events/tickets");
            },
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (responsez) {
          alert("Payment Failed");
          // alert(response.error.code);
          // alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          // alert(response.error.reason);
          // alert(response.error.metadata.order_id);
          // alert(response.error.metadata.payment_id);
          api
            .getTicketDetails(response.data.TID, token)
            .then(function (response1) {
              if ((response1.status = 200)) {
                const data = response1.data;
                console.log(data, "data");
                data.ticket_status = "fail";
                api
                  .putTicketDetails(response.data.TID, data, token)
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
              } else {
                console.log("res status", response1.status);
              }
              console.log(response1);
            })
            .catch(function (error) {
              setLoader(false);
              navigate("/events/tickets");
              console.log(error);
            });
        });

        rzp1.open();
      })
      .catch(function (error) {
        setLoader(false);
        alert("something went wrong")
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
          opacity: loader && 0.5,
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              width: 300,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {eventName}
          </Typography>
          <TextField
            fullWidth
            label="Number of People"
            type="number"
            value={numPeople}
            onChange={(event) => {
              setNumPeople(event.target.value);
              const value = event.target.value;
              if (value > 100) {
                event.target.value = 100;
                setNumPeople(event.target.value);
              } else if (value < 1) {
                event.target.value = 1;
                setNumPeople(event.target.value);
              }
            }}
            variant="outlined"
            sx={{ marginBottom: 2 }}
            inputProps={{
              min: 1,
              max: 100,
              step: 1,
            }}
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
            disabled={loader}
            sx={{ marginTop: 2 }}
          >
            Confirm and Proceed to Payment
          </Button>
          {details.ticket_cost == 0 && <Typography sx={{ marginTop: 1, fontSize: 12, color: '#e53735'}}>*Pay Rs.1 per ticket for security reasons</Typography>}
        </Paper>
      </Box>
      {loader && <Loader />}
    </Container>
  );
};

export default BuyTicket;

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import api from "../Services/service";
import Loader from "../components/Explore/Loader";
const ForgotPassword = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const [loader, setLoader] = useState(false);
  const formValidation = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  async function signupHandler(e) {
    e.preventDefault();
    if (formValidation()) {
      setErrors({});
      setLoader(true);
      const dataToSend = formData;
      api
        .resetPassword(dataToSend)
        .then((result) => {
          if (result.status === 200) {
            console.log("result", result);
            navigate("/signin");
            alert(`email sent to ${formData.email}`);
            setLoader(false);
            setFormData({ email: "" });
          }
        })
        .catch((err) => {
          console.error(err);
          setLoader(false);
          alert(`email not registered`);
        });
    } else {
      console.error(`can't validate`);
      setLoader(false);
      alert("email not registered");
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 400,
          p: 5,
          border: "1px solid #ddd",
          borderRadius: 2,
          margin: "0 auto",
          marginTop: 20,
          opacity: loader ? 0.2 : 1,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="600"
          sx={{
            mb: 1,
          }}
        >
          Reset Password
        </Typography>
        <Box sx={{ paddingTop: 4 }}>
          <TextField
            label="Email"
            placeholder="Enter email"
            variant="outlined"
            sx={{
              // mb: 2,
              width: 300,
            }}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <Typography variant="body2" fontWeight="600">
              {errors.email}
            </Typography>
          )}
        </Box>

        <Box sx={{ paddingTop: 4 }}>
          <Button
            variant="contained"
            disableElevation
            sx={{
              // py: 1.5,
              fontWeight: 500,
              fontSize: 16,
              width: 150,
            }}
            size="medium"
            disabled={loader}
            onClick={signupHandler}
          >
            {isSubmitting ? "signing u up..." : "Reset "}
          </Button>
        </Box>

        <Typography sx={{ marginTop: "10px" }} variant="body2" fontWeight="600">
          Remember your password? <Link to="/signin">Signin</Link>
        </Typography>
      </Box>
      {loader && <Loader />}
    </Box>
  );
};

export default ForgotPassword;

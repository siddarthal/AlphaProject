import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../Services/service";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const signValidation = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email must be entered";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signinHandler = async (e) => {
    e.preventDefault();
    if (signValidation()) {
      setErrors({});
      api
        .signin(formData)
        .then((res) => {
          console.log("successfull");
          console.log("result", res);
          // onLogin();
          localStorage.setItem("accessToken", res);
          setFormData({ email: "", password: "" });
          navigate("/events");
        })
        .catch((err) => {
          console.error(err);
          alert("wrong credentials");
        });
    } else {
      console.error(`can't validate`);
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
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
      }}
    >
      <Typography
        variant="h4"
        fontWeight="600"
        sx={{
          mb: 3,
        }}
      >
        Login
      </Typography>

      <TextField
        label="Email"
        placeholder="Enter email"
        variant="outlined"
        fullWidth
        sx={{
          mb: 2,
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
      <TextField
        label="Password"
        type="password"
        placeholder="Enter password"
        variant="outlined"
        fullWidth
        sx={{
          mb: 3,
        }}
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      {errors.password && (
        <Typography variant="body2" fontWeight="600">
          {errors.password}
        </Typography>
      )}
      <Button
        variant="contained"
        disableElevation
        sx={{
          py: 1.5,
          fontWeight: 500,
          fontSize: 16,
          width: 150,
        }}
        onClick={signinHandler}
      >
        Login
      </Button>
      <Typography sx={{ marginTop: "10px" }} variant="body2" fontWeight="600">
        New to Website <Link to="/signup">Signup</Link>
      </Typography>
    </Box>
  );
}

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signin({ onLogin }) {
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
      const url = "http://127.0.0.1:8000/api/login/";
      axios
        .post(url, formData)
        .then((result) => {
          console.log("successfull");
          onLogin();
          console.log("formadata", formData);
          console.log("result", result.data.access_token);
          localStorage.setItem("accessToken", result.data.access_token);
          setFormData({ email: "", password: "" });
          navigate("/main");
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

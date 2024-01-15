import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import api from "../Services/service";
export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [errors, setErrors] = useState({});
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const navigate= useNavigate();
  const formValidation = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!formData.rePassword) {
      newErrors.rePassword = "Password should be rentered";
    } else if (formData.password !== formData.rePassword) {
      newErrors.rePassword = "Both the passwords should match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  async function signupHandler(e) {
    e.preventDefault();
    if (formValidation()) {
      setErrors({});
      const { rePassword, ...dataToSend } = formData;
      api
        .signUp(dataToSend)
        .then((result) => {
          console.log("successfull");
          console.log("formData", dataToSend);
          console.log("result", result);
          navigate("/signin")
          setFormData({ name: "", email: "", password: "", rePassword: "" });
        })
        .catch((err) => {
          console.error(err);
          alert(`email adress is already registered`);
        });
    } else {
      console.error(`can't validate`);
    }
  }

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
          mb: 1,
        }}
      >
        Sign Up
      </Typography>

      <TextField
        label="Name"
        placeholder="Enter name"
        variant="outlined"
        fullWidth
        sx={{
          mb: 2,
        }}
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      {errors.name && (
        <Typography variant="body2" fontWeight="600">
          {errors.name}
        </Typography>
      )}
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
      <TextField
        label="Password Again"
        type="password"
        placeholder="re-enter password"
        variant="outlined"
        fullWidth
        sx={{
          mb: 3,
        }}
        name="rePassword"
        value={formData.rePassword}
        onChange={handleInputChange}
      />
      <>
        {errors.rePassword && (
          <Typography
            sx={{ marginBottom: "10px" }}
            variant="body2"
            fontWeight="600"
            className="flex-start"
          >
            {errors.rePassword}
          </Typography>
        )}
      </>
      <Button
        variant="contained"
        disableElevation
        sx={{
          py: 1.5,
          fontWeight: 500,
          fontSize: 16,
          width: 150,
        }}
        onClick={signupHandler}
      >
        Sign Up
      </Button>
      <Typography sx={{ marginTop: "10px" }} variant="body2" fontWeight="600">
        Already a member? <Link to="/signin">Signin</Link>
      </Typography>
    </Box>
  );
}

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";


export default function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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
      await fetch("", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => {
          console.log("successfull");
          console.log(formData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    else{
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
      <div>{errors.email && <p>{errors.email}</p>}</div>
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
      <div>{errors.password && <p>{errors.password}</p>}</div>
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
      <Typography variant="body2" fontWeight="600">
        New to Website{" "}
        <span
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "#1976D2",
          }}
          onClick={() => props.name(false)}
        >
          Sign up
        </span>
      </Typography>
    </Box>
  );
}

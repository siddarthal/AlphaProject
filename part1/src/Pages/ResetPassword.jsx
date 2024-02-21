import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import api from "../Services/service";
import Loader from "../components/Explore/Loader";

const ResetPassword = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
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
  const { id } = useParams();
  const { token } = useParams();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  const formValidation = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = "Password must contain at least 1 number and 1 special character";
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
      setLoader(true);
      const { rePassword, ...dataToSend } = formData;
      api
        .postUpdatePassword(dataToSend, id, token)
        .then((result) => {
          if (result.status === 200) {
            alert(`password reset successfull`);
            setFormData({ password: "", rePassword: "" });
            navigate("/signin");
            setLoader(false);
          }
        })
        .catch((err) => {
          console.error(err);
          alert(`unable to reset password`);
          setLoader(false);
        });
    } else {
      console.error(`can't validate`);
      setLoader(false);
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
          opacity: loader && 0.4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="600"
          sx={{
            // mb: 1,
            pb: 5,
          }}
        >
          Reset Password
        </Typography>

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
            // py: 1.5,
            fontWeight: 500,
            fontSize: 16,
            width: 150,
          }}
          disabled={loader}
          onClick={signupHandler}
        >
          {isSubmitting ? "signing u up..." : "Reset "}
        </Button>
      </Box>
      {loader && <Loader />}
    </Box>
  );
};

export default ResetPassword;

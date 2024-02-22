import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import api from "../Services/service";
import Loader from "../components/Explore/Loader";

const Signup = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

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
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    } else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/.test(formData.password)) {
      newErrors.password = "Password must contain at least 1 number, 1 letter and 1 special character";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signupHandler = (e) => {
    e.preventDefault();
    if (formValidation()) {
      setLoading(true);
      setErrors({});
      const { confirmPassword, ...dataToSend } = formData;
      api
        .signUp(dataToSend)
        .then((result) => {
          if (result.status === 201) {
            console.log("Successful");
            console.log("formData", dataToSend);
            console.log("result", result);
            setLoading(false);
            navigate("/signin");
            setFormData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
          } else {
            alert(`Email address is already registered `);
            console.log("result", result);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          alert(`something wrong try again later`, err);
          setLoading(false);
        });
    } else {
      console.error(`Can't validate`);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xxl"
      style={{ display: "flex", height: "100vh" }}
    >
      <Grid
        container
        component="div"
        style={{ height: "100%", width: "100%", opacity: loading && 0.4 }}
      >
        {/* Left side with form */}
        <Grid
          item
          xs={12}
          sm={6}
          component={Paper}
          elevation={6}
          square
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: isMobile
              ? `url('https://img.freepik.com/free-vector/key-concept-illustration_114360-6305.jpg?w=740&t=st=1706685388~exp=1706685988~hmac=2056ba4a72e536d890f45cc8cef398953d98fc12e657fd9d9cb7fb8546d26a4e')`
              : "",
            backgroundPosition: "center",
            display: isMobile ? "flex" : "flex",
          }}
        >
          <div
            style={{
              padding: "20px",
              width: "80%",
              background: "rgba(255, 255, 255, 0.9)",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              style={{
                fontFamily: "cursive",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                marginBottom: 50,
              }}
            >
              <EventIcon style={{ marginRight: "10px" }} />
              RelEvent
            </Typography>
            <Typography
              variant="h5"
              style={{ fontFamily: "cursive", fontWeight: "bold" }}
            >
              Sign Up
            </Typography>
            <form style={{ width: "100%", marginTop: "20px" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleChange}
                InputLabelProps={{ style: { fontFamily: "cursive" } }}
                InputProps={{
                  style: {
                    borderRadius: "50px",
                    fontFamily: "cursive",
                    borderColor: "#555",
                  },
                }}
              />
              {errors.name && (
                <Typography variant="body2" fontWeight="600">
                  {errors.name}
                </Typography>
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                InputProps={{
                  style: {
                    borderRadius: "50px",
                    fontFamily: "cursive",
                    borderColor: "#555",
                  },
                }}
                InputLabelProps={{ style: { fontFamily: "cursive" } }}
              />
              {errors.email && (
                <Typography variant="body2" fontWeight="600">
                  {errors.email}
                </Typography>
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
                InputProps={{
                  style: {
                    borderRadius: "50px",
                    fontFamily: "cursive",
                    borderColor: "#555",
                  },
                }}
                InputLabelProps={{ style: { fontFamily: "cursive" } }}
              />
              {errors.password && (
                <Typography variant="body2" fontWeight="600">
                  {errors.password}
                </Typography>
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                onChange={handleChange}
                InputProps={{
                  style: {
                    borderRadius: "50px",
                    fontFamily: "cursive",
                    borderColor: "#555",
                  },
                }}
                InputLabelProps={{ style: { fontFamily: "cursive" } }}
              />
              {errors.confirmPassword && (
                <Typography
                  sx={{ marginBottom: "10px" }}
                  variant="body2"
                  fontWeight="600"
                  className="flex-start"
                >
                  {errors.confirmPassword}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{
                  marginTop: "20px",
                  borderRadius: "50px",
                  fontFamily: "cursive",
                }}
                // disabled={navigation.state === "submitting"}
                disabled={loading}
                onClick={signupHandler}
              >
                {navigation.state === "submitting"
                  ? "Signing you up..."
                  : "Sign Up"}
              </Button>

              <Typography
                sx={{ marginTop: "10px" }}
                variant="body2"
                fontWeight="600"
              >
                Already a member? <Link to="/signin">Signin</Link>
              </Typography>
            </form>
          </div>
        </Grid>

        {/* Right side with image */}
        <Grid
          item
          xs={0}
          sm={6}
          style={{
            backgroundImage: `url('https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1706680118~exp=1706680718~hmac=4d77e51b0d572be79cce84cbee47c7cd208c8da8b7f1f05ab7ad9d13c964539a')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      {loading && <Loader />}
    </Container>
  );
};

export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginAction } from "../../actions/authActions";
import { useDispatch } from "react-redux";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      // Validation checks
      const errors = {};
      if (!email) {
        errors.email = "Email is required";
      }
      if (!password) {
        errors.password = "Password is required";
      }

      setErrors(errors);

      // If there are errors, update the state and prevent form submission
      if (Object.keys(errors).length > 0) {
        return;
      }

      // calling login action
      const res = await dispatch(loginAction({ email, password }));

      // if res false, throw error
      if (!res) throw res;

      // navigate to /
      navigate("/");

      // set error to blank
      setErrors({});
      console.log("login");
    } catch (error) {
      console.log(error, "from handle login");
    }
  };

  // Clear specific error when typing in the corresponding field
  const clearError = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  return (
    <>
      <Card>
        <CardContent>
          <Grid container sx={{ padding: "2rem" }}>
            <Typography
              variant="h4"
              className="text-blue"
              sx={{ fontWeight: "bold", marginX: "auto" }}
            >
              LOGIN
            </Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              placeholder="Enter your email"
              sx={{ marginTop: "1rem" }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError("email");
              }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              id="outlined-adornment-password"
              label="Password"
              variant="outlined"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              sx={{ marginTop: "1rem" }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError("password"); // Clear the error message
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              sx={{ marginTop: "1rem" }}
              fullWidth
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Divider sx={{ width: "100%", marginTop: "2rem" }} />
            <Typography mt={2} sx={{ marginX: "auto" }}>
              New at Chatiyaao ? <Link to="/register">Register Account.</Link>
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginComponent;

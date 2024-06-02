import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerAction } from "../../actions/authActions";

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      // Validation checks
      const errors = {};
      if (!name) {
        errors.name = "Name is required";
      }
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

      let res = await dispatch(registerAction({ name, email, password }));

      if (!res) throw res;

      // if successfully registered, redirect to email verification page
      navigate("/verify-email");

      setErrors({});
    } catch (error) {
      console.log(error, "from handle register");
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
              REGISTER
            </Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Name"
              variant="outlined"
              placeholder="Enter your name"
              sx={{ marginTop: "2rem" }}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearError("name");
              }}
              error={!!errors.name}
              helperText={errors.name}
            />
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
                clearError("email"); // Clear the error message
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
              onClick={handleRegister}
            >
              Register
            </Button>
            <Divider sx={{ width: "100%", marginTop: "2rem" }} />
            <Typography mt={2} sx={{ marginX: "auto" }}>
              Already have a Account ? <Link to="/login">Login here.</Link>
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterComponent;

import React, { useState } from "react";
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
} from "@mui/material";
import { Link } from "react-router-dom";

const RegisterComponent = () => {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});

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
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              placeholder="Enter your email"
              sx={{ marginTop: "1rem" }}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              placeholder="Enter your password"
              sx={{ marginTop: "1rem" }}
            />
            <Button sx={{ marginTop: "1rem" }} fullWidth variant="contained">
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { Link } from "react-router-dom";

const VerifyEmailComponent = () => {
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword] = useState("");
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
              VERIFY EMAIL
            </Typography>
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

export default VerifyEmailComponent;

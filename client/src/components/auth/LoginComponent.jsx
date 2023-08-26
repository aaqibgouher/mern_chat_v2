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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";

const LoginComponent = () => {
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2} sx={{ padding: "3rem" }}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                align="center"
                className="text-blue"
                sx={{ fontWeight: "bold" }}
              >
                LOGIN
              </Typography>
            </Grid>
            <Grid item xs={12} mt={4}>
              <TextField
                size="small"
                label="Work Email"
                variant="outlined"
                fullWidth
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                error={!!errors.workEmail}
                helperText={errors.workEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid container justifyContent="space-between" mt={1}>
              <Grid item ml={2}>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              </Grid>
              <Grid item>
                <Link to="/reset-password">Forgot password?</Link>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={4}>
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: "2rem" }}
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Typography mt={2} align="center">
        New at OpenInterveu ? Register account.
      </Typography>
      <Box mt={2} display="flex" justifyContent="center">
        <Link to="/register">
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "2rem" }}
          >
            Register Account
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default LoginComponent;

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
          <Grid container spacing={2} sx={{ padding: "2rem" }}>
            <Grid item xs={12} mb={4}>
              <Typography
                variant="h4"
                align="center"
                className="text-blue"
                sx={{ fontWeight: "bold" }}
              >
                REGISTER
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Full Name *</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                placeholder="Enter Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Company Name *</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                error={!!errors.companyName}
                helperText={errors.companyName}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Mobile No *</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                placeholder="10 Digit Contact No."
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                error={!!errors.mobileNo}
                helperText={errors.mobileNo}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Work Email *</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                placeholder="Email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                error={!!errors.workEmail}
                helperText={errors.workEmail}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Your Role *</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth size="small" error={!!errors.role}>
                <InputLabel>Select Your Role</InputLabel>
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                  <MenuItem value="">Select Your Role</MenuItem>
                  <MenuItem value="role1">Role 1</MenuItem>
                  <MenuItem value="role2">Role 2</MenuItem>
                </Select>
                {!!errors.role && (
                  <Typography variant="caption" color="error">
                    {errors.role}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} mt={4}>
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: "2rem" }}
                fullWidth
                // onClick={handleSubmit}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Typography mt={2} align="center">
        Already Registered at OpenInterveu ?
      </Typography>
      <Box mt={2} display="flex" justifyContent="center">
        <Link to="/login">
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "2rem" }}
          >
            Login here ...
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default RegisterComponent;

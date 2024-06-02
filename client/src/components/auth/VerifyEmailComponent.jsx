import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { verifyEmailAction } from "../../actions/authActions";

const VerifyEmailComponent = () => {
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});

  const handleVerifyEmail = async (e) => {
    try {
      e.preventDefault();

      // validations
      // Validation checks
      const errors = {};
      if (!code) {
        errors.code = "Code is required";
      }

      setErrors(errors);

      // If there are errors, update the state and prevent form submission
      if (Object.keys(errors).length > 0) {
        return;
      }

      await dispatch(verifyEmailAction({ code }));

      setErrors({});
    } catch (error) {
      console.log(error, "from verify email component");
    }
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
              VERIFY EMAIL
            </Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Code"
              variant="outlined"
              placeholder="Enter your code"
              sx={{ marginTop: "2rem" }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              error={!!errors.code}
              helperText={errors.code}
            />
            <Button
              sx={{ marginTop: "1rem" }}
              fullWidth
              variant="contained"
              onClick={handleVerifyEmail}
            >
              Verify
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

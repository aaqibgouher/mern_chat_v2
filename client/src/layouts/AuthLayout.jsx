import React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthLayout;

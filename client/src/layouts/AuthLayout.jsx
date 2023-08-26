import React from "react";
import { Grid, Image } from "@mui/material";

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
        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
          <img
            src="./register.jpg"
            alt="My Image"
            style={{ maxWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthLayout;

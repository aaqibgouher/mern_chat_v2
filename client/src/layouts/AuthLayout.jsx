import React from "react";
import { Grid } from "@mui/material";
import LottieAnimationAuthComponent from "../components/helper/LottieAnimationAuthComponent";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Grid container style={{ height: "100vh" }}>
      {/* Left Side (8 columns) */}
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        lg={8}
        xl={8}
        container
        justifyContent="center"
        alignItems="center" // Vertically center the content
        style={{
          overflow: "hidden",
          position: "relative",
          padding: "2rem",
        }}
      >
        <LottieAnimationAuthComponent />
      </Grid>

      {/* Right Side (4 columns) */}
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={4}
        xl={4}
        container
        justifyContent="center"
        alignItems="center" // Vertically center the content
        style={{
          overflowY: "auto",
          maxHeight: "100vh",
          padding: "2rem",
        }}
      >
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AuthLayout;

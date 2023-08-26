import React from "react";
import { Grid, Image } from "@mui/material";
import registerImage from './register.jpg';

const AuthLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", overflow: "hidden" }}>
      <div style={{ flex: "1", overflowY: "auto", maxHeight: "100vh" }}>
        <Grid
          container
          spacing={0}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
            <img
              src={registerImage}
              alt="My Image" 
              style={{ width: '100%', height: '100vh' }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {children}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AuthLayout;

import React from "react";
import { Grid } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", overflow: "hidden" }}>
      <div style={{ flex: "1", overflowY: "auto", maxHeight: "100vh" }}>
        <Grid
          container
          spacing={0}
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            {children}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AuthLayout;

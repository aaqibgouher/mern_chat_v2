import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import DashboardPage from "./pages/DashboardPage";
import SnackbarComponent from "./components/helper/SnakbarComponent";
import AuthPage from "./pages/AuthPage";
import PrivateRoute from "./middlewares/PrivateRoute";
import UserDetailDrawerComponent from "./components/helper/UserDetailDrawerComponent";
import DialogComponent from "./components/helper/DialogComponent";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00567e", // Set your primary color here
    },
    text: {
      primary: "#00567e",
      secondary: "#00567e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Fragment>
          <SnackbarComponent />
          <UserDetailDrawerComponent />
          <DialogComponent />
          <Routes>
            {/* Protected Route */}
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<DashboardPage />} />
            </Route>

            {/* Unprotected Routes */}
            <Route exact path="/login" element={<AuthPage />} />
            <Route exact path="/register" element={<AuthPage />} />
            <Route exact path="/verify-email" element={<AuthPage />} />
          </Routes>
        </Fragment>
      </Router>
    </ThemeProvider>
  );
}

export default App;

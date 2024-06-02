import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { io } from "socket.io-client";

import DashboardPage from "./pages/DashboardPage";
import SnackbarComponent from "./components/helper/SnakbarComponent";
import PrivateRoute from "./middlewares/PrivateRoute";
import UserDetailDrawerComponent from "./components/helper/UserDetailDrawerComponent";
import DialogComponent from "./components/helper/DialogComponent";
import { useDispatch } from "react-redux";
import { SOCKET_IO } from "./actionTypes/userActionTypes";
import AuthLayout from "./layouts/AuthLayout";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
import VerifyEmailComponent from "./components/auth/VerifyEmailComponent";
import PublicRoute from "./middlewares/PublicRoute";
import { getToken } from "./utils/common";

const BASE_URL = "http://localhost:3000";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00567e",
    },
    text: {
      primary: "#00567e",
      secondary: "#00567e",
      white: "#FFFFFF",
    },
  },
});

function App() {
  const token = getToken();
  const [socket, setSocket] = useState(
    io(BASE_URL, {
      auth: {
        token: token,
      },
    })
  );
  const dispatch = useDispatch();

  console.log(socket, "socket");
  useEffect(() => {
    if (socket) {
      // dispatch
      dispatch({ type: SOCKET_IO, payload: socket });
    }
  }, []);

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
            <Route
              exact
              path="/"
              element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              }
            >
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/register" element={<RegisterComponent />} />
              <Route path="/verify-email" element={<VerifyEmailComponent />} />
            </Route>
          </Routes>
        </Fragment>
      </Router>
    </ThemeProvider>
  );
}

export default App;

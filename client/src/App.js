import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// import component
import DashboardPage from "./pages/DashboardPage";
import SnackbarComponent from "./components/helper/SnakbarComponent";
import AuthPage from "./pages/AuthPage";

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
    <>
      <ThemeProvider theme={theme}>
        <SnackbarComponent />
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/verify-email" element={<AuthPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

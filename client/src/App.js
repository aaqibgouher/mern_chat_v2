import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import component
import DashboardPage from "./pages/DashboardPage";
import SnackbarComponent from "./components/helper/SnakbarComponent";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <>
      <SnackbarComponent />
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/verify-email" element={<AuthPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { useSelector } from "react-redux";
import { getToken } from "../utils/common";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = useSelector((state) => state.authReducers.data?.token);
  const tokenFromLocalStorage = getToken();

  return token || tokenFromLocalStorage ? <Navigate to="/" /> : children;
};

export default PublicRoute;

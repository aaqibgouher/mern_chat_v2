import React, { useEffect } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../utils/common";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.authReducers.data?.token);
  const tokenFromLocalStorage = getToken();
  console.log("private route called");

  return token || tokenFromLocalStorage ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../utils/common";

const PrivateRoute = () => {
  const token = useSelector((state) => state.authReducers.data?.token);
  const tokenFromLocalStorage = getToken();

  return token || tokenFromLocalStorage ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

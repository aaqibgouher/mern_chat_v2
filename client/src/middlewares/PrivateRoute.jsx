import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../utils/common";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.authReducers.data?.token);
  const tokenFromLocalStorage = getToken();
  console.log("private route called");

  useEffect(() => {
    if (!token && !tokenFromLocalStorage) {
      console.log(token, tokenFromLocalStorage, "tokens");
      navigate("/login");
    }
  }, [navigate, token, tokenFromLocalStorage]);

  return <Outlet />;
};

export default PrivateRoute;

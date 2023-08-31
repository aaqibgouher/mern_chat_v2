import React, { useEffect } from "react";
import DashboardComponent from "../components/dashboard/DashboardComponent";
import DashboardLayout from "../layouts/DashboardLayout";
import { useDispatch } from "react-redux";
import { fetchMeAction } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const DashboardPage = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await dispatch(fetchMeAction());
        if (res.hasOwnProperty("status") && res.status !== 200)
          navigate("/verify-email");
      } catch (error) {
        console.log(error, "from fetch me dashboard page ");
      }
    };

    fetchMe();
  }, []);

  return <DashboardLayout />;
};

export default DashboardPage;

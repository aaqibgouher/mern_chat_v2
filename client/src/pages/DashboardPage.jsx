import React, { useEffect } from "react";
import DashboardComponent from "../components/dashboard/DashboardComponent";
import DashboardLayout from "../layouts/DashboardLayout";
import { useDispatch } from "react-redux";
import { fetchMeAction } from "../actions/userActions";

const DashboardPage = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeAction());
  }, []);

  return (
    <DashboardLayout>
      <DashboardComponent />
    </DashboardLayout>
  );
};

export default DashboardPage;

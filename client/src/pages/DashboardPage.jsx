import React from "react";
import DashboardComponent from "../components/dashboard/DashboardComponent";
import DashboardLayout from "../layouts/DashboardLayout";

const DashboardPage = ({ children }) => {
  return (
    <DashboardLayout>
      <DashboardComponent />
    </DashboardLayout>
  );
};

export default DashboardPage;

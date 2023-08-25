import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import LoginComponent from "../components/auth/LoginComponent";

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginComponent />
    </AuthLayout>
  );
};

export default LoginPage;

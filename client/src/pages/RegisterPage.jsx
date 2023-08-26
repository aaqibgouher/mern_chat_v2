import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import RegisterComponent from "../components/auth/RegisterComponen";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterComponent />
    </AuthLayout>
  );
};

export default RegisterPage;

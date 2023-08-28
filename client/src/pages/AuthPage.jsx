import React from "react";
import { useLocation } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginComponent from "../components/auth/LoginComponent";
import RegisterComponent from "../components/auth/RegisterComponent";
import VerifyEmailComponent from "../components/auth/VerifyEmailComponent";

const AuthPage = () => {
  const location = useLocation();

  // route lists
  const routeComponents = {
    login: LoginComponent,
    register: RegisterComponent,
    "verify-email": VerifyEmailComponent,
  };

  // Determine the current route based on the URL
  const currentRoute = location.pathname.split("/")[1];

  // take the component
  const CurrentComponent = routeComponents[currentRoute];

  return (
    <AuthLayout>
      <CurrentComponent />
    </AuthLayout>
  );
};

export default AuthPage;

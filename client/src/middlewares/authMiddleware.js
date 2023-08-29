import { getToken } from "../utils/common";

export const authMiddleware = () => {
  const token = getToken();
  if (!token) {
    // Redirect to the login page if token is not present
    return "/login";
  } else {
    return null; // Allow the route to proceed
  }
};

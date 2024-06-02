import axios from "axios";
import { getToken } from "../utils/common";

const apiService = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3000",
});

const token = getToken();

export const registerApi = async (payload) => {
  try {
    const res = await apiService.post("/api/auth/register", payload);

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from register api");
    throw error.response;
  }
};

export const verifyEmailApi = async (payload) => {
  try {
    const res = await apiService.post("/api/auth/verify-email", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from verify email api");
    throw error.response;
  }
};

export const loginApi = async (payload) => {
  try {
    const res = await apiService.post("/api/auth/login", payload);

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from login api");
    throw error.response;
  }
};

export const logoutApi = async () => {
  try {
    const res = await apiService.post("/api/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from logout api");
    throw error.response;
  }
};

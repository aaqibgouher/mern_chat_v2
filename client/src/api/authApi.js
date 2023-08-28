import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3000",
});

export const registerUserApi = async (payload) => {
  try {
    const res = await apiService.post("/api/auth/register", payload);
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from get users api");
    throw error.response;
  }
};

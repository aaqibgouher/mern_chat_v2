import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3000",
});

export const fetchMeApi = async () => {
  try {
    const res = await apiService.get("/api/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const fetchContactsApi = async () => {
  try {
    const res = await apiService.get("/api/users/search", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch contacts api");
    throw error.response;
  }
};

export const fetchContactDetailApi = async (payload) => {
  try {
    const res = await apiService.post("/api/users/contact-details", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch contact detail api");
    throw error.response;
  }
};

export const addUserInContactApi = async (payload) => {
  try {
    const res = await apiService.post(
      "/api/users/add-user-in-contact",
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from add user to contact api");
    throw error.response;
  }
};

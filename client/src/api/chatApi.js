import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3000",
});

export const fetchChatsApi = async () => {
  try {
    const res = await apiService.get("/api/users/connected", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch chats api");
    throw error.response;
  }
};

export const fetchMessagesApi = async (payload) => {
  try {
    const res = await apiService.post("/api/messages/solo", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch messages api");
    throw error.response;
  }
};

export const fetchGroupMessagesApi = async (payload) => {
  try {
    const res = await apiService.get(`/api/messages/group/${payload}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch group messages api");
    throw error.response;
  }
};

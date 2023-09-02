import {
  FETCH_CHATS,
  FETCH_CONTACTS,
  FETCH_MESSAGES,
} from "../actionTypes/chatActionTypes";
import { SHOW_SNACKBAR } from "../actionTypes/helperActionTypes";
import {
  fetchChatsApi,
  fetchContactsApi,
  fetchGroupMessagesApi,
  fetchMessagesApi,
} from "../api/chatApi";

export const fetchChatsAction = () => async (dispatch) => {
  try {
    const res = await fetchChatsApi();
    console.log("from actoins");

    dispatch({ type: FETCH_CHATS, payload: res.data });
  } catch (error) {
    console.log(error, "from chat actions -> fetch chats action");
    dispatch({
      type: SHOW_SNACKBAR,
      payload: error?.data?.message,
    });
  }
};

// solo messages
export const fetchMessagesAction = (payload) => async (dispatch) => {
  try {
    const res = await fetchMessagesApi(payload);
    console.log("from actions");

    dispatch({ type: FETCH_MESSAGES, payload: res.data });
  } catch (error) {
    console.log(error, "from chat actions -> fetch messages action");
    dispatch({
      type: SHOW_SNACKBAR,
      payload: error?.data?.message,
    });
  }
};

// group message
export const fetchGroupMessagesAction = (payload) => async (dispatch) => {
  try {
    console.log("group action");
    const res = await fetchGroupMessagesApi(payload);
    console.log("from actions");

    dispatch({ type: FETCH_MESSAGES, payload: res.data });
  } catch (error) {
    console.log(error, "from chat actions -> fetch group messages action");
    dispatch({
      type: SHOW_SNACKBAR,
      payload: error?.data?.message,
    });
  }
};

import {
  FETCH_CHATS,
  FETCH_CONTACTS,
  FETCH_MESSAGES,
} from "../actionTypes/chatActionTypes";
import { SHOW_SNACKBAR } from "../actionTypes/helperActionTypes";
import {
  addParticipantToGroupApi,
  createGroupApi,
  fetchChatsApi,
  fetchContactsApi,
  fetchGroupMessagesApi,
  fetchMessagesApi,
  sendMessageApi,
} from "../api/chatApi";

export const fetchChatsAction = (payload) => async (dispatch) => {
  try {
    const res = await fetchChatsApi(payload);

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
    const res = await fetchGroupMessagesApi(payload);

    dispatch({ type: FETCH_MESSAGES, payload: res.data });
  } catch (error) {
    console.log(error, "from chat actions -> fetch group messages action");
    dispatch({
      type: SHOW_SNACKBAR,
      payload: error?.data?.message,
    });
  }
};

export const createGroupAction = (payload) => async (dispatch) => {
  try {
    const res = await createGroupApi(payload);

    dispatch({
      type: SHOW_SNACKBAR,
      payload: res.message,
    });

    return res;
  } catch (error) {
    console.log(error, "from chat actions -> create group action");
    dispatch({
      type: SHOW_SNACKBAR,
      payload: error?.data?.message,
    });
  }
};

export const addParticipantToGroupAction = (payload) => async (dispatch) => {
  try {
    const res = await addParticipantToGroupApi(payload);

    dispatch({
      type: SHOW_SNACKBAR,
      payload: res.message,
    });

    return res;
  } catch (error) {
    console.log(error, "from chat actions -> add participant to group action");
    dispatch({ type: SHOW_SNACKBAR, payload: error?.data?.message });
  }
};

export const sendMessageAction = (payload) => async (dispatch) => {
  try {
    const res = await sendMessageApi(payload);

    return res;
  } catch (error) {
    console.log(error, "from chat actions -> send message action");
    dispatch({ type: SHOW_SNACKBAR, payload: error?.data?.message });
  }
};

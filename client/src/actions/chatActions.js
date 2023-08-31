import { FETCH_CHATS, FETCH_CONTACTS } from "../actionTypes/chatActionTypes";
import { SHOW_SNACKBAR } from "../actionTypes/helperActionTypes";
import { fetchChatsApi, fetchContactsApi } from "../api/chatApi";

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

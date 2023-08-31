import { SHOW_SNACKBAR } from "../actionTypes/helperActionTypes";
import {
  FETCH_CONTACTS,
  FETCH_ME,
  SET_SELECTED_CHAT,
} from "../actionTypes/userActionTypes";
import { fetchContactsApi, fetchMeApi } from "../api/userApi";

export const fetchMeAction = () => async (dispatch) => {
  try {
    const res = await fetchMeApi();

    dispatch({
      type: SHOW_SNACKBAR,
      payload: res.message,
    });

    dispatch({
      type: FETCH_ME,
      payload: res.data,
    });
  } catch (error) {
    console.log(error, "from user actions -> fetch me action");
    dispatch({
      type: SHOW_SNACKBAR,
      payload: error?.data?.message,
    });

    return error.data;
  }
};

export const fetchContactsAction = () => async (dispatch) => {
  try {
    const res = await fetchContactsApi();
    console.log("from actions");

    dispatch({ type: FETCH_CONTACTS, payload: res.data });
  } catch (error) {
    console.log(error, "from chat actions -> fetch contacts action");
    dispatch({
      type: SHOW_SNACKBAR,
      payload: error?.data?.message,
    });
  }
};

export const setSelectedChatAction = (payload) => ({
  type: SET_SELECTED_CHAT,
  payload: payload,
});

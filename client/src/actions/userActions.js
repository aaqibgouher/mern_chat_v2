import { SHOW_SNACKBAR } from "../actionTypes/helperActionTypes";
import {
  FETCH_CONTACTS,
  FETCH_CONTACT_DETAIL,
  FETCH_ME,
  SET_CONTACT_DETAIL,
  SET_SELECTED_CHAT,
} from "../actionTypes/userActionTypes";
import {
  addUserInContactApi,
  fetchContactDetailApi,
  fetchContactsApi,
  fetchMeApi,
} from "../api/userApi";

export const fetchMeAction = () => async (dispatch) => {
  try {
    const res = await fetchMeApi();

    // dispatch({
    //   type: SHOW_SNACKBAR,
    //   payload: res.message,
    // });

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

export const fetchContactDetailAction = (payload) => async (dispatch) => {
  try {
    const res = await fetchContactDetailApi(payload);

    // dispatch({
    //   type: SHOW_SNACKBAR,
    //   payload: res.message,
    // });

    dispatch({
      type: FETCH_CONTACT_DETAIL,
      payload: res.data,
    });
  } catch (error) {
    console.log(error, "from user actions -> fetch contact detail action");
    dispatch({
      type: SHOW_SNACKBAR,
      payload: error?.data?.message,
    });

    return error.data;
  }
};

export const addUserInContactAction = (payload) => async (dispatch) => {
  try {
    const res = await addUserInContactApi(payload);

    console.log(res, "from res");

    return res;
  } catch (error) {
    console.log(error, "from chat actions -> fetch contacts action");
    dispatch({
      type: SHOW_SNACKBAR,
      payload: error?.data?.message,
    });
  }
};

import { SHOW_SNACKBAR } from "../actionTypes/helperActionTypes";
import { FETCH_ME } from "../actionTypes/userActionTypes";
import { fetchMeApi } from "../api/userApi";

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
  }
};

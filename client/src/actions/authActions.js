import { REGISTER_USER } from "../actionTypes/authActionTypes";
import { SHOW_SNACKBAR } from "../actionTypes/helperActionTypes";
import { registerUserApi } from "../api/authApi";

export const registerUserAction = (payload) => async (dispatch) => {
  try {
    const res = await registerUserApi(payload);

    dispatch({
      type: SHOW_SNACKBAR,
      payload: res.message,
    });

    dispatch({ type: REGISTER_USER, payload: res.data });

    // save token to local storage
    localStorage.setItem("token", res.data.token);
  } catch (error) {
    console.log(error, "from auth actions -> register user action");
    dispatch({
      type: SHOW_SNACKBAR,
      payload: error?.data?.message,
    });
  }
};

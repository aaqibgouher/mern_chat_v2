import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "../actionTypes/authActionTypes";
import { SHOW_SNACKBAR } from "../actionTypes/helperActionTypes";
import {
  loginApi,
  logoutApi,
  registerApi,
  verifyEmailApi,
} from "../api/authApi";

export const registerAction = (payload) => async (dispatch) => {
  try {
    const res = await registerApi(payload);

    dispatch({
      type: SHOW_SNACKBAR,
      payload: res.message,
    });

    dispatch({
      type: REGISTER_USER,
      payload: { userId: res.data.userId, token: res.data.token },
    });

    // save token to local storage
    localStorage.setItem("token", res.data.token);

    return res;
  } catch (error) {
    console.log(error, "from auth actions -> register user action");
    dispatch({
      type: SHOW_SNACKBAR,
      payload: error?.data?.message,
    });
  }
};

export const verifyEmailAction = (payload) => async (dispatch) => {
  try {
    const res = await verifyEmailApi(payload);
  } catch (error) {
    console.log(error, "from auth actions -> verify email action");
  }
};

export const loginAction = (payload) => async (dispatch) => {
  try {
    const res = await loginApi(payload);

    dispatch({
      type: SHOW_SNACKBAR,
      payload: res.message,
    });

    dispatch({ type: LOGIN_USER, payload: res.data });

    // save token to local storage
    localStorage.setItem("token", res.data.token);

    return res;
  } catch (error) {
    console.log(error, "from auth actions -> register user action");
    dispatch({
      type: SHOW_SNACKBAR,
      payload: error?.data?.message,
    });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    const res = await logoutApi();

    dispatch({
      type: SHOW_SNACKBAR,
      payload: res.message,
    });

    dispatch({ type: LOGOUT_USER });

    // save token to local storage
    localStorage.removeItem("token");

    return res;
  } catch (error) {
    console.log(error, "from auth actions -> logout user action");
    dispatch({
      type: SHOW_SNACKBAR,
      payload: error?.data?.message,
    });
  }
};

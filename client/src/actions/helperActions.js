import {
  HIDE_SNACKBAR,
  HIDE_USER_DETAIL_DRAWER,
  SHOW_SNACKBAR,
  SHOW_USER_DETAIL_DRAWER,
} from "../actionTypes/helperActionTypes";

export const showSnackbar = () => async (dispatch) => {
  try {
    dispatch({
      type: SHOW_SNACKBAR,
      payload: "This is the message",
    });
  } catch (error) {
    console.error("Error from show snackbar helper actions:", error);
  }
};

export const hideSnackbar = () => async (dispatch) => {
  try {
    dispatch({
      type: HIDE_SNACKBAR,
    });
  } catch (error) {
    console.error("Error from hide snackbar helper actions", error);
  }
};

export const showUserDetailDrawer = (drawerType) => ({
  type: SHOW_USER_DETAIL_DRAWER,
  payload: drawerType,
});

export const hideUserDetailDrawer = () => ({
  type: HIDE_USER_DETAIL_DRAWER,
});

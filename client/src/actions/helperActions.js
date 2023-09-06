import {
  HIDE_SNACKBAR,
  HIDE_DRAWER,
  SHOW_DRAWER,
  SHOW_SNACKBAR,
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

export const showDrawer = (drawerType) => ({
  type: SHOW_DRAWER,
  payload: drawerType,
});

export const hideDrawer = () => ({
  type: HIDE_DRAWER,
});

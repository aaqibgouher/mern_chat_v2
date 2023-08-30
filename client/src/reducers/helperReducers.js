import {
  HIDE_SNACKBAR,
  HIDE_USER_DETAIL_DRAWER,
  SHOW_SNACKBAR,
  SHOW_USER_DETAIL_DRAWER,
} from "../actionTypes/helperActionTypes";

const initialState = {
  snackbarMessage: "Hello",
  showSnackbar: true,
  navbarMenu: [
    { name: "New group", action: "handleNewGroup" },
    { name: "Settings", action: "handleSettings" },
    { name: "Logout", action: "handleLogout" },
  ],
  userDetailDrawer: false,
};

const helperReducers = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        ...state,
        snackbarMessage: action.payload,
        showSnackbar: true,
      };
    case HIDE_SNACKBAR:
      return {
        ...state,
        snackbarMessage: "",
        showSnackbar: false,
      };
    case SHOW_USER_DETAIL_DRAWER:
      return {
        ...state,
        userDetailDrawer: true,
      };
    case HIDE_USER_DETAIL_DRAWER:
      return {
        ...state,
        userDetailDrawer: false,
      };
    default:
      return state;
  }
};

export default helperReducers;

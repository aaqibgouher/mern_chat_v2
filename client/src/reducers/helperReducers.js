import { HIDE_SNACKBAR, SHOW_SNACKBAR } from "../actionTypes/helperActionTypes";

const initialState = {
  snackbarMessage: "Hello",
  showSnackbar: true,
  navbarMenu: [
    { name: "New group", action: "handleNewGroup" },
    { name: "Settings", action: "handleSettings" },
    { name: "Logout", action: "handleLogout" },
  ],
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
    default:
      return state;
  }
};

export default helperReducers;

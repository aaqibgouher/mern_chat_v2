import { HIDE_SNACKBAR, SHOW_SNACKBAR } from "../actionTypes/helperActionTypes";

const initialState = {
  snackbarMessage: "Hello",
  showSnackbar: true,
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

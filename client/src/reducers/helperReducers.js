import {
  HIDE_DRAWER,
  HIDE_SNACKBAR,
  SHOW_DRAWER,
  SHOW_SNACKBAR,
} from "../actionTypes/helperActionTypes";

const initialState = {
  snackbarMessage: "",
  showSnackbar: false,
  navbarMenu: [
    { name: "New group", action: "handleNewGroup" },
    { name: "Settings", action: "handleSettings" },
    { name: "Logout", action: "handleLogout" },
  ],
  showDrawer: false,
  drawerType: null,
  chatNavbarMenuGroup: [
    { name: "Group info", action: "handleGroupInfo" },
    { name: "Exit group", action: "handleExitGroup" },
    { name: "Delete group", action: "handleDeleteGroup" },
  ],
  chatNavbarMenuSolo: [
    { name: "Contact info", action: "handleContactInfo" },
    { name: "Report", action: "handleReport" },
    { name: "Block", action: "handleBlock" },
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
    case SHOW_DRAWER:
      return {
        ...state,
        showDrawer: true,
        drawerType: action.payload,
      };
    case HIDE_DRAWER:
      return {
        ...state,
        showDrawer: false,
        drawerType: null,
      };
    default:
      return state;
  }
};

export default helperReducers;

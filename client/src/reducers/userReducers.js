import {
  FETCH_CONTACTS,
  FETCH_CONTACT_DETAIL,
  FETCH_ME,
  SET_SELECTED_CHAT,
  SOCKET_IO,
} from "../actionTypes/userActionTypes";

const userState = {
  me: null,
  contacts: [],
  selectedChat: null,
  selectedContactDetail: null,
  socket: null,
};

const userReducers = (state = userState, action) => {
  switch (action.type) {
    case FETCH_ME:
      return {
        ...state,
        me: action.payload,
      };
    case FETCH_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case SET_SELECTED_CHAT:
      return {
        ...state,
        selectedChat: action.payload,
      };
    case FETCH_CONTACT_DETAIL:
      return {
        ...state,
        selectedContactDetail: action.payload,
      };
    case SOCKET_IO:
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
};

export default userReducers;

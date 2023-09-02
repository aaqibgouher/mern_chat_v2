import { FETCH_CHATS, FETCH_MESSAGES } from "../actionTypes/chatActionTypes";

const chatState = {
  chats: [],
  messages: [],
};

const chatReducers = (state = chatState, action) => {
  switch (action.type) {
    case FETCH_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    case FETCH_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducers;

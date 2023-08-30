import { FETCH_CHATS } from "../actionTypes/chatActionTypes";

const chatState = {
  chats: [],
};

const chatReducers = (state = chatState, action) => {
  switch (action.type) {
    case FETCH_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducers;

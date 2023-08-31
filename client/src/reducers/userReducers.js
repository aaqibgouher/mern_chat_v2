import { FETCH_CONTACTS, FETCH_ME } from "../actionTypes/userActionTypes";

const authState = {
  me: null,
  contacts: [],
};

const userReducers = (state = authState, action) => {
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
    default:
      return state;
  }
};

export default userReducers;

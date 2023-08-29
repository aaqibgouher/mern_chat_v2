import { FETCH_ME } from "../actionTypes/userActionTypes";

const authState = {
  me: null,
};

const userReducers = (state = authState, action) => {
  switch (action.type) {
    case FETCH_ME:
      return {
        ...state,
        me: action.payload,
      };
    default:
      return state;
  }
};

export default userReducers;

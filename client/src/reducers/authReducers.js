import { LOGIN_USER, REGISTER_USER } from "../actionTypes/authActionTypes";

const authState = {
  data: null,
};

const authReducers = (state = authState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        data: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducers;

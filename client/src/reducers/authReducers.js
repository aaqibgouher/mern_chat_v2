import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "../actionTypes/authActionTypes";

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
        data: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};

export default authReducers;

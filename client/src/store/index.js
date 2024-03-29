import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducers from "../reducers/authReducers";
import helperReducers from "../reducers/helperReducers";
import userReducers from "../reducers/userReducers";
import chatReducers from "../reducers/chatReducers";

const rootReducer = combineReducers({
  authReducers,
  helperReducers,
  userReducers,
  chatReducers,
});

// Enable Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

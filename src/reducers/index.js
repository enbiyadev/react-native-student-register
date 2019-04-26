import { combineReducers } from "redux";
import AuthenticationReducers from "./AuthenticationReducers";

export default combineReducers({
  authenticationResponse: AuthenticationReducers
});

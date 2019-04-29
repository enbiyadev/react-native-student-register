import { combineReducers } from "redux";
//
import AuthenticationReducers from "./AuthenticationReducers";
import StudentsListReducers from "./StudentsCreateReducers";
import StudentsDataReducers from "./StudentsDataReducers";
import StudentsUpdateReducers from "./StudentsUpdateReducers";

export default combineReducers({
  authenticationResponse  : AuthenticationReducers,
  studentsListResponse    : StudentsListReducers,
  studentsDataResponse    : StudentsDataReducers,
  studentsUpdateResponse  : StudentsUpdateReducers
});

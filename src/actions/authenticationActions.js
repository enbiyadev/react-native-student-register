import { EMAIL_CHANGED, PASSWORD_CHANGED } from "./types";

export const emailChanged = (email) => {
  return (dispatch) => {
    dispatch({
      type: EMAIL_CHANGED,
      payload: email
    });
  }
}

export const passwordChanged = (password) => {
  return (dispatch) => {
    dispatch({
      type: PASSWORD_CHANGED,
      payload: password
    });
  }
}
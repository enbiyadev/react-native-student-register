import firebase from "firebase";
import { Actions } from "react-native-router-flux";
//
import { 
  STUDENT_CHANGED, 
  CREATE_REQUEST, 
  CREATE_REQUEST_SUCCESS, 
  STUDENT_LIST_DATA_SUCCESS,
  UPDATE_REQUEST,
  UPDATE_REQUEST_SUCCESS,
  DELETE_REQUEST,
  DELETE_REQUEST_SUCCESS
} from "./types";

export const studentsChange = ({ props, value }) => {
  return(dispatch) => {
    dispatch({
      type: STUDENT_CHANGED,
      payload: { props, value }
    })
  }
}

export const studentsCreate = ({ studentName, studentSurname, studentNumber, branch }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({
      type: CREATE_REQUEST
    });

    firebase.database().ref(`/kullanicilar/${currentUser.uid}/ogrenciler`)
    .push({ studentName, studentSurname, studentNumber, branch })
    .then(() => {
      dispatch({
        type: CREATE_REQUEST_SUCCESS
      });

      Actions.pop();
    });
  }
}

export const studentsUpdate = ({ studentName, studentSurname, studentNumber, branch, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({
      type: UPDATE_REQUEST
    });

    firebase.database().ref(`/kullanicilar/${currentUser.uid}/ogrenciler/${uid}`)
    .set({ studentName, studentSurname, studentNumber, branch })
    .then(() => {
      dispatch({
        type: UPDATE_REQUEST_SUCCESS
      });

      Actions.pop();
    });
  }
}

export const studentsDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({
      type: DELETE_REQUEST
    });

    firebase.database().ref(`/kullanicilar/${currentUser.uid}/ogrenciler/${uid}`)
    .remove()
    .then(() => {
      dispatch({
        type: DELETE_REQUEST_SUCCESS
      });

      Actions.pop();
    });
  }
}

export const studentsListData = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/kullanicilar/${currentUser.uid}/ogrenciler`)
    .on("value", snapshot => {
      dispatch({
        type: STUDENT_LIST_DATA_SUCCESS,
        payload: snapshot.val() 
      });
    });
  }
}
import { Dispatch } from "redux";
import firebase from "firebase";
import AuthActions from "./actions";

export const login = (callback: () => void) => async (dispatch: Dispatch) => {
  dispatch(AuthActions.setLoading(true));
  const provider = new firebase.auth.TwitterAuthProvider();
  await firebase.auth().signInWithPopup(provider);
  dispatch(AuthActions.setLoading(false));
  callback();
};

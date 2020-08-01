import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

const AuthActions = {
  setLoading: actionCreator<boolean>("SET_LOADING")
};

export default AuthActions;

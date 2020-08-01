import { AuthState } from "../../domain/entity/auth";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import AuthActions from "./actions";

const init: AuthState = {
  loading: false
};

const authReducer = reducerWithInitialState(init).case(
  AuthActions.setLoading,
  (_state, payload) => ({ loading: payload })
);

export default authReducer;

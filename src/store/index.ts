import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./profile/reducer";
import { RootState } from "../domain/entity/rootState";
import thunk from "redux-thunk";
import collegesReducer from "./colleges/reducer";
import validationReducer from "./validation/reducer";
import alertReducer from "./alert/reducer";

const store = createStore(
  combineReducers<RootState>({
    profile: profileReducer,
    colleges: collegesReducer,
    validation: validationReducer,
    alert: alertReducer
  }),
  applyMiddleware(thunk)
);

export default store;

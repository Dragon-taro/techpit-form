import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./profile/reducer";
import { RootState } from "../domain/entity/rootState";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers<RootState>({
    profile: profileReducer
  }),
  applyMiddleware(thunk)
);

export default store;

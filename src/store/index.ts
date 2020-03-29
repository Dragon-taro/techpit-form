import { createStore, combineReducers } from "redux";
import profileReducer from "./profile/reducer";
import { RootState } from "../domain/entity/rootState";

const store = createStore(
  combineReducers<RootState>({
    profile: profileReducer
  })
);

export default store;

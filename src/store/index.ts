import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./profile/reducer";
import { RootState } from "../domain/entity/rootState";
import thunk from "redux-thunk";
import collegesReducer from "./colleges/reducer";

const store = createStore(
  combineReducers<RootState>({
    profile: profileReducer,
    colleges: collegesReducer
  }),
  applyMiddleware(thunk)
);

export default store;

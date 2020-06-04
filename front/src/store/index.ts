import { createStore, combineReducers } from "redux"
import { profileReducer } from "./profile/reducer"
import { RootState } from "../domain/entity/rootState"

export const store = createStore(
  combineReducers<RootState>({
    profile: profileReducer
  }),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

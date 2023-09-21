import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { RootState } from "../domain/entity/rootState";
import profileReducer from "./profile/reducer";
import collegesReducer from "./colleges/reducer";

const store = createStore(
    combineReducers<RootState>({
        profile: profileReducer,
        colleges: collegesReducer
    }),
    compose(
        applyMiddleware(thunk),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
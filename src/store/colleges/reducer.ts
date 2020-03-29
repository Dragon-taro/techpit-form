import { reducerWithInitialState } from "typescript-fsa-reducers";
import collegesActions from "./actions";
import { Colleges } from "../../domain/entity/colleges";

const init: Colleges = { result: [], search: "" };

const collegesReducer = reducerWithInitialState(init)
  .case(collegesActions.searchCollege.done, (state, payload) => ({
    ...state,
    result: payload.result
  }))
  .case(collegesActions.setSearchWord, (state, payload) => ({
    ...state,
    search: payload
  }));

export default collegesReducer;

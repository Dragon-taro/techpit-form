import { reducerWithInitialState } from "typescript-fsa-reducers";
import collegesActions from "./actions";
import { Colleges } from "../../domain/entity/college";

const init: Colleges = { result: [], search: "" };

const collegesReducer = reducerWithInitialState(init)
  .case(collegesActions.setSearchWord, (state, payload) => ({
    ...state,
    search: payload
  }))
  .case(collegesActions.searchCollege.done, (state, payload) => ({
    ...state,
    result: payload.result
  }));

export default collegesReducer;

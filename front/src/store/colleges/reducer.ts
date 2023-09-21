import { reducerWithInitialState } from "typescript-fsa-reducers";
import collegesActions from "./actions";
import { Colleges } from "../../domain/entity/college";

const init: Colleges = {search: ""};

const collegesReducer = reducerWithInitialState(init).case(
    collegesActions.setSearchWord,
    (state, payload) => ({
        ...state,
        search: payload
    })
);

export default collegesReducer;
import actionCreatorFactory from "typescript-fsa";
import { CollegeResult } from "../../domain/entity/college";

const actionCreator = actionCreatorFactory();

const collegesActions = {
  setSearchWord: actionCreator<string>("SET_SEARCH_WORD"),
  searchCollege: actionCreator.async<{}, CollegeResult[], {}>("SEARCH_COLLEGE")
};

export default collegesActions;

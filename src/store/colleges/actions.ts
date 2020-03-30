import actionCreatorFactory from "typescript-fsa";
import { CollegeResult } from "../../domain/entity/colleges";

const actionCreator = actionCreatorFactory();

const collegesActions = {
  searchCollege: actionCreator.async<{}, CollegeResult[], {}>("SEARCH_COLLEGE"),
  setSearchWord: actionCreator<string>("SET_SEARCH_WORD")
};

export default collegesActions;

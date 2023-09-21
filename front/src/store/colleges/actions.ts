import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

const collegesActions = {
    setSearchWord: actionCreator<string>("SET_SEARCH_WORD")
};

export default collegesActions;
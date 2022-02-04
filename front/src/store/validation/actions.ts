import actionCreatorFactory from "typescript-fsa";
import { Validation } from "../../domain/entity/vaildation";

const actionCreator = actionCreatorFactory();

export const validationActions = {
  setIsStartvalidation: actionCreator<boolean>("SET_IS_START_VALIDATION"),
  setValidation: actionCreator<Validation>("SET_VALIDATION"),
};

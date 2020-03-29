import actionCreatorFactory from "typescript-fsa";
import { Profile } from "../../entity/profile";

const actionCreator = actionCreatorFactory();

const profileActions = {
  updateProfile: actionCreator<Partial<Profile>>("UPDATE_PROFILE")
};

export default profileActions;

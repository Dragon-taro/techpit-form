import actionCreatorFactory from "typescript-fsa";
import { Profile } from "../../domain/entity/profile";
import { Address } from "../../domain/entity/address";

const actionCreator = actionCreatorFactory();

const profileActions = {
  updateProfile: actionCreator<Partial<Profile>>("UPDATE_PROFILE"),
  updateAddress: actionCreator<Partial<Address>>("UPDATE_ADDRESS")
};

export default profileActions;

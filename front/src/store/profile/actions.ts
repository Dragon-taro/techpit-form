import actionCreatorFactory from "typescript-fsa";
import { Profile } from "../../domain/entity/profile";
import { Address } from "../../domain/entity/address";

const actionCreator = actionCreatorFactory();

const profileActions = {
  setProfile: actionCreator<Partial<Profile>>("SET_PROFILE"),
  setAddress: actionCreator<Partial<Address>>("SET_ADDRESS")
};

export default profileActions;

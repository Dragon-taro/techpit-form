import actionCreatorFactory from "typescript-fsa";
import { Profile } from "../../domain/entity/profile";
import { Address } from "../../domain/entity/address";
import { College } from "../../domain/entity/colleges";

const actionCreator = actionCreatorFactory();

const profileActions = {
  setProfile: actionCreator<Partial<Profile>>("SET_PROFILE"),
  setAddress: actionCreator<Partial<Address>>("SET_ADDRESS"),
  setCollege: actionCreator<Partial<College>>("SET_COLLEGE"),
  searchAddress: actionCreator.async<{}, Partial<Address>, {}>("SEARCH_ADDRESS")
};

export default profileActions;

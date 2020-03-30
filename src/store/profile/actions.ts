import actionCreatorFactory from "typescript-fsa";
import { Profile } from "../../domain/entity/profile";
import { Address } from "../../domain/entity/address";
import { College } from "../../domain/entity/colleges";
import { Career } from "../../domain/entity/career";

const actionCreator = actionCreatorFactory();

const profileActions = {
  setProfile: actionCreator<Partial<Profile>>("SET_PROFILE"),
  setAddress: actionCreator<Partial<Address>>("SET_ADDRESS"),
  setCollege: actionCreator<Partial<College>>("SET_COLLEGE"),
  setCareer: actionCreator<{ career: Partial<Career>; index: number }>(
    "SET_CAREER"
  ),
  deleteCareer: actionCreator<number>("DELETE_CAREER"),
  addCareer: actionCreator<{}>("ADD_CAREER"),
  searchAddress: actionCreator.async<{}, Partial<Address>, {}>("SEARCH_ADDRESS")
};

export default profileActions;

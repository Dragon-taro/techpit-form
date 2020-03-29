import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";
import profileActions from "./actions";

const init: Profile = {
  name: "",
  description: "",
  birthday: "",
  gender: "",
  address: {
    postalcode: "",
    prefecture: "",
    town: "",
    restAddress: ""
  }
};

const profileReducer = reducerWithInitialState(init)
  .case(profileActions.updateProfile, (state, payload) => ({
    ...state,
    ...payload
  }))
  .case(profileActions.updateAddress, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload }
  }))
  .case(profileActions.searchAddress.done, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload.result }
  }));

export default profileReducer;

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
    state: "",
    town: "",
    street: "",
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
  }));

export default profileReducer;

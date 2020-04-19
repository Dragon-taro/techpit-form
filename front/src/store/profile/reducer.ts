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
    city: "",
    restAddress: ""
  }
};

const profileReducer = reducerWithInitialState(init)
  .case(profileActions.setProfile, (state, payload) => ({
    ...state,
    ...payload
  }))
  .case(profileActions.setAddress, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload }
  }));

export default profileReducer;

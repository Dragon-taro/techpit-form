import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";
import profileActions from "./actions";
import { Career } from "../../domain/entity/career";

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
  },
  careers: []
};

const initCareer: Career = {
  company: "",
  position: "",
  startAt: "",
  endAt: ""
};

const profileReducer = reducerWithInitialState(init)
  .case(profileActions.setProfile, (state, payload) => ({
    ...state,
    ...payload
  }))
  .case(profileActions.setAddress, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload }
  }))
  .case(profileActions.searchAddress.done, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload.result }
  }))
  .case(profileActions.addCareer, state => ({
    ...state,
    careers: [...state.careers, initCareer]
  }))
  .case(profileActions.setCareer, (state, payload) => ({
    ...state,
    careers: state.careers.map((c, i) =>
      i === payload.index ? { ...c, ...payload.career } : c
    )
  }))
  .case(profileActions.deleteCareer, (state, payload) => ({
    ...state,
    careers: state.careers.filter((_, i) => i !== payload)
  }));

export default profileReducer;

import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";
import { profileActions } from "./actions";

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
    restAddress: "",
  },
  careers: [],
};

const initCareer: Career = {
  company: "",
  position: "",
  startAt: "",
  endAt: "",
};

export const profileReducer = reducerWithInitialState(init)
  .case(profileActions.setProfile, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(profileActions.setAddress, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload },
  }))
  .case(profileActions.searchAddress.done, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload.result },
  }))
  .case(profileActions.setCareer, (state, payload) => ({
    ...state,
    careers: state.careers.map((career, index) =>
      index === payload.index ? { ...career, ...payload.career } : career
    ),
  }))
  .case(profileActions.deleteCareer, (state, payload) => ({
    ...state,
    careers: state.careers.filter((_, index) => index !== payload),
  }))
  .case(profileActions.addCareer, (state) => ({
    ...state,
    careers: [...state.careers, initCareer],
  }));

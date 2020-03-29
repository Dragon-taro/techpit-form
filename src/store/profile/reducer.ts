import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";
import profileActions from "./actions";

const init: Profile = {
  name: "",
  description: "",
  birthday: new Date(),
  gender: ""
};

const profileReducer = reducerWithInitialState(init).case(
  profileActions.updateProfile,
  (state, payload) => ({
    ...state,
    ...payload
  })
);

export default profileReducer;

import { Profile } from "./profile";
import { Colleges } from "./colleges";
import { ValidationState } from "./validation";

export type RootState = {
  profile: Profile;
  colleges: Colleges;
  validation: ValidationState;
};

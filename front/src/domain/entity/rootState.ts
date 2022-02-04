import { Profile } from "./profile";
import { Colleges } from "./college";
import { ValidationState } from "./vaildation";

export type RootState = {
  profile: Profile;
  colleges: Colleges;
  validation: ValidationState;
};

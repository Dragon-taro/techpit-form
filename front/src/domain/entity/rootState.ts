import { Profile } from "./profile";
import { Colleges } from "./college";
import { ValidationState } from "./vaildation";
import { AlertState } from "./alert";

export type RootState = {
  profile: Profile;
  colleges: Colleges;
  validation: ValidationState;
  alert: AlertState;
};

import { Profile } from "./profile";
import { Colleges } from "./college";
import { ValidationState } from "./validation";
import { AlertState } from "./alert";

export type RootState = {
  profile: Profile;
  colleges: Colleges;
  validation: ValidationState;
  alert: AlertState;
};

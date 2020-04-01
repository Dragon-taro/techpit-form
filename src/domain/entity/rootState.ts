import { Profile } from "./profile";
import { Colleges } from "./colleges";
import { ValidationState } from "./validation";
import { AlertState } from "./alert";

export type RootState = {
  profile: Profile;
  colleges: Colleges;
  validation: ValidationState;
  alert: AlertState;
};

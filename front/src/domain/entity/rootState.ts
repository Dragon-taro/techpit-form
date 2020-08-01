import { Profile } from "./profile";
import { Colleges } from "./college";
import { ValidationState } from "./validation";
import { AlertState } from "./alert";
import { AuthState } from "./auth";

export type RootState = {
  profile: Profile;
  colleges: Colleges;
  validation: ValidationState;
  alert: AlertState;
  auth: AuthState;
};

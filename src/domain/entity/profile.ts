import { Gender } from "./gender";
import { Address } from "./address";
import { College } from "./colleges";

export type Profile = {
  name: string;
  description: string;
  birthday: string;
  gender: Gender;
  address: Address;
  college: College;
};

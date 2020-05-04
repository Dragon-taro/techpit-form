import { Gender } from "./gender";
import { Address } from "./address";
import { College } from "./college";
import { Career } from "./career";

export type Profile = {
  name: string;
  description: string;
  birthday: string;
  gender: Gender;
  address: Address;
  college: College;
  careers: Career[];
};

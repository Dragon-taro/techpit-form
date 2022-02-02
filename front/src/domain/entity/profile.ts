import { Gender } from "./gender";
import { Address } from "./address";
import { Career } from "./career";

export type Profile = {
  name: string;
  description: string;
  birthday: string;
  gender: Gender;
  address: Address;
  careers: Career[];
};

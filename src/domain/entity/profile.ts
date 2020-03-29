import { Gender } from "./gender";
import { Address } from "./address";

export type Profile = {
  name: string;
  description: string;
  birthday: string;
  gender: Gender;
  address: Address;
};

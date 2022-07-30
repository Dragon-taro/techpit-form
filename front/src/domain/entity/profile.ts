import { Gender } from "./gender";

export type Profile = {
  name: string;
  description: string;
  birthday: string;
  gender: Gender;
};
